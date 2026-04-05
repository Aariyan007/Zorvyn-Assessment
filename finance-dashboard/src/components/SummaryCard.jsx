import { motion } from "framer-motion";
import { IconWallet, IconTrendUp, IconTrendDown, IconArrowUp, IconArrowDown } from "./Icons";

function fmt(n) {
  const num = Number(n);
  if (isNaN(num)) return "₹0";
  return "₹" + Math.abs(num).toLocaleString("en-IN");
}

export default function SummaryCards({ balance, income, expense }) {
  // guard against NaN — treat undefined as 0
  const b = Number(balance) || 0;
  const i = Number(income)  || 0;
  const e = Number(expense) || 0;

  return (
    <div className="summary-grid" id="section-dashboard">

      {/* ── HERO: Balance ── */}
      <motion.div
        className="summary-card-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scale: 1.015 }}
      >
        <div className="hero-icon-wrap">
          <IconWallet size={18} color="rgba(0,0,0,0.65)" />
        </div>
        <div className="hero-label">Total Balance</div>
        <div className="hero-value">{fmt(b)}</div>
        <div className="hero-sub">income − expenses</div>
        <div style={{
          marginTop: 18, display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(0,0,0,0.15)", borderRadius: 99,
          padding: "5px 12px", fontSize: 12,
          color: "rgba(0,0,0,0.6)", fontFamily: "var(--mono)",
        }}>
          {b >= 0
            ? <><IconArrowUp size={11} color="rgba(0,0,0,0.6)" /> Positive balance</>
            : <><IconArrowDown size={11} color="rgba(0,0,0,0.6)" /> Negative balance</>
          }
        </div>
      </motion.div>

      {/* ── Income ── */}
      <motion.div
        className="summary-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -3 }}
      >
        <div className="summary-card-accent" style={{ background: "var(--grad-green)" }} />
        <div className="summary-icon" style={{ background: "var(--green-bg)" }}>
          <IconTrendUp size={15} color="var(--green)" />
        </div>
        <div className="summary-label">Total Income</div>
        <div className="summary-value" style={{ color: "var(--green)" }}>{fmt(i)}</div>
        <div className="summary-sub">money coming in</div>
      </motion.div>

      {/* ── Expenses ── */}
      <motion.div
        className="summary-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -3 }}
      >
        <div className="summary-card-accent" style={{ background: "var(--grad-red)" }} />
        <div className="summary-icon" style={{ background: "var(--red-bg)" }}>
          <IconTrendDown size={15} color="var(--red)" />
        </div>
        <div className="summary-label">Total Expenses</div>
        <div className="summary-value" style={{ color: "var(--red)" }}>{fmt(e)}</div>
        <div className="summary-sub">money going out</div>
      </motion.div>

    </div>
  );
}