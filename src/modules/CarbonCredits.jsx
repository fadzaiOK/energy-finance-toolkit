import { useState } from "react";
import {
  C,
  styles,
  getResultCardStyle,
  getResultValueStyle,
} from "../constants/theme";
import Field from "../components/Field.jsx";

var BENCHMARKS = [
  { standard: "VCS (Verra)", type: "REDD+ Forestry", low: 3, high: 12 },
  { standard: "VCS (Verra)", type: "Renewable Energy", low: 1, high: 5 },
  { standard: "Gold Standard", type: "Clean Cookstoves", low: 8, high: 25 },
  { standard: "Gold Standard", type: "Solar / Wind", low: 4, high: 15 },
  { standard: "ACR", type: "Soil Carbon", low: 10, high: 30 },
  { standard: "Plan Vivo", type: "Agroforestry", low: 6, high: 18 },
];

var STANDARDS = ["VCS (Verra)", "Gold Standard", "ACR", "Plan Vivo"];

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
              {STANDARDS.map(function (s) {
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
          benchmark ranges for their standard. These benchmarks are indicative
          only.
        </div>
      </div>
    </div>
  );
}

export default CarbonModule;
