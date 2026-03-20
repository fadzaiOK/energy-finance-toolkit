import { useState } from "react";
import {
  C,
  styles,
  getResultCardStyle,
  getResultValueStyle,
  getCurrencyToggleStyle,
} from "../constants/theme";
import Field from "../components/Field.jsx";

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
                style={getCurrencyToggleStyle(currency === c)}
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

export default TransitionModule;
