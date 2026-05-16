export const Theme = {
  colors: {
    background: "#0B0F14",
    card: "#151A21",
    cardSoft: "#101722",
    primary: "#00E5A8",
    secondary: "#3B82F6",
    text: "#FFFFFF",
    textSoft: "#D1D5DB",
    textMuted: "#8A94A6",
    border: "#26303B",
    danger: "#EF4444",
    warning: "#F59E0B"
  },
  radius: { sm: 10, md: 14, lg: 22, xl: 30 },
  text: {
    h1: { color: "#FFFFFF", fontSize: 32, fontWeight: "900" as const, letterSpacing: -0.8 },
    h2: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" as const, letterSpacing: -0.4 },
    h3: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" as const },
    body: { color: "#D1D5DB", fontSize: 15, lineHeight: 22 },
    subtitle: { color: "#8A94A6", fontSize: 14, lineHeight: 21, marginTop: 6 }
  },
  card: {
    backgroundColor: "#151A21",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "#26303B"
  }
};
