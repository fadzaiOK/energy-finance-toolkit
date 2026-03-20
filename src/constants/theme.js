export var C = {
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

export var styles = {
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
};

export function getResultCardStyle(color) {
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

export function getResultValueStyle(color) {
  var colorMap = { green: C.accent, gold: C.gold, blue: C.blue, red: C.red };
  return {
    fontSize: 28,
    fontWeight: "normal",
    color: colorMap[color] || C.accent,
    letterSpacing: "-0.02em",
    lineHeight: 1,
  };
}

export function getNavTabStyle(active) {
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

export function getNavBadgeStyle(active) {
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

export function getCurrencyToggleStyle(active) {
  return {
    padding: "6px 16px",
    fontSize: 12,
    fontFamily: "sans-serif",
    fontWeight: "600",
    border: "1px solid " + (active ? C.accent : C.border),
    backgroundColor: active ? C.accent : "transparent",
    color: active ? "#fff" : C.inkMid,
    borderRadius: 4,
    cursor: "pointer",
    letterSpacing: "0.06em",
  };
}
