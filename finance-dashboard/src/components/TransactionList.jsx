import { motion, AnimatePresence } from "framer-motion";
import { getCategoryColor } from "../data/mockData";
import { CategoryIcon, IconArrowUp, IconArrowDown, IconEmpty } from "./Icons";

function fmt(n) { return "₹" + Math.abs(n).toLocaleString("en-IN"); }

export default function TransactionList({ transactions, role, deleteTx }) {
  if (!transactions.length) {
    return (
      <div className="empty-state">
        <span style={{ display: "flex", justifyContent: "center", marginBottom: 12, color: "var(--text3)" }}>
          <IconEmpty size={40} color="currentColor" />
        </span>
        <div className="empty-title">No transactions found</div>
        <div className="empty-sub">Try adjusting your filters</div>
      </div>
    );
  }

  return (
    <table className="tx-table" id="section-transactions">
      <thead>
        <tr>
          {["Date", "Category", "Type", "Amount", ...(role === "admin" ? [""] : [])].map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <AnimatePresence initial={false}>
          {transactions.map((t, i) => (
            <motion.tr
              key={t.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.18 } }}
              transition={{ delay: i * 0.025, duration: 0.22 }}
            >
              <td>
                <span className="tx-date">{t.date}</span>
              </td>

              <td>
                <div className="tx-cat-wrap">
                  <CategoryIcon
                    category={t.category}
                    size={14}
                    bgColor={getCategoryColor(t.category) + "18"}
                  />
                  <span className="tx-cat-name">{t.category}</span>
                </div>
              </td>

              <td>
                <span className={`type-badge ${t.type === "income" ? "type-income" : "type-expense"}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  {t.type === "income"
                    ? <><IconArrowUp size={10} color="var(--green)" /> income</>
                    : <><IconArrowDown size={10} color="var(--red)" /> expense</>}
                </span>
              </td>

              <td>
                {/* gradient text for income, plain red for expense */}
                {t.type === "income" ? (
                  <span className="tx-amount" style={{
                    background: "var(--grad-text)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    +{fmt(t.amount)}
                  </span>
                ) : (
                  <span className="tx-amount" style={{ color: "var(--red)" }}>
                    −{fmt(t.amount)}
                  </span>
                )}
              </td>

              {role === "admin" && (
                <td style={{ textAlign: "right" }}>
                  <motion.button
                    className="tx-del-btn"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteTx(t.id)}
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
  );
}