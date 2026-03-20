import { useState, useCallback } from "react";

var C = {
  bg: "#F7F6F2",
  surface: "#FFFFFF",
  border: "#E2DFD8",
  borderStrong: "#C8C4BB",
  ink: "#1A1916",
  inkMid: "#5A574F",
  inkLight: "#9B978E",
  accent: "#1B4F3A",
  accentLight: "#E8F0EC",
  accentMid: "#2D7A58",
  gold: "#B8860B",
  goldLight: "#FBF5E6",
  red: "#C0392B",
  redLight: "#FDECEA",
  blue: "#1A3A5C",
  blueLight: "#EAF0F7",
};

var styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: C.bg,
    fontFamily: "Georgia, Times New Roman, serif",
    color: C.ink,
  },
  header: {
    backgroundColor: C.accent,
    padding: "0 48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 68,
  },
  headerLogo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
    width: 32,
    height: 32,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "normal",
    letterSpacing: "0.04em",
    color: "#FFFFFF",
    fontFamily: "Georgia, serif",
  },
  headerSub: {
    fontSize: 11,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginTop: 1,
  },
  nav: {
    backgroundColor: C.surface,
    borderBottom: "1px solid " + C.border,
    padding: "0 48px",
    display: "flex",
    gap: 0,
  },
  main: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "40px 48px",
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "normal",
    color: C.ink,
    marginBottom: 6,
    letterSpacing: "-0.01em",
  },
  pageDesc: {
    fontSize: 14,
    color: C.inkMid,
    marginBottom: 36,
    lineHeight: 1.6,
    maxWidth: 580,
  },
  card: {
    backgroundColor: C.surface,
    border: "1px solid " + C.border,
    borderRadius: 8,
    padding: 32,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 13,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: C.inkLight,
    marginBottom: 20,
    fontFamily: "sans-serif",
    fontWeight: "600",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 20,
  },
  fieldGroup: {
    marginBottom: 0,
  },
  label: {
    display: "block",
    fontSize: 12,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: C.inkMid,
    marginBottom: 6,
    fontFamily: "sans-serif",
    fontWeight: "600",
  },
  inputWrap: {
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    fontSize: 15,
    border: "1px solid " + C.border,
    borderRadius: 5,
    backgroundColor: C.bg,
    color: C.ink,
    fontFamily: "Georgia, serif",
    outline: "none",
    boxSizing: "border-box",
  },
  inputPrefix: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 14,
    color: C.inkLight,
    fontFamily: "sans-serif",
    pointerEvents: "none",
  },
  inputSuffix: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 13,
    color: C.inkLight,
    fontFamily: "sans-serif",
    pointerEvents: "none",
  },
  resultGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    marginBottom: 24,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
    fontFamily: "sans-serif",
  },
  th: {
    textAlign: "left",
    padding: "8px 12px",
    fontSize: 11,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: C.inkLight,
    borderBottom: "1px solid " + C.border,
    fontWeight: "600",
  },
  td: {
    padding: "9px 12px",
    borderBottom: "1px solid " + C.border,
    color: C.inkMid,
  },
  tdNum: {
    padding: "9px 12px",
    borderBottom: "1px solid " + C.border,
    color: C.ink,
    textAlign: "right",
  },
  btn: {
    padding: "12px 28px",
    backgroundColor: C.accent,
    color: "#FFFFFF",
    border: "none",
    borderRadius: 5,
    fontSize: 13,
    letterSpacing: "0.06em",
    cursor: "pointer",
    fontFamily: "sans-serif",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  btnOutline: {
    padding: "12px 28px",
    backgroundColor: "transparent",
    color: C.accent,
    border: "1px solid " + C.accent,
    borderRadius: 5,
    fontSize: 13,
    letterSpacing: "0.06em",
    cursor: "pointer",
    fontFamily: "sans-serif",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  insight: {
    backgroundColor: C.accentLight,
    border: "1px solid #C0D9CA",
    borderLeft: "3px solid " + C.accent,
    borderRadius: 5,
    padding: "14px 18px",
    fontSize: 13,
    color: C.accent,
    lineHeight: 1.6,
    marginTop: 16,
    fontFamily: "sans-serif",
  },
  comingSoon: {
    textAlign: "center",
    padding: "80px 40px",
    backgroundColor: C.surface,
    border: "1px solid " + C.border,
    borderRadius: 8,
  },
  comingSoonIcon: {
    fontSize: 40,
    marginBottom: 16,
    opacity: 0.4,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: "normal",
    color: C.ink,
    marginBottom: 10,
  },
  comingSoonDesc: {
    fontSize: 14,
    color: C.inkMid,
    lineHeight: 1.7,
    maxWidth: 400,
    margin: "0 auto",
  },
};

function getResultCardStyle(color) {
  var bgMap = {
    green: C.accentLight,
    gold: C.goldLight,
    blue: C.blueLight,
    red: C.redLight,
  };
  var borderMap = {
    green: "#C0D9CA",
    gold: "#E8D5A0",
    blue: "#C0D0E0",
    red: "#EBC0BB",
  };
  return {
    backgroundColor: bgMap[color] || C.accentLight,
    border: "1px solid " + (borderMap[color] || "#C0D9CA"),
    borderRadius: 8,
    padding: "20px 20px 16px",
  };
}

function getResultValueStyle(color) {
  var colorMap = { green: C.accent, gold: C.gold, blue: C.blue, red: C.red };
  return {
    fontSize: 28,
    fontWeight: "normal",
    color: colorMap[color] || C.accent,
    letterSpacing: "-0.02em",
    lineHeight: 1,
  };
}

function getNavTabStyle(active) {
  return {
    padding: "16px 24px",
    fontSize: 13,
    letterSpacing: "0.04em",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    color: active ? C.accent : C.inkMid,
    borderBottom: active ? "2px solid " + C.accent : "2px solid transparent",
    fontFamily: "Georgia, serif",
    fontWeight: active ? "bold" : "normal",
  };
}

function getNavBadgeStyle(active) {
  return {
    display: "inline-block",
    marginLeft: 8,
    fontSize: 9,
    letterSpacing: "0.08em",
    padding: "2px 6px",
    borderRadius: 3,
    backgroundColor: active ? C.accentLight : "#F0EDE8",
    color: active ? C.accent : C.inkLight,
    textTransform: "uppercase",
    fontFamily: "sans-serif",
    verticalAlign: "middle",
  };
}

function calcNPV(rate, cashflows) {
  return cashflows.reduce(function (acc, cf, t) {
    return acc + cf / Math.pow(1 + rate, t);
  }, 0);
}

function calcIRR(cashflows) {
  var rate = 0.1;
  for (var i = 0; i < 200; i++) {
    var npv = calcNPV(rate, cashflows);
    var dnpv = cashflows.reduce(function (acc, cf, t) {
      return acc - (t * cf) / Math.pow(1 + rate, t + 1);
    }, 0);
    if (Math.abs(dnpv) < 1e-12) break;
    var newRate = rate - npv / dnpv;
    if (Math.abs(newRate - rate) < 1e-8) {
      rate = newRate;
      break;
    }
    rate = newRate;
  }
  return rate;
}

function calcWACC(debtRatio, interestRate, costOfEquity, taxRate) {
  var wd = debtRatio / 100;
  var we = 1 - wd;
  var rd = interestRate / 100;
  var re = costOfEquity / 100;
  var t = taxRate / 100;
  return we * re + wd * rd * (1 - t);
}

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

var fmt = {
  M: function (v) {
    return v == null ? "-" : "$" + (v / 1e6).toFixed(2) + "M";
  },
  pct: function (v) {
    return v == null ? "-" : (v * 100).toFixed(1) + "%";
  },
  x: function (v) {
    return v == null ? "-" : v.toFixed(2) + "x";
  },
  yr: function (v) {
    return v == null ? "-" : v + " yrs";
  },
};

function Field(props) {
  var label = props.label;
  var value = props.value;
  var onChange = props.onChange;
  var prefix = props.prefix;
  var suffix = props.suffix;
  var min = props.min;
  var max = props.max;
  var step = props.step || 1;

  return (
    <div style={styles.fieldGroup}>
      <label style={styles.label}>{label}</label>
      <div style={styles.inputWrap}>
        {prefix && <span style={styles.inputPrefix}>{prefix}</span>}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={function (e) {
            onChange(Number(e.target.value));
          }}
          style={{
            ...styles.input,
            paddingLeft: prefix ? 28 : 14,
            paddingRight: suffix ? 44 : 14,
          }}
        />
        {suffix && <span style={styles.inputSuffix}>{suffix}</span>}
      </div>
    </div>
  );
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

// ─── PPA PRICING MODULE ───────────────────────────────────────────────────────

function calcLCOE(inputs, currency) {
  var capex = inputs.capacityMW * inputs.capexPerMW * currency;
  var annualEnergy = ((inputs.capacityMW * inputs.capacityFactor) / 100) * 8760;
  var pv_energy = 0;
  var pv_cost = capex;
  var rate = inputs.discountRate / 100;
  for (var y = 1; y <= inputs.projectLife; y++) {
    var energy = annualEnergy * Math.pow(1 - inputs.degradation / 100, y - 1);
    var opex = inputs.capacityMW * inputs.opexPerMW * currency;
    pv_energy += energy / Math.pow(1 + rate, y);
    pv_cost += opex / Math.pow(1 + rate, y);
  }
  return pv_energy > 0 ? pv_cost / pv_energy : 0;
}

function PPAModule() {
  var currencyHook = useState("USD");
  var currency = currencyHook[0];
  var setCurrency = currencyHook[1];

  var rate = currency === "USD" ? 1 : 18.5;
  var sym = currency === "USD" ? "$" : "R";

  var defaultPPA = {
    capacityMW: 50,
    capexPerMW: 1200000,
    opexPerMW: 25000,
    capacityFactor: 28,
    degradation: 0.5,
    projectLife: 25,
    discountRate: 10,
    targetIRR: 14,
    debtRatio: 70,
    interestRate: 9,
    taxRate: 28,
  };

  var ppaStateHook = useState(defaultPPA);
  var inputs = ppaStateHook[0];
  var setInputs = ppaStateHook[1];

  var resultsHook = useState(null);
  var results = resultsHook[0];
  var setResults = resultsHook[1];

  function set(key) {
    return function (val) {
      setInputs(function (p) {
        var n = Object.assign({}, p);
        n[key] = val;
        return n;
      });
    };
  }

  function calcPPA() {
    var capex = inputs.capacityMW * inputs.capexPerMW * rate;
    var annualEnergy = inputs.capacityMW * (inputs.capacityFactor / 100) * 8760;
    var equity = capex * (1 - inputs.debtRatio / 100);
    var debt = capex * (inputs.debtRatio / 100);
    var annualDebtService =
      debt > 0
        ? (debt * (inputs.interestRate / 100)) /
          (1 - Math.pow(1 + inputs.interestRate / 100, -inputs.projectLife))
        : 0;

    var lcoe = calcLCOE(inputs, rate);

    function npvAtTariff(tariff) {
      var cfs = [-equity];
      for (var y = 1; y <= inputs.projectLife; y++) {
        var energy =
          annualEnergy * Math.pow(1 - inputs.degradation / 100, y - 1);
        var revenue = energy * tariff;
        var opex = inputs.capacityMW * inputs.opexPerMW * rate;
        var ebitda = revenue - opex;
        var tax = Math.max(0, ebitda * (inputs.taxRate / 100));
        var fcfe = ebitda - tax - annualDebtService;
        cfs.push(fcfe);
      }
      return calcNPV(inputs.targetIRR / 100, cfs);
    }

    var lo = 0,
      hi = lcoe * 5,
      mid = 0;
    for (var i = 0; i < 100; i++) {
      mid = (lo + hi) / 2;
      if (npvAtTariff(mid) > 0) hi = mid;
      else lo = mid;
    }
    var minTariff = mid;

    var sensitivity = [10, 12, 14, 16, 18].map(function (irr) {
      var lo2 = 0,
        hi2 = lcoe * 5,
        mid2 = 0;
      for (var j = 0; j < 100; j++) {
        mid2 = (lo2 + hi2) / 2;
        var cfs2 = [-equity];
        for (var y = 1; y <= inputs.projectLife; y++) {
          var energy =
            annualEnergy * Math.pow(1 - inputs.degradation / 100, y - 1);
          var revenue = energy * mid2;
          var opex = inputs.capacityMW * inputs.opexPerMW * rate;
          var ebitda = revenue - opex;
          var tax = Math.max(0, ebitda * (inputs.taxRate / 100));
          var fcfe = ebitda - tax - annualDebtService;
          cfs2.push(fcfe);
        }
        if (calcNPV(irr / 100, cfs2) > 0) hi2 = mid2;
        else lo2 = mid2;
      }
      return { irr: irr, tariff: mid2 };
    });

    setResults({
      lcoe: lcoe,
      minTariff: minTariff,
      annualEnergy: annualEnergy,
      capex: capex,
      sensitivity: sensitivity,
    });
  }

  var fmtTariff = function (v) {
    return sym + (v * 1000).toFixed(2) + "/MWh";
  };
  var fmtM = function (v) {
    return sym + (v / 1e6).toFixed(1) + "M";
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <h1 style={styles.pageTitle}>PPA Pricing Calculator</h1>
        <div style={{ display: "flex", gap: 8 }}>
          {["USD", "ZAR"].map(function (c) {
            return (
              <button
                key={c}
                onClick={function () {
                  setCurrency(c);
                  setResults(null);
                }}
                style={{
                  padding: "6px 16px",
                  fontSize: 12,
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                  border: "1px solid " + (currency === c ? C.accent : C.border),
                  backgroundColor: currency === c ? C.accent : "transparent",
                  color: currency === c ? "#fff" : C.inkMid,
                  borderRadius: 4,
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
      <p style={styles.pageDesc}>
        Calculate the minimum viable PPA tariff for a renewable energy project
        to meet a target IRR. Outputs LCOE and a sensitivity table across return
        thresholds.
      </p>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Project Parameters</div>
        <div style={styles.grid3}>
          <Field
            label="Capacity (MW)"
            value={inputs.capacityMW}
            onChange={set("capacityMW")}
            min={0}
            step={1}
          />
          <Field
            label={"CAPEX per MW (" + sym + ")"}
            value={inputs.capexPerMW}
            onChange={set("capexPerMW")}
            min={0}
            step={10000}
          />
          <Field
            label={"OPEX per MW per year (" + sym + ")"}
            value={inputs.opexPerMW}
            onChange={set("opexPerMW")}
            min={0}
            step={1000}
          />
          <Field
            label="Capacity Factor"
            value={inputs.capacityFactor}
            onChange={set("capacityFactor")}
            suffix="%"
            min={1}
            max={100}
            step={0.5}
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

      <div style={styles.card}>
        <div style={styles.cardTitle}>Financing and Return</div>
        <div style={styles.grid3}>
          <Field
            label="Target Equity IRR"
            value={inputs.targetIRR}
            onChange={set("targetIRR")}
            suffix="%"
            min={0}
            max={40}
            step={0.5}
          />
          <Field
            label="Discount Rate (WACC)"
            value={inputs.discountRate}
            onChange={set("discountRate")}
            suffix="%"
            min={0}
            max={30}
            step={0.5}
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
            label="Interest Rate"
            value={inputs.interestRate}
            onChange={set("interestRate")}
            suffix="%"
            min={0}
            max={30}
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

      <button style={styles.btn} onClick={calcPPA}>
        Calculate PPA Tariff
      </button>

      {results && (
        <div style={{ marginTop: 36 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
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
                Min Viable Tariff
              </div>
              <div style={getResultValueStyle("green")}>
                {fmtTariff(results.minTariff)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.inkLight,
                  marginTop: 4,
                  fontFamily: "sans-serif",
                }}
              >
                At target IRR of {inputs.targetIRR}%
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
                LCOE
              </div>
              <div style={getResultValueStyle("blue")}>
                {fmtTariff(results.lcoe)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.inkLight,
                  marginTop: 4,
                  fontFamily: "sans-serif",
                }}
              >
                Levelised cost floor
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
                Total Project CAPEX
              </div>
              <div style={getResultValueStyle("gold")}>
                {fmtM(results.capex)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.inkLight,
                  marginTop: 4,
                  fontFamily: "sans-serif",
                }}
              >
                {fmt.pct(inputs.debtRatio / 100)} debt financed
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Tariff Sensitivity by IRR Target</div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Target IRR</th>
                  <th style={{ ...styles.th, textAlign: "right" }}>
                    Required Tariff
                  </th>
                  <th style={{ ...styles.th, textAlign: "right" }}>vs LCOE</th>
                  <th style={{ ...styles.th, textAlign: "right" }}>
                    Premium over LCOE
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.sensitivity.map(function (row) {
                  var premium = row.tariff - results.lcoe;
                  var premiumPct =
                    results.lcoe > 0 ? premium / results.lcoe : 0;
                  var isTarget = row.irr === inputs.targetIRR;
                  return (
                    <tr
                      key={row.irr}
                      style={{
                        backgroundColor: isTarget
                          ? C.accentLight
                          : "transparent",
                      }}
                    >
                      <td
                        style={{
                          ...styles.td,
                          fontWeight: isTarget ? "bold" : "normal",
                          color: isTarget ? C.accent : C.inkMid,
                        }}
                      >
                        {row.irr}%{isTarget ? " (target)" : ""}
                      </td>
                      <td
                        style={{
                          ...styles.tdNum,
                          fontWeight: isTarget ? "bold" : "normal",
                          color: isTarget ? C.accent : C.ink,
                        }}
                      >
                        {fmtTariff(row.tariff)}
                      </td>
                      <td style={{ ...styles.tdNum, color: C.inkMid }}>
                        {fmtTariff(results.lcoe)}
                      </td>
                      <td
                        style={{
                          ...styles.tdNum,
                          color: premium > 0 ? C.gold : C.accent,
                        }}
                      >
                        {sym}
                        {(premium * 1000).toFixed(2)}/MWh ({fmt.pct(premiumPct)}
                        )
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={styles.insight}>
              <strong>Note: </strong>The LCOE of {fmtTariff(results.lcoe)}{" "}
              represents the absolute floor — any tariff below this destroys
              value regardless of financing. The minimum viable tariff of{" "}
              {fmtTariff(results.minTariff)} accounts for the full cost of
              capital at your target IRR.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CARBON CREDIT MODULE ─────────────────────────────────────────────────────

var BENCHMARKS = [
  { standard: "VCS (Verra)", type: "REDD+ Forestry", low: 3, high: 12 },
  { standard: "VCS (Verra)", type: "Renewable Energy", low: 1, high: 5 },
  { standard: "Gold Standard", type: "Clean Cookstoves", low: 8, high: 25 },
  { standard: "Gold Standard", type: "Solar / Wind", low: 4, high: 15 },
  { standard: "ACR", type: "Soil Carbon", low: 10, high: 30 },
  { standard: "Plan Vivo", type: "Agroforestry", low: 6, high: 18 },
];

function CarbonModule() {
  var projectsHook = useState([]);
  var projects = projectsHook[0];
  var setProjects = projectsHook[1];

  var formHook = useState({
    name: "",
    standard: "VCS (Verra)",
    vintage: 2023,
    credits: 10000,
    price: 8,
  });
  var form = formHook[0];
  var setForm = formHook[1];

  var showBenchHook = useState(false);
  var showBench = showBenchHook[0];
  var setShowBench = showBenchHook[1];

  function setF(key) {
    return function (val) {
      setForm(function (p) {
        var n = Object.assign({}, p);
        n[key] = val;
        return n;
      });
    };
  }

  function addProject() {
    if (!form.name) return;
    setProjects(function (p) {
      return p.concat([
        {
          id: Date.now(),
          name: form.name,
          standard: form.standard,
          vintage: form.vintage,
          credits: form.credits,
          price: form.price,
        },
      ]);
    });
    setForm({
      name: "",
      standard: "VCS (Verra)",
      vintage: 2023,
      credits: 10000,
      price: 8,
    });
  }

  function removeProject(id) {
    setProjects(function (p) {
      return p.filter(function (x) {
        return x.id !== id;
      });
    });
  }

  var totalCredits = projects.reduce(function (a, p) {
    return a + p.credits;
  }, 0);
  var totalValue = projects.reduce(function (a, p) {
    return a + p.credits * p.price;
  }, 0);
  var avgPrice = totalCredits > 0 ? totalValue / totalCredits : 0;

  var byStandard = projects.reduce(function (acc, p) {
    acc[p.standard] = (acc[p.standard] || 0) + p.credits * p.price;
    return acc;
  }, {});

  var standards = ["VCS (Verra)", "Gold Standard", "ACR", "Plan Vivo"];

  return (
    <div>
      <h1 style={styles.pageTitle}>Carbon Credit Portfolio Tracker</h1>
      <p style={styles.pageDesc}>
        Track voluntary carbon credit projects by standard and vintage. Monitor
        portfolio value and compare pricing against market benchmarks.
      </p>

      {projects.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
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
              Total Portfolio Value
            </div>
            <div style={getResultValueStyle("green")}>
              ${(totalValue / 1000).toFixed(0)}K
            </div>
            <div
              style={{
                fontSize: 11,
                color: C.inkLight,
                marginTop: 4,
                fontFamily: "sans-serif",
              }}
            >
              {projects.length} project{projects.length !== 1 ? "s" : ""}
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
              Total Credits
            </div>
            <div style={getResultValueStyle("blue")}>
              {(totalCredits / 1000).toFixed(1)}K
            </div>
            <div
              style={{
                fontSize: 11,
                color: C.inkLight,
                marginTop: 4,
                fontFamily: "sans-serif",
              }}
            >
              tCO2e
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
              Avg Price
            </div>
            <div style={getResultValueStyle("gold")}>
              ${avgPrice.toFixed(2)}
            </div>
            <div
              style={{
                fontSize: 11,
                color: C.inkLight,
                marginTop: 4,
                fontFamily: "sans-serif",
              }}
            >
              per tCO2e
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
              Standards
            </div>
            <div style={getResultValueStyle("blue")}>
              {Object.keys(byStandard).length}
            </div>
            <div
              style={{
                fontSize: 11,
                color: C.inkLight,
                marginTop: 4,
                fontFamily: "sans-serif",
              }}
            >
              in portfolio
            </div>
          </div>
        </div>
      )}

      <div style={styles.card}>
        <div style={styles.cardTitle}>Add Project</div>
        <div style={styles.grid3}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Project Name</label>
            <input
              type="text"
              value={form.name}
              onChange={function (e) {
                setF("name")(e.target.value);
              }}
              placeholder="e.g. Kalahari Solar Credits"
              style={{ ...styles.input, paddingLeft: 14 }}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Standard</label>
            <select
              value={form.standard}
              onChange={function (e) {
                setF("standard")(e.target.value);
              }}
              style={{ ...styles.input, paddingLeft: 14 }}
            >
              {standards.map(function (s) {
                return (
                  <option key={s} value={s}>
                    {s}
                  </option>
                );
              })}
            </select>
          </div>
          <Field
            label="Vintage Year"
            value={form.vintage}
            onChange={setF("vintage")}
            min={2000}
            max={2030}
            step={1}
          />
          <Field
            label="Credits Issued (tCO2e)"
            value={form.credits}
            onChange={setF("credits")}
            min={0}
            step={1000}
          />
          <Field
            label="Price per Credit (USD)"
            value={form.price}
            onChange={setF("price")}
            prefix="$"
            min={0}
            step={0.5}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <button style={styles.btn} onClick={addProject}>
            Add to Portfolio
          </button>
        </div>
      </div>

      {projects.length > 0 && (
        <div style={styles.card}>
          <div style={styles.cardTitle}>Portfolio</div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Project</th>
                <th style={styles.th}>Standard</th>
                <th style={{ ...styles.th, textAlign: "right" }}>Vintage</th>
                <th style={{ ...styles.th, textAlign: "right" }}>
                  Credits (tCO2e)
                </th>
                <th style={{ ...styles.th, textAlign: "right" }}>
                  Price / tCO2e
                </th>
                <th style={{ ...styles.th, textAlign: "right" }}>Value</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {projects.map(function (p) {
                var bench = BENCHMARKS.find(function (b) {
                  return b.standard === p.standard;
                });
                var inRange = bench
                  ? p.price >= bench.low && p.price <= bench.high
                  : true;
                return (
                  <tr key={p.id}>
                    <td style={styles.td}>{p.name}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          fontSize: 11,
                          padding: "2px 8px",
                          borderRadius: 3,
                          backgroundColor: C.accentLight,
                          color: C.accent,
                          fontFamily: "sans-serif",
                        }}
                      >
                        {p.standard}
                      </span>
                    </td>
                    <td style={styles.tdNum}>{p.vintage}</td>
                    <td style={styles.tdNum}>{p.credits.toLocaleString()}</td>
                    <td
                      style={{
                        ...styles.tdNum,
                        color: inRange ? C.accent : C.gold,
                      }}
                    >
                      ${p.price.toFixed(2)}
                      {!inRange ? " *" : ""}
                    </td>
                    <td style={{ ...styles.tdNum, fontWeight: "bold" }}>
                      ${(p.credits * p.price).toLocaleString()}
                    </td>
                    <td style={{ ...styles.td, textAlign: "right" }}>
                      <button
                        onClick={function () {
                          removeProject(p.id);
                        }}
                        style={{
                          fontSize: 11,
                          color: C.red,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "sans-serif",
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div style={styles.card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={styles.cardTitle}>Market Benchmarks (2024)</div>
          <button
            style={{
              ...styles.btnOutline,
              marginBottom: 0,
              padding: "6px 14px",
              fontSize: 11,
            }}
            onClick={function () {
              setShowBench(function (v) {
                return !v;
              });
            }}
          >
            {showBench ? "Hide" : "Show"} Benchmarks
          </button>
        </div>
        {showBench && (
          <table style={{ ...styles.table, marginTop: 16 }}>
            <thead>
              <tr>
                <th style={styles.th}>Standard</th>
                <th style={styles.th}>Project Type</th>
                <th style={{ ...styles.th, textAlign: "right" }}>
                  Low ($/tCO2e)
                </th>
                <th style={{ ...styles.th, textAlign: "right" }}>
                  High ($/tCO2e)
                </th>
              </tr>
            </thead>
            <tbody>
              {BENCHMARKS.map(function (b, i) {
                return (
                  <tr key={i}>
                    <td style={styles.td}>{b.standard}</td>
                    <td style={styles.td}>{b.type}</td>
                    <td style={styles.tdNum}>${b.low}</td>
                    <td style={styles.tdNum}>${b.high}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div style={{ ...styles.insight, marginTop: showBench ? 16 : 0 }}>
          <strong>Note: </strong>Prices marked with * fall outside typical
          benchmark ranges for their standard. Voluntary carbon market prices
          vary significantly by project quality, vintage, and buyer demand.
          These benchmarks are indicative only.
        </div>
      </div>
    </div>
  );
}

// ─── TRANSITION COST MODULE ───────────────────────────────────────────────────

var TECH_DEFAULTS = [
  {
    name: "Utility Solar PV",
    capexPerMW: 900000,
    lifetimeYears: 25,
    color: "gold",
  },
  {
    name: "Onshore Wind",
    capexPerMW: 1400000,
    lifetimeYears: 25,
    color: "blue",
  },
  {
    name: "Battery Storage (4hr)",
    capexPerMW: 1200000,
    lifetimeYears: 15,
    color: "green",
  },
  {
    name: "Rooftop Solar",
    capexPerMW: 1100000,
    lifetimeYears: 20,
    color: "gold",
  },
];

function TransitionModule() {
  var currencyHook = useState("USD");
  var currency = currencyHook[0];
  var setCurrency = currencyHook[1];
  var rate = currency === "USD" ? 1 : 18.5;
  var sym = currency === "USD" ? "$" : "R";

  var defaultTargets = TECH_DEFAULTS.map(function (t) {
    return {
      name: t.name,
      targetMW: 0,
      capexPerMW: t.capexPerMW,
      lifetimeYears: t.lifetimeYears,
      color: t.color,
    };
  });

  var targetsHook = useState(defaultTargets);
  var targets = targetsHook[0];
  var setTargets = targetsHook[1];

  var paramsHook = useState({
    timeline: 10,
    population: 500000,
    currentAnnualBudget: 50000000,
    debtRatio: 60,
    interestRate: 8,
    greenBondRate: 6,
  });
  var params = paramsHook[0];
  var setParams = paramsHook[1];

  var resultsHook = useState(null);
  var results = resultsHook[0];
  var setResults = resultsHook[1];

  function setTarget(i, key) {
    return function (val) {
      setTargets(function (prev) {
        var next = prev.slice();
        next[i] = Object.assign({}, next[i]);
        next[i][key] = val;
        return next;
      });
    };
  }

  function setP(key) {
    return function (val) {
      setParams(function (p) {
        var n = Object.assign({}, p);
        n[key] = val;
        return n;
      });
    };
  }

  function calcTransition() {
    var totalCapex = targets.reduce(function (a, t) {
      return a + t.targetMW * t.capexPerMW * rate;
    }, 0);
    var annualCapex = totalCapex / params.timeline;
    var debtFinanced = totalCapex * (params.debtRatio / 100);
    var equityFinanced = totalCapex - debtFinanced;
    var annualDebtService =
      debtFinanced > 0
        ? (debtFinanced * (params.interestRate / 100)) /
          (1 - Math.pow(1 + params.interestRate / 100, -20))
        : 0;
    var greenBondSize = debtFinanced * 0.6;
    var annualGreenBondCost =
      greenBondSize > 0
        ? (greenBondSize * (params.greenBondRate / 100)) /
          (1 - Math.pow(1 + params.greenBondRate / 100, -20))
        : 0;
    var financingGap = Math.max(
      0,
      annualCapex - params.currentAnnualBudget * rate,
    );
    var ratepayerImpact =
      params.population > 0 ? annualCapex / params.population / 12 : 0;
    var totalMW = targets.reduce(function (a, t) {
      return a + t.targetMW;
    }, 0);

    setResults({
      totalCapex: totalCapex,
      annualCapex: annualCapex,
      debtFinanced: debtFinanced,
      equityFinanced: equityFinanced,
      annualDebtService: annualDebtService,
      greenBondSize: greenBondSize,
      annualGreenBondCost: annualGreenBondCost,
      financingGap: financingGap,
      ratepayerImpact: ratepayerImpact,
      totalMW: totalMW,
    });
  }

  var fmtM = function (v) {
    return sym + (v / 1e6).toFixed(1) + "M";
  };
  var fmtB = function (v) {
    return v >= 1e9
      ? sym + (v / 1e9).toFixed(2) + "B"
      : sym + (v / 1e6).toFixed(1) + "M";
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <h1 style={styles.pageTitle}>Energy Transition Cost Modeller</h1>
        <div style={{ display: "flex", gap: 8 }}>
          {["USD", "ZAR"].map(function (c) {
            return (
              <button
                key={c}
                onClick={function () {
                  setCurrency(c);
                  setResults(null);
                }}
                style={{
                  padding: "6px 16px",
                  fontSize: 12,
                  fontFamily: "sans-serif",
                  fontWeight: "600",
                  border: "1px solid " + (currency === c ? C.accent : C.border),
                  backgroundColor: currency === c ? C.accent : "transparent",
                  color: currency === c ? "#fff" : C.inkMid,
                  borderRadius: 4,
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
      <p style={styles.pageDesc}>
        Translate city-scale renewable energy targets into capital requirements,
        financing gaps, green bond sizing, and ratepayer cost impact.
      </p>

      <div style={styles.card}>
        <div style={styles.cardTitle}>Technology Targets</div>
        {targets.map(function (t, i) {
          return (
            <div
              key={t.name}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                gap: 16,
                marginBottom: 16,
                paddingBottom: 16,
                borderBottom:
                  i < targets.length - 1 ? "1px solid " + C.border : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor:
                      t.color === "gold"
                        ? C.gold
                        : t.color === "blue"
                          ? C.blue
                          : C.accent,
                    marginRight: 10,
                  }}
                ></div>
                <span
                  style={{
                    fontSize: 14,
                    color: C.ink,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {t.name}
                </span>
              </div>
              <Field
                label="Target (MW)"
                value={t.targetMW}
                onChange={setTarget(i, "targetMW")}
                min={0}
                step={10}
              />
              <Field
                label={"CAPEX/MW (" + sym + ")"}
                value={t.capexPerMW}
                onChange={setTarget(i, "capexPerMW")}
                min={0}
                step={50000}
              />
            </div>
          );
        })}
      </div>

      <div style={styles.card}>
        <div style={styles.cardTitle}>City and Financing Parameters</div>
        <div style={styles.grid3}>
          <Field
            label="Transition Timeline"
            value={params.timeline}
            onChange={setP("timeline")}
            suffix="years"
            min={1}
            max={30}
          />
          <Field
            label="City Population"
            value={params.population}
            onChange={setP("population")}
            min={0}
            step={10000}
          />
          <Field
            label={"Current Annual Energy Budget (" + sym + ")"}
            value={params.currentAnnualBudget}
            onChange={setP("currentAnnualBudget")}
            min={0}
            step={1000000}
          />
          <Field
            label="Debt Financing Ratio"
            value={params.debtRatio}
            onChange={setP("debtRatio")}
            suffix="%"
            min={0}
            max={100}
          />
          <Field
            label="Debt Interest Rate"
            value={params.interestRate}
            onChange={setP("interestRate")}
            suffix="%"
            min={0}
            max={20}
            step={0.1}
          />
          <Field
            label="Green Bond Rate"
            value={params.greenBondRate}
            onChange={setP("greenBondRate")}
            suffix="%"
            min={0}
            max={20}
            step={0.1}
          />
        </div>
      </div>

      <button style={styles.btn} onClick={calcTransition}>
        Model Transition
      </button>

      {results && (
        <div style={{ marginTop: 36 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              marginBottom: 24,
            }}
          >
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
                Total CAPEX Required
              </div>
              <div style={getResultValueStyle("blue")}>
                {fmtB(results.totalCapex)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.inkLight,
                  marginTop: 4,
                  fontFamily: "sans-serif",
                }}
              >
                {results.totalMW.toFixed(0)} MW total capacity
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
                Annual Investment Need
              </div>
              <div style={getResultValueStyle("gold")}>
                {fmtM(results.annualCapex)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.inkLight,
                  marginTop: 4,
                  fontFamily: "sans-serif",
                }}
              >
                Over {params.timeline} year timeline
              </div>
            </div>
            <div
              style={getResultCardStyle(
                results.financingGap > 0 ? "red" : "green",
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
                Annual Financing Gap
              </div>
              <div
                style={getResultValueStyle(
                  results.financingGap > 0 ? "red" : "green",
                )}
              >
                {results.financingGap > 0 ? fmtM(results.financingGap) : "None"}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.inkLight,
                  marginTop: 4,
                  fontFamily: "sans-serif",
                }}
              >
                vs current budget
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>Financing Structure</div>
            <div style={styles.grid3}>
              {[
                { label: "Total CAPEX", val: fmtB(results.totalCapex) },
                { label: "Debt Financed", val: fmtB(results.debtFinanced) },
                {
                  label: "Equity / Grants Required",
                  val: fmtB(results.equityFinanced),
                },
                {
                  label: "Green Bond Sizing (60% of debt)",
                  val: fmtB(results.greenBondSize),
                },
                {
                  label: "Annual Debt Service",
                  val: fmtM(results.annualDebtService),
                },
                {
                  label: "Annual Green Bond Cost",
                  val: fmtM(results.annualGreenBondCost),
                },
                {
                  label: "Ratepayer Cost Impact",
                  val: sym + results.ratepayerImpact.toFixed(2) + "/month",
                },
                { label: "Timeline", val: params.timeline + " years" },
                {
                  label: "Total Capacity",
                  val: results.totalMW.toFixed(0) + " MW",
                },
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
            {results.financingGap > 0
              ? "There is an annual financing gap of " +
                fmtM(results.financingGap) +
                " between the required investment and the current budget. Green bonds (" +
                fmtB(results.greenBondSize) +
                ") can cover a significant portion of the debt requirement. The ratepayer cost impact of " +
                sym +
                results.ratepayerImpact.toFixed(2) +
                "/month per capita is a key political consideration."
              : "The current annual budget is sufficient to cover the required investment over the " +
                params.timeline +
                "-year timeline. A green bond issuance of " +
                fmtB(results.greenBondSize) +
                " would optimise the financing structure and reduce reliance on general budget allocations."}
          </div>
        </div>
      )}
    </div>
  );
}

var TABS = [
  { id: "pfm", label: "Project Finance", badge: "Live" },
  { id: "ppa", label: "PPA Pricing", badge: "Live" },
  { id: "carbon", label: "Carbon Credits", badge: "Live" },
  { id: "transition", label: "Transition Cost", badge: "Live" },
];

export default function App() {
  var tabHook = useState("pfm");
  var activeTab = tabHook[0];
  var setActiveTab = tabHook[1];

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.headerLogo}>
          <div style={styles.headerIcon}>~</div>
          <div>
            <div style={styles.headerTitle}>Energy Finance Toolkit</div>
            <div style={styles.headerSub}>
              Analytical tools for energy investment
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "sans-serif",
            letterSpacing: "0.06em",
          }}
        >
          v1.0
        </div>
      </header>

      <nav style={styles.nav}>
        {TABS.map(function (tab) {
          return (
            <button
              key={tab.id}
              style={getNavTabStyle(activeTab === tab.id)}
              onClick={function () {
                setActiveTab(tab.id);
              }}
            >
              {tab.label}
              <span style={getNavBadgeStyle(activeTab === tab.id)}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </nav>

      <main style={styles.main}>
        {activeTab === "pfm" && <ProjectFinanceModule />}
        {activeTab === "ppa" && <PPAModule />}
        {activeTab === "carbon" && <CarbonModule />}
        {activeTab === "transition" && <TransitionModule />}
      </main>
    </div>
  );
}
