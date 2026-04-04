import { motion } from "framer-motion";

function fmt(n) { return "₹" + n.toLocaleString("en-IN"); }

export default function Insights({ transactions }) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const income   = transactions.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
  const expense  = expenses.reduce((a, t) => a + t.amount, 0);
  const balance  = income - expense;

  const catMap = {};
  expenses.forEach((t) => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
  const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const top    = sorted[0] ?? ["N/A", 0];

  const savingsRate = income > 0 ? Math.round((balance / income) * 100) : 0;
  const avgExpense  = expenses.length ? Math.round(expense / expenses.length) : 0;

  const aprInc = transactions.filter((t) => t.type === "income" && t.date.startsWith("2026-04")).reduce((a, t) => a + t.amount, 0);
  const marInc = transactions.filter((t) => t.type === "income" && t.date.startsWith("2026-03")).reduce((a, t) => a + t.amount, 0);
  const growth = marInc > 0 ? Math.round(((aprInc - marInc) / marInc) * 100) : 0;

  const cards = [
    { icon: "🔥", label: "Top Category",  value: top[0],   sub: fmt(top[1]) + " total" },
    { icon: "🎯", label: "Savings Rate",  value: savingsRate + "%", sub: "of income saved" },
    { icon: "📊", label: "Avg Expense",   value: fmt(avgExpense), sub: "per transaction" },
    { icon: "📈", label: "Income Growth", value: (growth >= 0 ? "+" : "") + growth + "%", sub: "vs last month" },
  ];

  return (
    <div style={{ marginBottom: 24 }} id="section-insights">
      <div className="section-header">
        <span className="section-title">Insights</span>
        <span className="section-badge">Live</span>
      </div>
      <div className="insights-grid">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            className="insight-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="insight-icon">{c.icon}</span>
            <div className="insight-label">{c.label}</div>
            <div className="insight-value">{c.value}</div>
            <div className="insight-sub">{c.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}