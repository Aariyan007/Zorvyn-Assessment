import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { transactionsData } from "./data/mockData";
import SummaryCards    from "./components/SummaryCard";
import TransactionList from "./components/TransactionList";
import Filters         from "./components/Filters";
import AddTransaction  from "./components/AddTransaction";
import Insights        from "./components/Insights";
import CategoryBars    from "./components/CategoryBars";
import Loader          from "./components/Loader";
import Sidebar         from "./components/Sidebar";
import { BalanceTrendChart, SpendingDonutChart, MonthlyBarChart } from "./components/Charts";

export default function App() {
  const [loading, setLoading]           = useState(true);
  const [dark, setDark]                 = useState(true);
  const [transactions, setTransactions] = useState(transactionsData);
  const [role, setRole]                 = useState("viewer");
  const [search, setSearch]             = useState("");
  const [filterType, setFilterType]     = useState("all");
  const [sortOrder, setSortOrder]       = useState("none");
  const [toast, setToast]               = useState(null);
  const [activeNav, setActiveNav]       = useState("dashboard");

  useEffect(() => {
    document.documentElement.className = dark ? "" : "light";
  }, [dark]);

  useEffect(() => { setTimeout(() => setLoading(false), 2200); }, []);

  // filtered list
  let filtered = transactions.filter((t) => {
    const q = search.toLowerCase();
    return (t.category.toLowerCase().includes(q) || t.date.includes(q)) &&
           (filterType === "all" || t.type === filterType);
  });
  if (sortOrder === "high")      filtered.sort((a, b) => b.amount - a.amount);
  else if (sortOrder === "low")       filtered.sort((a, b) => a.amount - b.amount);
  else if (sortOrder === "date_new")  filtered.sort((a, b) => b.date.localeCompare(a.date));
  else if (sortOrder === "date_old")  filtered.sort((a, b) => a.date.localeCompare(b.date));

  const income  = transactions.filter((t) => t.type === "income").reduce((a, t)  => a + t.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0);
  const balance = income - expense;

  function deleteTx(id) { setTransactions((p) => p.filter((t) => t.id !== id)); showToast("Transaction removed"); }
  function addTx(tx)    { setTransactions((p) => [tx, ...p]); showToast("Transaction added!"); }
  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 2600); }
  function exportCSV() {
    const csv = ["Date,Category,Type,Amount", ...filtered.map((t) => `${t.date},${t.category},${t.type},${t.amount}`)].join("\n");
    const a = Object.assign(document.createElement("a"), { href: "data:text/csv;charset=utf-8," + encodeURIComponent(csv), download: "finflow.csv" });
    a.click();
    showToast(`Exported ${filtered.length} rows`);
  }

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.45, ease: [0.23, 1, 0.32, 1] },
  });

  return (
    <>
      <AnimatePresence>{loading && <Loader dark={dark} />}</AnimatePresence>

      {!loading && (
        <div className="app-shell">
          {/* SIDEBAR */}
          <Sidebar
            role={role}
            setRole={(r) => { setRole(r); showToast("Switched to " + r); }}
            dark={dark}
            setDark={setDark}
            activeNav={activeNav}
            setActiveNav={setActiveNav}
          />

          {/* MAIN */}
          <div className="main-content">
            {/* TOPBAR */}
            <div className="topbar">
              <div className="topbar-left">
                <div className="breadcrumb">
                  <span>FinFlow</span>
                  <span className="breadcrumb-sep">›</span>
                  <span className="breadcrumb-current">Dashboard</span>
                </div>
              </div>
              <div className="topbar-right">
                <button
                  className="theme-toggle"
                  onClick={() => setDark((d) => !d)}
                >
                  <span>{dark ? "🌑" : "☀️"}</span>
                  <span>{dark ? "Dark" : "Light"}</span>
                </button>
              </div>
            </div>

            {/* PAGE */}
            <div className="page-content">
              <motion.div {...fadeUp(0)} className="page-header">
                <div className="page-title">Dashboard Overview</div>
                <div className="page-subtitle">Here is a summary of your overall financial activity</div>
              </motion.div>

              {/* SUMMARY CARDS */}
              <motion.div {...fadeUp(0.05)}>
                <SummaryCards balance={balance} income={income} expense={expense} />
              </motion.div>

              {/* INSIGHTS */}
              <motion.div {...fadeUp(0.1)}>
                <Insights transactions={transactions} />
              </motion.div>

              {/* CHARTS */}
              <motion.div {...fadeUp(0.15)}>
                <div className="section-header">
                  <span className="section-title">Analytics</span>
                  <span className="section-badge">Apr 2026</span>
                </div>
                <div className="charts-grid" style={{ marginBottom: 14 }}>
                  <BalanceTrendChart  transactions={transactions} />
                  <SpendingDonutChart transactions={transactions} />
                </div>
                <MonthlyBarChart transactions={transactions} />
              </motion.div>

              {/* CATEGORY BARS */}
              <motion.div {...fadeUp(0.2)}>
                <CategoryBars transactions={transactions} />
              </motion.div>

              {/* TRANSACTIONS */}
              <motion.div {...fadeUp(0.22)}>
                <div className="tx-card">
                  <div className="tx-toolbar">
                    <div className="tx-title-wrap">
                      <span className="section-title">All Transactions</span>
                      <span className="tx-count">{filtered.length}</span>
                    </div>
                    <div className="tx-actions">
                      <AddTransaction addTx={addTx} role={role} />
                      <button className="btn btn-ghost" onClick={exportCSV}>
                        ⬇ Export CSV
                      </button>
                    </div>
                  </div>

                  <Filters
                    search={search}         setSearch={setSearch}
                    filterType={filterType} setFilterType={setFilterType}
                    sortOrder={sortOrder}   setSortOrder={setSortOrder}
                  />

                  <div style={{ overflowX: "auto" }}>
                    <TransactionList transactions={filtered} role={role} deleteTx={deleteTx} />
                  </div>
                </div>
              </motion.div>

              {/* FOOTER */}
              <div style={{
                textAlign: "center",
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--text3)",
                paddingTop: 20,
                borderTop: "1px solid var(--border)",
              }}>
                finflow · built for evaluation · {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            className="toast"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
          >
            <span className="toast-dot">✦</span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}