import { motion } from "framer-motion";
import { getCategoryColor } from "../data/mockData";
import { SectionLabel } from "./Insights";

function fmt(n) { return "₹" + n.toLocaleString("en-IN"); }

export default function CategoryBars({ transactions }) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const catMap   = {};
  expenses.forEach((t) => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
  const entries  = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const total    = entries.reduce((s, [, v]) => s + v, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      style={{
        background: "var(--bg2)", border: "1px solid var(--border)",
        borderRadius: 16, padding: "24px", marginBottom: 28,
        boxShadow: "var(--shadow)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>Spending by Category</div>
        <span style={{
          fontFamily: "var(--mono)", fontSize: 10, background: "var(--bg3)",
          color: "var(--text3)", borderRadius: 99, padding: "4px 12px",
        }}>
          % of total
        </span>
      </div>

      {total === 0 ? (
        <div style={{ color: "var(--text3)", fontSize: 13, textAlign: "center", padding: "24px 0" }}>
          No expense data yet
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {entries.map(([cat, val], i) => {
            const pct = Math.round((val / total) * 100);
            const color = getCategoryColor(cat);
            return (
              <div key={cat}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text2)" }}>{cat}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text2)", fontWeight: 600 }}>{fmt(val)}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)", minWidth: 30, textAlign: "right" }}>{pct}%</span>
                  </div>
                </div>
                <div style={{ height: 6, background: "var(--bg3)", borderRadius: 99, overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: pct + "%" }}
                    transition={{ delay: i * 0.06 + 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    style={{ height: "100%", background: color, borderRadius: 99 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}