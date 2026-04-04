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
    { emoji: "🔥", label: "Top Category",  value: top[0],                                 sub: fmt(top[1]) + " total",       highlight: true },
    { emoji: "🎯", label: "Savings Rate",  value: savingsRate + "%",                      sub: "of income saved"                             },
    { emoji: "📊", label: "Avg Expense",   value: fmt(avgExpense),                        sub: "per transaction"                             },
    { emoji: "📈", label: "Income Growth", value: (growth >= 0 ? "+" : "") + growth + "%", sub: "vs last month"                              },
  ];

  return (
    <div style={{ marginBottom: 28 }}>
      <SectionLabel>⚡ Insights</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 }}>
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(249,115,22,0.1)" }}
            style={{
              background: "var(--bg2)", border: "1px solid var(--border)",
              borderRadius: 14, padding: "18px 20px",
              cursor: "default", boxShadow: "var(--shadow)",
              transition: "box-shadow 0.3s",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 10 }}>{c.emoji}</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>
              {c.label}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--orange)", letterSpacing: -0.5 }}>
              {c.value}
            </div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 3 }}>{c.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)",
      textTransform: "uppercase", letterSpacing: 2, marginBottom: 12,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      {children}
    </div>
  );
}