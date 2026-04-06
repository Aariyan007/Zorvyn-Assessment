import { motion } from "framer-motion";

function fmt(n) { return "₹" + Math.abs(n).toLocaleString("en-IN"); }

export default function Insights({ transactions }) {
  // Calculate insights
  const categories = {};
  const recurring = {};
  
  transactions.forEach(t => {
    // Group by category
    if (!categories[t.category]) {
      categories[t.category] = { count: 0, total: 0 };
    }
    categories[t.category].count += 1;
    categories[t.category].total += Number(t.amount) || 0;
    
    // Track recurring (simplified - same category multiple times)
    if (!recurring[t.category]) recurring[t.category] = 0;
    recurring[t.category] += 1;
  });

  const topCategory = Object.entries(categories).sort((a, b) => b[1].total - a[1].total)[0];
  const avgTransaction = transactions.length > 0 
    ? transactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0) / transactions.length 
    : 0;

  const recurringTxs = Object.entries(recurring).filter(([_, count]) => count > 2).length;

  return (
    <div id="section-insights" style={{ scrollMarginTop: 80 }}>
      <div className="section-header">
        <span className="section-title">Key Insights</span>
        <br></br>
      </div>
      <div className="insights-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <motion.div
          className="insight-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius)",
            padding: 16,
          }}
        >
          <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>Top Spending</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>
            {topCategory ? topCategory[0] : "N/A"}
          </div>
          <div style={{ fontSize: 14, color: "var(--orange)" }}>
            {topCategory ? fmt(topCategory[1].total) : "₹0"}
          </div>
        </motion.div>

        {/* Average Transaction */}
        <motion.div
          className="insight-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          style={{
            background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius)",
            padding: 16,
          }}
        >
          <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>Avg Transaction</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--text)" }}>
            {fmt(avgTransaction)}
          </div>
        </motion.div>

        {/* Recurring Categories */}
        <motion.div
          className="insight-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{
            background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius)",
            padding: 16,
          }}
        >
          <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>Recurring Patterns</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--green)" }}>
            {recurringTxs}
          </div>
          <div style={{ fontSize: 12, color: "var(--text3)" }}>Categories</div>
        </motion.div>

      </div>
    </div>
  );
}