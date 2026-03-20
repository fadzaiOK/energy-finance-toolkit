import { useState, useCallback } from "react";
import {
  C,
  styles,
  getResultCardStyle,
  getResultValueStyle,
} from "../constants/theme";
import { calcNPV, calcIRR, calcWACC, fmt } from "../utils/finance";
import Field from "../components/Field.jsx";

function buildCashflows(inputs) {
  var capex = inputs.capex;
  var debtRatio = inputs.debtRatio;
  var interestRate = inputs.interestRate;
  var costOfEquity = inputs.costOfEquity;
  var taxRate = inputs.taxRate;
  var loanTenor = inputs.loanTenor;
  var annualRevenue = inputs.annualRevenue;
  var opex = inputs.opex;
  var degradation = inputs.degradation;
  var projectLife = inputs.projectLife;

  var wacc = calcWACC(debtRatio, interestRate, costOfEquity, taxRate);
  var equity = capex * (1 - debtRatio / 100);
  var debt = capex * (debtRatio / 100);
  var annualDebtService =
    debt > 0
      ? (debt * (interestRate / 100)) /
        (1 - Math.pow(1 + interestRate / 100, -loanTenor))
      : 0;

  var rows = [];
  var equityCFs = [-equity];

  for (var y = 1; y <= projectLife; y++) {
    var rev = annualRevenue * Math.pow(1 - degradation / 100, y - 1);
    var ebitda = rev - opex;
    var ds = y <= loanTenor ? annualDebtService : 0;
    var fcfe = ebitda - ds;
    var dscr = ds > 0 ? ebitda / ds : null;
    equityCFs.push(fcfe);
    rows.push({
      year: y,
      revenue: rev,
      opex: opex,
      ebitda: ebitda,
      debtService: ds,
      fcfe: fcfe,
      dscr: dscr,
    });
  }

  var irr = calcIRR(equityCFs);
  var npv = calcNPV(wacc, equityCFs);
  var dscrRows = rows.filter(function (r) {
    return r.dscr !== null;
  });
  var avgDSCR =
    dscrRows.length > 0
      ? dscrRows.reduce(function (a, r) {
          return a + r.dscr;
        }, 0) / dscrRows.length
      : 0;

  var payback = null;
  var cum = -equity;
  for (var i = 0; i < rows.length; i++) {
    cum += rows[i].fcfe;
    if (cum >= 0) {
      payback = rows[i].year;
      break;
    }
  }

  return {
    irr: irr,
    npv: npv,
    wacc: wacc,
    avgDSCR: avgDSCR,
    payback: payback,
    rows: rows,
    equity: equity,
    debt: debt,
    annualDebtService: annualDebtService,
  };
}

function dscrColor(d) {
  if (d == null) return C.inkLight;
  if (d >= 1.5) return C.accent;
  if (d >= 1.2) return C.gold;
  return C.red;
}

