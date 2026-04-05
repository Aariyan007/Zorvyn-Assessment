import { motion } from "framer-motion";
import { getCategoryColor } from "../data/mockData";

function fmt(n) { return "₹" + n.toLocaleString("en-IN"); }

// gradient per bar: use category colour → orange
function barGradient(color) {
  return `linear-gradient(90deg, ${color}, #f97316)`;
}

export default function CategoryBars({ transactions }) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const catMap   = {};
  expenses.forEach((t) => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
  const entries  = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const total    = entries.reduce((s, [, v]) => s + v, 0);

  return (
    <div className="catbars-card" id="section-analytics-bars">
      <div className="section-header">
        <span className="section-title">Spending by Category</span>
        <span className="section-badge">% of total</span>
      </div>

      {total === 0 ? (
        <div className="empty-state" style={{ padding: "24px 0" }}>
          <div className="empty-title">No expense data yet</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {entries.map(([cat, val], i) => {
            const pct   = Math.round((val / total) * 100);
            const color = getCategoryColor(cat);
            return (
              <div key={cat}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: barGradient(color),
                      display: "inline-block", flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text2)" }}>{cat}</span>
                  </div>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--head)", fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{fmt(val)}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)", minWidth: 28, textAlign: "right" }}>{pct}%</span>
                  </div>
                </div>
                <div style={{ height: 6, background: "var(--bg4)", borderRadius: 99, overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: pct + "%" }}
                    transition={{ delay: i * 0.07 + 0.2, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                      height: "100%",
                      background: barGradient(color),
                      borderRadius: 99,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}