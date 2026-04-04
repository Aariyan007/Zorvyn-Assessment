import { motion } from "framer-motion";

function fmt(n) { return "₹" + Math.abs(n).toLocaleString("en-IN"); }

export default function SummaryCards({ balance, income, expense }) {
  return (
    <div className="summary-grid" style={{ marginBottom: 24 }} id="section-dashboard">
      {/* HERO — Balance */}
      <motion.div
        className="summary-card-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="hero-icon-wrap">₹</div>
        <div className="hero-label">Total Balance</div>
        <div className="hero-value">{fmt(balance)}</div>
        <div className="hero-sub">income − expenses</div>

        {/* subtle arrow indicator */}
        <div style={{
          marginTop: 18,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(0,0,0,0.15)",
          borderRadius: 99,
          padding: "5px 12px",
          fontSize: 12,
          color: "rgba(0,0,0,0.6)",
          fontFamily: "var(--mono)",
        }}>
          {balance >= 0 ? "↑" : "↓"} {balance >= 0 ? "Positive" : "Negative"} balance
        </div>
      </motion.div>

      {/* Income */}
      <motion.div
        className="summary-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -3 }}
      >
        <div className="summary-card-accent" style={{ background: "var(--green)" }} />
        <div className="summary-icon" style={{ background: "var(--green-bg)", color: "var(--green)" }}>↑</div>
        <div className="summary-label">Total Income</div>
        <div className="summary-value" style={{ color: "var(--green)" }}>{fmt(income)}</div>
        <div className="summary-sub">money coming in</div>
      </motion.div>

      {/* Expense */}
      <motion.div
        className="summary-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -3 }}
      >
        <div className="summary-card-accent" style={{ background: "var(--red)" }} />
        <div className="summary-icon" style={{ background: "var(--red-bg)", color: "var(--red)" }}>↓</div>
        <div className="summary-label">Total Expenses</div>
        <div className="summary-value" style={{ color: "var(--red)" }}>{fmt(expense)}</div>
        <div className="summary-sub">money going out</div>
      </motion.div>
    </div>
  );
}