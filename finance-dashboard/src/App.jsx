import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { transactionsData } from "./data/mockData";
import SummaryCards       from "./components/SummaryCard";
import TransactionList    from "./components/TransactionList";
import Filters            from "./components/Filters";
import AddTransaction     from "./components/AddTransaction";
import Insights           from "./components/Insights";
import CategoryBars       from "./components/CategoryBars";
import Loader             from "./components/Loader";
import Sidebar            from "./components/Sidebar";
import FloatingBackground from "./components/Floatingbackground ";
import { BalanceTrendChart, SpendingDonutChart, MonthlyBarChart } from "./components/Charts";

/* ── localStorage helpers ─────────────────────── */
const LS_TX   = "finflow_transactions";
const LS_ROLE = "finflow_role";
const LS_DARK = "finflow_dark";

function lsGet(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

/* ── App ─────────────────────────────────────── */
export default function App() {
  const [loading, setLoading] = useState(true);

  const [dark,         setDarkRaw]  = useState(() => lsGet(LS_DARK, true));
  const [role,         setRoleRaw]  = useState(() => lsGet(LS_ROLE, "viewer"));
  const [transactions, setTxRaw]    = useState(() => lsGet(LS_TX,   transactionsData));

  const [search,      setSearch]      = useState("");
  const [filterType,  setFilterType]  = useState("all");
  const [sortOrder,   setSortOrder]   = useState("none");
  const [toast,       setToast]       = useState(null);
  const [activeNav,   setActiveNav]   = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function setDark(v)          { setDarkRaw(v);  lsSet(LS_DARK, v); }
  function setRole(v)          { setRoleRaw(v);  lsSet(LS_ROLE, v); }
  function setTransactions(fn) {
    setTxRaw((prev) => {
      const next = typeof fn === "function" ? fn(prev) : fn;
      lsSet(LS_TX, next);
      return next;
    });
  }

  function handleNavClick(id) {
    setActiveNav(id);
    setSidebarOpen(false);
  }

  useEffect(() => {
    document.documentElement.className = dark ? "" : "light";
  }, [dark]);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 2200); return () => clearTimeout(t); }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  let filtered = transactions.filter((t) => {
    const q = search.toLowerCase();
    return (
      (t.category.toLowerCase().includes(q) || t.date.includes(q)) &&
      (filterType === "all" || t.type === filterType)
    );
  });
  if (sortOrder === "high")          filtered.sort((a, b) => b.amount - a.amount);
  else if (sortOrder === "low")      filtered.sort((a, b) => a.amount - b.amount);
  else if (sortOrder === "date_new") filtered.sort((a, b) => b.date.localeCompare(a.date));
  else if (sortOrder === "date_old") filtered.sort((a, b) => a.date.localeCompare(b.date));

  const income  = transactions.filter((t) => t.type === "income") .reduce((a, t) => a + (Number(t.amount) || 0), 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((a, t) => a + (Number(t.amount) || 0), 0);
  const balance = income - expense;

  function deleteTx(id)  { setTransactions((p) => p.filter((t) => t.id !== id)); showToast("Transaction removed"); }
  function addTx(tx)     { setTransactions((p) => [tx, ...p]);                   showToast("Transaction added!"); }
  function resetData()   { setTransactions(transactionsData);                    showToast("Data reset to defaults"); }
  function showToast(msg){ setToast(msg); setTimeout(() => setToast(null), 2600); }

  function exportCSV() {
    const rows = ["Date,Category,Type,Amount", ...filtered.map((t) => `${t.date},${t.category},${t.type},${t.amount}`)].join("\n");
    const a = Object.assign(document.createElement("a"), {
      href: "data:text/csv;charset=utf-8," + encodeURIComponent(rows),
      download: "finflow.csv",
    });
    a.click();
    showToast(`Exported ${filtered.length} rows`);
  }

  function exportJSON() {
    const a = Object.assign(document.createElement("a"), {
      href: "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filtered, null, 2)),
      download: "finflow.json",
    });
    a.click();
    showToast(`Exported ${filtered.length} rows as JSON`);
  }

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.45, ease: [0.23, 1, 0.32, 1] },
  });

  return (
    <>
      <FloatingBackground dark={dark} />

      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      {!loading && (
        <div className="app-shell">
          {/* ── SIDEBAR ── */}
          <Sidebar
            role={role}
            setRole={(r) => { setRole(r); showToast("Switched to " + r); }}
            dark={dark}
            setDark={setDark}
            activeNav={activeNav}
            setActiveNav={handleNavClick}
            onExport={exportCSV}
            filtered={filtered}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* ── MAIN ── */}
          <div className="main-content">

            {/* TOPBAR */}
            <div className="topbar">
              <div className="topbar-left">
                {/* Hamburger — shown via CSS on mobile */}
                <button
                  className="mobile-menu-btn"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open menu"
                >
                  ☰
                </button>
                <div className="breadcrumb">
                  <span>Fin-Arc</span>
                  <span className="breadcrumb-sep">›</span>
                  <span className="breadcrumb-current">Dashboard</span>
                </div>
              </div>
              <div className="topbar-right">
                <button className="theme-toggle" onClick={() => setDark(!dark)}>
                  <span>{dark ? "🌑" : "☀️"}</span>
                  <span>{dark ? "Dark" : "Light"}</span>
                </button>
              </div>
            </div>

            {/* PAGE CONTENT */}
            <div className="page-content">

              <motion.div {...fadeUp(0)} className="page-header">
                <div className="page-title">Dashboard Overview</div>
                <div className="page-subtitle">Here is a summary of your overall financial activity</div>
              </motion.div>

              <motion.div {...fadeUp(0.05)}>
                <SummaryCards balance={balance} income={income} expense={expense} />
              </motion.div>

              <motion.div {...fadeUp(0.1)}>
                <Insights transactions={transactions} />
              </motion.div>

              <motion.div {...fadeUp(0.15)}>
                <div id="section-analytics" style={{ scrollMarginTop: 80 }}>
                  <div className="section-header">
                    <span className="section-title">Analytics</span>
                    <span className="section-badge">Apr 2026</span>
                  </div>
                  <div className="charts-grid" style={{ marginBottom: 14 }}>
                    <BalanceTrendChart  transactions={transactions} />
                    <SpendingDonutChart transactions={transactions} />
                  </div>
                  <MonthlyBarChart transactions={transactions} />
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.2)}>
                <CategoryBars transactions={transactions} />
              </motion.div>

              <motion.div {...fadeUp(0.21)}>
                <div id="section-recurring" style={{ scrollMarginTop: 80 }}>
                  <div className="section-header">
                    <span className="section-title">Recurring Transactions</span>
                  </div>
                  <div className="tx-card">
                    <div style={{ overflowX: "auto" }}>
                      {(() => {
                        const categoryCount = {};
                        transactions.forEach(t => {
                          categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
                        });
                        const recurringTxs = transactions.filter(t => categoryCount[t.category] >= 3);
                        return recurringTxs.length > 0 ? (
                          <TransactionList transactions={recurringTxs} role={role} deleteTx={deleteTx} />
                        ) : (
                          <div style={{ padding: 20, textAlign: "center", color: "var(--text3)", fontSize: 14 }}>
                            No recurring transactions found (3+ in same category)
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.22)}>
                <div className="tx-card" id="section-transactions">
                  <div className="tx-toolbar">
                    <div className="tx-title-wrap">
                      <span className="section-title">All Transactions</span>
                      <span className="tx-count">{filtered.length}</span>
                    </div>
                    <div className="tx-actions">
                      <AddTransaction addTx={addTx} role={role} />
                      {role === "admin" && (
                        <button className="btn btn-ghost" onClick={resetData} title="Reset to default data">
                          ↺ Reset
                        </button>
                      )}
                      <button className="btn btn-ghost" onClick={exportCSV}>⬇ CSV</button>
                      <button className="btn btn-ghost" onClick={exportJSON}>⬇ JSON</button>
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

              <div style={{
                textAlign: "center", fontFamily: "var(--mono)",
                fontSize: 11, color: "var(--text3)",
                paddingTop: 20, borderTop: "1px solid var(--border)",
                marginBottom: 8,
              }}>
                finflow · data persisted in localStorage · {new Date().getFullYear()}
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