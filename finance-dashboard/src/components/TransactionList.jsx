import { motion, AnimatePresence } from "framer-motion";
import { getCategoryColor } from "../data/mockData";

function fmt(n) { return "₹" + Math.abs(n).toLocaleString("en-IN"); }

export default function TransactionList({ transactions, role, deleteTx }) {
  if (!transactions.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ textAlign: "center", padding: "56px 0", color: "var(--text3)" }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
        <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text2)", marginBottom: 4 }}>No transactions found</div>
        <div style={{ fontSize: 13 }}>Try adjusting your filters</div>
      </motion.div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
            {["Date", "Category", "Type", "Amount", ...(role === "admin" ? [""] : [])].map((h, i) => (
              <th key={i} style={{
                fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)",
                textTransform: "uppercase", letterSpacing: 1.5,
                padding: "10px 16px", textAlign: "left", fontWeight: 500,
                whiteSpace: "nowrap",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {transactions.map((t, i) => (
              <motion.tr
                key={t.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 24, transition: { duration: 0.2 } }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                style={{ borderBottom: "1px solid var(--border)", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg3)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Date */}
                <td style={{ padding: "13px 16px", whiteSpace: "nowrap" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text3)" }}>
                    {t.date}
                  </span>
                </td>

                {/* Category */}
                <td style={{ padding: "13px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <span style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      background: getCategoryColor(t.category) + "20",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14,
                    }}>
                      {catEmoji(t.category)}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>
                      {t.category}
                    </span>
                  </div>
                </td>

                {/* Type badge */}
                <td style={{ padding: "13px 16px" }}>
                  <span style={{
                    fontFamily: "var(--mono)", fontSize: 11, fontWeight: 600,
                    padding: "4px 10px", borderRadius: 99,
                    background: t.type === "income" ? "var(--green-bg)" : "var(--red-bg)",
                    color: t.type === "income" ? "var(--green)" : "var(--red)",
                    whiteSpace: "nowrap",
                  }}>
                    {t.type === "income" ? "↑ income" : "↓ expense"}
                  </span>
                </td>

                {/* Amount */}
                <td style={{ padding: "13px 16px" }}>
                  <span style={{
                    fontFamily: "var(--mono)", fontSize: 14, fontWeight: 700,
                    color: t.type === "income" ? "var(--green)" : "var(--red)",
                  }}>
                    {t.type === "income" ? "+" : "−"}{fmt(t.amount)}
                  </span>
                </td>

                {/* Admin delete */}
                {role === "admin" && (
                  <td style={{ padding: "13px 16px", textAlign: "right" }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => deleteTx(t.id)}
                      style={{
                        background: "var(--red-bg)", border: "none",
                        borderRadius: 8, padding: "5px 12px",
                        color: "var(--red)", fontFamily: "var(--mono)",
                        fontSize: 11, fontWeight: 600, cursor: "pointer",
                      }}
                    >
                      delete
                    </motion.button>
                  </td>
                )}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

function catEmoji(cat) {
  const map = { Food: "🍔", Salary: "💼", Shopping: "🛍", Freelance: "💻", Travel: "✈️", Rent: "🏠", Utilities: "⚡" };
  return map[cat] || "📁";
}