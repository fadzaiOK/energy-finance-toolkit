import { useState } from "react";
import {
  C,
  styles,
  getResultCardStyle,
  getResultValueStyle,
  getCurrencyToggleStyle,
} from "../constants/theme";
import { calcNPV, calcLCOE, fmt } from "../utils/finance";
import Field from "../components/Field.jsx";

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

    ```
var lcoe = calcLCOE(inputs, rate);

function npvAtTariff(tariff) {
  var cfs = [-equity];
  for (var y = 1; y <= inputs.projectLife; y++) {
    var energy = annualEnergy * Math.pow(1 - inputs.degradation / 100, y - 1);
    var revenue = energy * tariff;
    var opex = inputs.capacityMW * inputs.opexPerMW * rate;
    var ebitda = revenue - opex;
    var tax = Math.max(0, ebitda * (inputs.taxRate / 100));
    var fcfe = ebitda - tax - annualDebtService;
    cfs.push(fcfe);
  }
  return calcNPV(inputs.targetIRR / 100, cfs);
}

var lo = 0, hi = lcoe * 5, mid = 0;
for (var i = 0; i < 100; i++) {
  mid = (lo + hi) / 2;
  if (npvAtTariff(mid) > 0) hi = mid; else lo = mid;
}
var minTariff = mid;

var sensitivity = [10, 12, 14, 16, 18].map(function(irr) {
  var lo2 = 0, hi2 = lcoe * 5, mid2 = 0;
  for (var j = 0; j < 100; j++) {
    mid2 = (lo2 + hi2) / 2;
    var cfs2 = [-equity];
    for (var y = 1; y <= inputs.projectLife; y++) {
      var energy = annualEnergy * Math.pow(1 - inputs.degradation / 100, y - 1);
      var revenue = energy * mid2;
      var opex = inputs.capacityMW * inputs.opexPerMW * rate;
      var ebitda = revenue - opex;
      var tax = Math.max(0, ebitda * (inputs.taxRate / 100));
      var fcfe = ebitda - tax - annualDebtService;
      cfs2.push(fcfe);
    }
    if (calcNPV(irr / 100, cfs2) > 0) hi2 = mid2; else lo2 = mid2;
  }
  return { irr: irr, tariff: mid2 };
});

setResults({ lcoe: lcoe, minTariff: minTariff, annualEnergy: annualEnergy, capex: capex, sensitivity: sensitivity });
```;
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
                style={getCurrencyToggleStyle(currency === c)}
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
      ```
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
              represents the absolute floor. The minimum viable tariff of{" "}
              {fmtTariff(results.minTariff)} accounts for the full cost of
              capital at your target IRR.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PPAModule;
