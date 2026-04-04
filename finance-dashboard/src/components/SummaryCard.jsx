import { motion } from "framer-motion";

const config = {
  Balance:  { icon: "₹",  label: "Total Balance",  accent: "linear-gradient(90deg,#f97316,#fb923c)", valueColor: "var(--orange)",  sub: "income − expenses" },
  Income:   { icon: "↑",  label: "Total Income",   accent: "#16a34a",                                valueColor: "var(--green)",   sub: "money coming in" },
  Expenses: { icon: "↓",  label: "Total Expenses", accent: "#dc2626",                                valueColor: "var(--red)",     sub: "money going out" },
};

export default function SummaryCard({ title, value, index = 0 }) {
  const c   = config[title] || config.Balance;
  const fmt = (n) => "₹" + Math.abs(n).toLocaleString("en-IN");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -5, boxShadow: "0 12px 40px rgba(249,115,22,0.12)" }}
      style={{
        background: "var(--bg2)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: "24px 24px 20px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        boxShadow: "var(--shadow)",
        transition: "box-shadow 0.3s",
      }}
    >
      {/* sliding top accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: index * 0.1 + 0.35, duration: 0.5, ease: "easeOut" }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: c.accent, transformOrigin: "left",
        }}
      />

      {/* icon pill */}
      <div style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 36, height: 36, borderRadius: 10,
        background: "var(--orange-dim)",
        color: "var(--orange)", fontSize: 16, fontWeight: 700,
        marginBottom: 16,
      }}>
        {c.icon}
      </div>

      <div style={{
        fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)",
        textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8,
      }}>
        {c.label}
      </div>

      <div style={{
        fontFamily: "var(--mono)", fontSize: 30, fontWeight: 700,
        letterSpacing: -1.5, color: c.valueColor, lineHeight: 1,
      }}>
        {fmt(value)}
      </div>

      <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 8 }}>
        {c.sub}
      </div>

      {/* faint watermark */}
      <div style={{
        position: "absolute", right: 18, bottom: 14,
        fontFamily: "var(--mono)", fontSize: 48, fontWeight: 700,
        color: "var(--text)", opacity: 0.03, pointerEvents: "none",
        lineHeight: 1, userSelect: "none",
      }}>
        {c.icon}
      </div>
    </motion.div>
  );
}