function ProjectFinanceModule() {
  var defaultInputs = {
    capex: 50000000,
    debtRatio: 70,
    interestRate: 8.5,
    costOfEquity: 14,
    taxRate: 28,
    loanTenor: 15,
    annualRevenue: 9000000,
    opex: 2000000,
    degradation: 0.5,
    projectLife: 25,
  };

  var stateHook = useState(defaultInputs);
  var inputs = stateHook[0];
  var setInputs = stateHook[1];

  var resultsHook = useState(null);
  var results = resultsHook[0];
  var setResults = resultsHook[1];

  var tableHook = useState(false);
  var showTable = tableHook[0];
  var setShowTable = tableHook[1];

  function set(key) {
    return function (val) {
      setInputs(function (p) {
        var next = Object.assign({}, p);
        next[key] = val;
        return next;
      });
    };
  }

  var calculate = useCallback(
    function () {
      setResults(buildCashflows(inputs));
    },
    [inputs],
  );

  function getInsight() {
    if (!results) return "";
    if (
      results.irr >= results.wacc &&
      results.irr >= 0.12 &&
      results.avgDSCR >= 1.3
    ) {
      return (
        "This project looks bankable. An equity IRR of " +
        fmt.pct(results.irr) +
        " exceeds both the WACC of " +
        fmt.pct(results.wacc) +
        " and the typical 12% hurdle rate. The average DSCR of " +
        fmt.x(results.avgDSCR) +
        " should satisfy most lenders."
      );
    }
    if (results.irr < results.wacc) {
      return (
        "The equity IRR of " +
        fmt.pct(results.irr) +
        " is below the WACC of " +
        fmt.pct(results.wacc) +
        ". This project destroys value - returns do not cover the blended cost of financing. Review your capital structure or revenue assumptions."
      );
    }
    if (results.irr < 0.08) {
      return (
        "The equity IRR of " +
        fmt.pct(results.irr) +
        " is below typical thresholds. Consider increasing revenue assumptions, reducing CAPEX, or improving the financing structure."
      );
    }
    return (
      "The project shows moderate returns (IRR: " +
      fmt.pct(results.irr) +
      " vs WACC: " +
      fmt.pct(results.wacc) +
      "). Review DSCR of " +
      fmt.x(results.avgDSCR) +
      " - lenders typically require a minimum of 1.2x-1.4x across the debt tenor."
    );
  }

  return (
    <div>
      <h1 style={styles.pageTitle}>Project Finance Model</h1>
      <p style={styles.pageDesc}>
        Model the financial viability of a renewable energy project. Enter
        project parameters to calculate IRR, NPV, Debt Service Coverage Ratio,
        and equity payback period.
      </p>
      ```
      <div style={styles.card}>
        <div style={styles.cardTitle}>Capital Structure</div>
        <div style={styles.grid3}>
          <Field
            label="Total CAPEX"
            value={inputs.capex}
            onChange={set("capex")}
            prefix="$"
            min={0}
            step={500000}
          />
          <Field
            label="Debt Ratio"
            value={inputs.debtRatio}
            onChange={set("debtRatio")}
            suffix="%"
            min={0}
            max={100}
          />
          <Field
            label="Cost of Debt (Interest Rate)"
            value={inputs.interestRate}
            onChange={set("interestRate")}
            suffix="%"
            min={0}
            max={30}
            step={0.1}
          />
          <Field
            label="Cost of Equity"
            value={inputs.costOfEquity}
            onChange={set("costOfEquity")}
            suffix="%"
            min={0}
            max={50}
            step={0.1}
          />
          <Field
            label="Corporate Tax Rate"
            value={inputs.taxRate}
            onChange={set("taxRate")}
            suffix="%"
            min={0}
            max={60}
            step={0.5}
          />
        </div>
      </div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>Revenue and Costs</div>
        <div style={styles.grid3}>
          <Field
            label="Annual Revenue"
            value={inputs.annualRevenue}
            onChange={set("annualRevenue")}
            prefix="$"
            min={0}
            step={100000}
          />
          <Field
            label="Annual OPEX"
            value={inputs.opex}
            onChange={set("opex")}
            prefix="$"
            min={0}
            step={50000}
          />
          <Field
            label="Degradation Rate"
            value={inputs.degradation}
            onChange={set("degradation")}
            suffix="% / yr"
            min={0}
            max={5}
            step={0.1}
          />
        </div>
      </div>
      <div style={styles.card}>
        <div style={styles.cardTitle}>Project Timeline</div>
        <div style={styles.grid2}>
          <Field
            label="Loan Tenor"
            value={inputs.loanTenor}
            onChange={set("loanTenor")}
            suffix="years"
            min={1}
            max={30}
          />
          <Field
            label="Project Life"
            value={inputs.projectLife}
            onChange={set("projectLife")}
            suffix="years"
            min={1}
            max={40}
          />
        </div>
      </div>
      <button style={styles.btn} onClick={calculate}>
        Run Model
      </button>
      {results && (
        <div style={{ marginTop: 36 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div style={getResultCardStyle("green")}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.inkMid,
                  marginBottom: 8,
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                }}
              >
                Equity IRR
              </div>
              <div style={getResultValueStyle("green")}>
                {fmt.pct(results.irr)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.inkLight,
                  marginTop: 4,
                  fontFamily: "sans-serif",
                }}
              >
                Target typically over 12%
              </div>
            </div>
            <div
              style={getResultCardStyle(
                results.irr >= results.wacc ? "blue" : "red",
              )}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.inkMid,
                  marginBottom: 8,
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                }}
              >
                WACC
              </div>
              <div
                style={getResultValueStyle(
                  results.irr >= results.wacc ? "blue" : "red",
                )}
              >
                {fmt.pct(results.wacc)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.inkLight,
                  marginTop: 4,
                  fontFamily: "sans-serif",
                }}
              >
                IRR must exceed WACC
              </div>
            </div>
            <div style={getResultCardStyle("blue")}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.inkMid,
                  marginBottom: 8,
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                }}
              >
                NPV at WACC
              </div>
              <div style={getResultValueStyle("blue")}>
                {fmt.M(results.npv)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.inkLight,
                  marginTop: 4,
                  fontFamily: "sans-serif",
                }}
              >
                Positive = value created
              </div>
            </div>
            <div
              style={getResultCardStyle(
                results.avgDSCR >= 1.5
                  ? "green"
                  : results.avgDSCR >= 1.2
                    ? "gold"
                    : "red",
              )}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.inkMid,
                  marginBottom: 8,
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                }}
              >
                Avg DSCR
              </div>
              <div
                style={getResultValueStyle(
                  results.avgDSCR >= 1.5
                    ? "green"
                    : results.avgDSCR >= 1.2
                      ? "gold"
                      : "red",
                )}
              >
                {fmt.x(results.avgDSCR)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.inkLight,
                  marginTop: 4,
                  fontFamily: "sans-serif",
                }}
              >
                Lenders require over 1.2x
              </div>
            </div>
            <div style={getResultCardStyle("gold")}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.inkMid,
                  marginBottom: 8,
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                }}
              >
                Equity Payback
              </div>
              <div style={getResultValueStyle("gold")}>
                {fmt.yr(results.payback)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.inkLight,
                  marginTop: 4,
                  fontFamily: "sans-serif",
                }}
              >
                From first year of operation
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Capital Structure Breakdown</div>
            <div style={styles.grid3}>
              {[
                { label: "Total CAPEX", val: fmt.M(inputs.capex) },
                { label: "Equity", val: fmt.M(results.equity) },
                { label: "Debt", val: fmt.M(results.debt) },
                {
                  label: "Annual Debt Service",
                  val: fmt.M(results.annualDebtService),
                },
                {
                  label: "Cost of Debt",
                  val: fmt.pct(inputs.interestRate / 100),
                },
                {
                  label: "Cost of Equity",
                  val: fmt.pct(inputs.costOfEquity / 100),
                },
                { label: "Tax Rate", val: fmt.pct(inputs.taxRate / 100) },
                { label: "WACC", val: fmt.pct(results.wacc) },
                { label: "Loan Tenor", val: fmt.yr(inputs.loanTenor) },
              ].map(function (item) {
                return (
                  <div
                    key={item.label}
                    style={{
                      borderBottom: "1px solid " + C.border,
                      paddingBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        color: C.inkLight,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        fontFamily: "sans-serif",
                        marginBottom: 4,
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: 18, color: C.ink }}>{item.val}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={styles.insight}>
            <strong>Interpretation: </strong>
            {getInsight()}
          </div>

          <div style={{ marginTop: 24 }}>
            <button
              style={styles.btnOutline}
              onClick={function () {
                setShowTable(function (v) {
                  return !v;
                });
              }}
            >
              {showTable ? "Hide" : "Show"} Annual Cash Flow Table
            </button>
            {showTable && (
              <div style={styles.card}>
                <div style={styles.cardTitle}>
                  Annual Cash Flows (Equity Perspective)
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Year</th>
                        <th style={{ ...styles.th, textAlign: "right" }}>
                          Revenue
                        </th>
                        <th style={{ ...styles.th, textAlign: "right" }}>
                          OPEX
                        </th>
                        <th style={{ ...styles.th, textAlign: "right" }}>
                          EBITDA
                        </th>
                        <th style={{ ...styles.th, textAlign: "right" }}>
                          Debt Service
                        </th>
                        <th style={{ ...styles.th, textAlign: "right" }}>
                          Free CF to Equity
                        </th>
                        <th style={{ ...styles.th, textAlign: "right" }}>
                          DSCR
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.rows.map(function (r) {
                        return (
                          <tr key={r.year}>
                            <td style={styles.td}>Year {r.year}</td>
                            <td style={styles.tdNum}>{fmt.M(r.revenue)}</td>
                            <td style={styles.tdNum}>{fmt.M(r.opex)}</td>
                            <td style={styles.tdNum}>{fmt.M(r.ebitda)}</td>
                            <td style={styles.tdNum}>
                              {r.debtService > 0 ? fmt.M(r.debtService) : "-"}
                            </td>
                            <td
                              style={{
                                ...styles.tdNum,
                                color: r.fcfe >= 0 ? C.accent : C.red,
                                fontWeight: "bold",
                              }}
                            >
                              {fmt.M(r.fcfe)}
                            </td>
                            <td
                              style={{
                                ...styles.tdNum,
                                color: dscrColor(r.dscr),
                              }}
                            >
                              {r.dscr != null ? fmt.x(r.dscr) : "-"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectFinanceModule;
