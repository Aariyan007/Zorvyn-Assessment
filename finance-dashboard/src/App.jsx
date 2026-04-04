import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { transactionsData } from "./data/mockData";
import SummaryCard     from "./components/SummaryCard";
import TransactionList from "./components/TransactionList";
import RoleSwitcher    from "./components/RoleSwitcher";
import Filters         from "./components/Filters";
import AddTransaction  from "./components/AddTransaction";
import Insights        from "./components/Insights";
import CategoryBars    from "./components/CategoryBars";
import Loader          from "./components/Loader";
import FloatingBackground from "./components/Floatingbackground ";
import { BalanceTrendChart, SpendingDonutChart, MonthlyBarChart } from "./components/Charts";

/* ── small shared helpers ────────────────────── */
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "var(--bg2)", border: "1px solid var(--border)",
      borderRadius: 16, padding: "24px",
      boxShadow: "var(--shadow)", ...style,
    }}>
      {children}
    </div>
  );
}

function SectionHeader({ children }) {
  return (
    <div style={{
      fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)",
      textTransform: "uppercase", letterSpacing: 2, marginBottom: 14,
    }}>
      {children}
    </div>
  );
}

/* ── App ─────────────────────────────────────── */
export default function App() {
  const [loading, setLoading]           = useState(true);
  const [dark, setDark]                 = useState(true);
  const [transactions, setTransactions] = useState(transactionsData);
  const [role, setRole]                 = useState("viewer");
  const [search, setSearch]             = useState("");
  const [filterType, setFilterType]     = useState("all");
  const [sortOrder, setSortOrder]       = useState("none");
  const [toast, setToast]               = useState(null);

  /* apply dark class to <html> */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => { setTimeout(() => setLoading(false), 2000); }, []);

  /* ── filtered list ── */
  let filtered = transactions.filter((t) => {
    const q = search.toLowerCase();
    return (t.category.toLowerCase().includes(q) || t.date.includes(q)) &&
           (filterType === "all" || t.type === filterType);
  });
  if (sortOrder === "high")      filtered.sort((a, b) => b.amount - a.amount);
  else if (sortOrder === "low")       filtered.sort((a, b) => a.amount - b.amount);
  else if (sortOrder === "date_new")  filtered.sort((a, b) => b.date.localeCompare(a.date));
  else if (sortOrder === "date_old")  filtered.sort((a, b) => a.date.localeCompare(b.date));

  /* ── summary numbers ── */
  const income  = transactions.filter((t) => t.type === "income").reduce((a, t)  => a + t.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0);
  const balance = income - expense;

  /* ── actions ── */
  function deleteTx(id) { setTransactions((p) => p.filter((t) => t.id !== id)); showToast("Transaction removed"); }
  function addTx(tx)    { setTransactions((p) => [tx, ...p]); showToast("Transaction added!"); }
  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 2600); }
  function exportCSV() {
    const csv = ["Date,Category,Type,Amount", ...filtered.map((t) => `${t.date},${t.category},${t.type},${t.amount}`)].join("\n");
    const a = Object.assign(document.createElement("a"), { href: "data:text/csv;charset=utf-8," + encodeURIComponent(csv), download: "finflow.csv" });
    a.click();
    showToast(`Exported ${filtered.length} rows`);
  }

  return (
    <>
      {/* animated background orbs */}
      <FloatingBackground dark={dark} />

      {/* loader */}
      <AnimatePresence>{loading && <Loader dark={dark} />}</AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: 1320, margin: "0 auto", padding: "28px 24px 48px" }}
        >

          {/* ══ HEADER ══════════════════════════════════════════ */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 36, flexWrap: "wrap", gap: 16,
            }}
          >
            {/* logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "var(--orange)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 800, color: "#000",
                  cursor: "default", boxShadow: "0 4px 16px rgba(249,115,22,0.35)",
                }}
              >
                ₹
              </motion.div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.15 }}>FinFlow</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 2 }}>
                  Finance Dashboard
                </div>
              </div>
            </div>

            {/* right controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* dark mode toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setDark((d) => !d)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "var(--bg2)", border: "1px solid var(--border)",
                  borderRadius: 99, padding: "8px 16px",
                  fontFamily: "var(--mono)", fontSize: 12,
                  color: "var(--text2)", cursor: "pointer",
                  boxShadow: "var(--shadow)",
                }}
              >
                <motion.span
                  animate={{ rotate: dark ? 0 : 180 }}
                  transition={{ duration: 0.4 }}
                  style={{ display: "inline-block" }}
                >
                  {dark ? "🌑" : "☀️"}
                </motion.span>
                {dark ? "dark" : "light"}
              </motion.button>

              <RoleSwitcher role={role} setRole={(r) => { setRole(r); showToast("Switched to " + r); }} />
            </div>
          </motion.header>

          {/* ══ SUMMARY CARDS ═══════════════════════════════════ */}
          <SectionHeader>📋 Overview</SectionHeader>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16, marginBottom: 32,
          }}
            className="summary-grid"
          >
            <SummaryCard title="Balance"  value={balance} index={0} />
            <SummaryCard title="Income"   value={income}  index={1} />
            <SummaryCard title="Expenses" value={expense} index={2} />
          </div>

          {/* ══ INSIGHTS ════════════════════════════════════════ */}
          <Insights transactions={transactions} />

          {/* ══ CHARTS — 2 col then 1 full ══════════════════════ */}
          <SectionHeader>📊 Analytics</SectionHeader>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 28 }}>
            <BalanceTrendChart  transactions={transactions} />
            <SpendingDonutChart transactions={transactions} />
          </div>
          <div style={{ marginBottom: 28 }}>
            <MonthlyBarChart transactions={transactions} />
          </div>

          {/* ══ CATEGORY BARS ═══════════════════════════════════ */}
          <CategoryBars transactions={transactions} />

          {/* ══ TRANSACTIONS ════════════════════════════════════ */}
          <SectionHeader>💳 Transactions</SectionHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            style={{
              background: "var(--bg2)", border: "1px solid var(--border)",
              borderRadius: 16, padding: "24px",
              boxShadow: "var(--shadow)", marginBottom: 32,
            }}
          >
            {/* toolbar row */}
            <div style={{
              display: "flex", alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap", gap: 12, marginBottom: 20,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>All Transactions</span>
                <span style={{
                  fontFamily: "var(--mono)", fontSize: 11,
                  background: "var(--orange-dim)", color: "var(--orange)",
                  borderRadius: 99, padding: "2px 10px",
                }}>
                  {filtered.length}
                </span>
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <AddTransaction addTx={addTx} role={role} />
                <motion.button
                  whileHover={{ scale: 1.03, borderColor: "var(--orange)", color: "var(--orange)" }}
                  whileTap={{ scale: 0.96 }}
                  onClick={exportCSV}
                  style={{
                    background: "transparent", border: "1px solid var(--border)",
                    borderRadius: 10, padding: "9px 16px",
                    color: "var(--text3)", fontFamily: "var(--font)",
                    fontSize: 12, fontWeight: 500, cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  ⬇ Export CSV
                </motion.button>
              </div>
            </div>

            <Filters
              search={search}       setSearch={setSearch}
              filterType={filterType} setFilterType={setFilterType}
              sortOrder={sortOrder}   setSortOrder={setSortOrder}
            />

            <TransactionList transactions={filtered} role={role} deleteTx={deleteTx} />
          </motion.div>

          {/* ══ FOOTER ══════════════════════════════════════════ */}
          <div style={{
            textAlign: "center", fontFamily: "var(--mono)", fontSize: 11,
            color: "var(--text3)", paddingTop: 20,
            borderTop: "1px solid var(--border)",
          }}>
            finflow · built for evaluation · {new Date().getFullYear()}
          </div>
        </motion.div>
      )}

      {/* ══ TOAST ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ y: 64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 64, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
            style={{
              position: "fixed", bottom: 28, right: 28,
              background: "var(--bg2)", border: "1px solid var(--orange)",
              borderRadius: 12, padding: "12px 22px",
              fontFamily: "var(--font)", fontSize: 13, fontWeight: 500,
              color: "var(--text)", zIndex: 9998, pointerEvents: "none",
              boxShadow: "0 8px 32px rgba(249,115,22,0.2)",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            <span style={{ color: "var(--orange)" }}>✦</span> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* responsive grid fix */}
      <style>{`
        @media (max-width: 640px) {
          .summary-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .summary-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}