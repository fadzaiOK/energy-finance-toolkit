import { useState } from "react";
import { styles, getNavTabStyle, getNavBadgeStyle } from "./constants/theme";
import ProjectFinanceModule from "./modules/ProjectFinance.jsx";
import PPAModule from "./modules/PPAPricing.jsx";
import CarbonModule from "./modules/CarbonCredits.jsx";
import TransitionModule from "./modules/TransitionCost.jsx";

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
