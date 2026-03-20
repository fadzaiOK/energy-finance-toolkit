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

function buildCashflows(inputs) {
  var capex = inputs.capex;
  var debtRatio = inputs.debtRatio;
  var interestRate = inputs.interestRate;
  var loanTenor = inputs.loanTenor;
  var annualRevenue = inputs.annualRevenue;
  var opex = inputs.opex;
  var degradation = inputs.degradation;
  var projectLife = inputs.projectLife;

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
  var npv = calcNPV(0.1, equityCFs);
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
    if (results.irr >= 0.12 && results.avgDSCR >= 1.3) {
      return (
        "This project looks bankable. An equity IRR of " +
        fmt.pct(results.irr) +
        " exceeds a typical 12% hurdle rate, and the average DSCR of " +
        fmt.x(results.avgDSCR) +
        " should satisfy most project finance lenders."
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
            label="Interest Rate"
            value={inputs.interestRate}
            onChange={set("interestRate")}
            suffix="%"
            min={0}
            max={30}
            step={0.1}
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
          <div style={styles.resultGrid}>
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
                NPV at 10% Hurdle
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
                { label: "Loan Tenor", val: fmt.yr(inputs.loanTenor) },
                {
                  label: "Interest Rate",
                  val: fmt.pct(inputs.interestRate / 100),
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

function ComingSoon(props) {
  var icon = props.icon;
  var title = props.title;
  var desc = props.desc;
  var bullets = props.bullets;

  return (
    <div>
      <div style={styles.comingSoon}>
        <div style={styles.comingSoonIcon}>{icon}</div>
        <div style={styles.comingSoonTitle}>{title}</div>
        <p style={styles.comingSoonDesc}>{desc}</p>
        {bullets && (
          <div
            style={{
              marginTop: 24,
              textAlign: "left",
              display: "inline-block",
            }}
          >
            {bullets.map(function (b) {
              return (
                <div
                  key={b}
                  style={{
                    fontSize: 13,
                    color: C.inkMid,
                    padding: "4px 0",
                    fontFamily: "sans-serif",
                  }}
                >
                  <span style={{ color: C.accent, marginRight: 8 }}>+</span>
                  {b}
                </div>
              );
            })}
          </div>
        )}
        <div
          style={{
            marginTop: 28,
            display: "inline-block",
            padding: "8px 20px",
            backgroundColor: C.accentLight,
            borderRadius: 4,
            fontSize: 12,
            color: C.accent,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            fontWeight: "600",
          }}
        >
          Coming Next
        </div>
      </div>
    </div>
  );
}

var TABS = [
  { id: "pfm", label: "Project Finance", badge: "Live" },
  { id: "ppa", label: "PPA Pricing", badge: "Soon" },
  { id: "carbon", label: "Carbon Credits", badge: "Soon" },
  { id: "transition", label: "Transition Cost", badge: "Soon" },
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
      ```
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
        {activeTab === "ppa" && (
          <ComingSoon
            icon=""
            title="PPA Pricing Calculator"
            desc="Model fair Power Purchase Agreement pricing based on project costs, offtaker creditworthiness, risk profile, and market benchmarks."
            bullets={[
              "Levelised Cost of Energy (LCOE) calculation",
              "Risk-adjusted tariff modelling",
              "Offtaker credit rating impact",
              "Inflation-linked vs fixed tariff comparison",
            ]}
          />
        )}
        {activeTab === "carbon" && (
          <ComingSoon
            icon=""
            title="Carbon Credit Portfolio Tracker"
            desc="Track voluntary carbon credit projects, vintages, and pricing. Calculate portfolio value and analyse credit quality across standards."
            bullets={[
              "Project-level credit issuance tracking",
              "Vintage and standard classification (VCS, Gold Standard)",
              "Portfolio value and risk summary",
              "Market price benchmarking",
            ]}
          />
        )}
        {activeTab === "transition" && (
          <ComingSoon
            icon=""
            title="City-Scale Energy Transition Cost Modeller"
            desc="Translate energy transition scenarios into capital requirements and financing gaps - from municipal renewable targets to ratepayer impact."
            bullets={[
              "Scenario-based CAPEX requirement modelling",
              "Green bond sizing and financing gap analysis",
              "Ratepayer cost impact calculator",
              "Technology mix sensitivity analysis",
            ]}
          />
        )}
      </main>
    </div>
  );
}
