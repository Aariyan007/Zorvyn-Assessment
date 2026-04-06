import { motion } from "framer-motion";

const NAV_ITEMS = [
  { id: "dashboard",    label: "Dashboard",    icon: "⊞" },
  { id: "analytics",   label: "Analytics",    icon: "◈" },
  { id: "transactions",label: "Transactions",  icon: "⇄" },
  { id: "insights",    label: "Insights",      icon: "★" },
];

const FEATURE_ITEMS = [
  { id: "recurring", label: "Recurring", icon: "↻", badge: "3" },
  { id: "export",    label: "Export",    icon: "↗" },
  { id: "settings",  label: "Settings",  icon: "◎" },
];

const SECTION_MAP = {
  dashboard:    "section-dashboard",
  analytics:    "section-analytics",
  transactions: "section-transactions",
  insights:     "section-insights",
  recurring:    "section-recurring",
};

export default function Sidebar({ role, setRole, activeNav, setActiveNav, onExport, isOpen, onClose }) {
  function handleNav(id) {
    setActiveNav(id);
    onClose();

    if (id === "export" && onExport) {
      onExport();
      return;
    }

    const targetId = SECTION_MAP[id];
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 320);
    }
  }

  return (
    <>
      {/* Dark backdrop — click to close */}
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/*
        Use a plain <aside> — NOT motion.aside with animate={{ x }} —
        so that CSS transform: translateX(-100%) / translateX(0) via
        .sidebar and .sidebar.active works without being overridden.
      */}
      <aside className={`sidebar ${isOpen ? "active" : ""}`}>

        {/* ✕ CLOSE — only visible on mobile via CSS */}
        <button
          type="button"
          onClick={onClose}
          className="sidebar-close-btn"
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* LOGO */}
        <div className="sidebar-logo">
          <div className="logo-mark">F</div>
          <div>
            <div className="logo-text">Fin-Arc</div>
            <div className="logo-sub">Finance Dashboard</div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="sidebar-search">
          <span className="sidebar-search-icon">⌕</span>
          <input placeholder="Search…" readOnly />
          <span style={{
            marginLeft: "auto", fontFamily: "var(--mono)",
            fontSize: 10, color: "var(--text4)",
            background: "var(--bg4)", padding: "2px 5px", borderRadius: 4,
          }}>
            ⌘K
          </span>
        </div>

        {/* MAIN NAV */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">Main</div>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "active" : ""}`}
              onClick={() => handleNav(item.id)}
            >
              <span className="nav-icon" style={{ fontSize: 15 }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}

          <div className="nav-section-label">Features</div>
          {FEATURE_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "active" : ""}`}
              onClick={() => handleNav(item.id)}
            >
              <span className="nav-icon" style={{ fontSize: 15 }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </div>
          ))}
        </nav>

        {/* ROLE SWITCHER */}
        <div className="sidebar-bottom">
          <div className="role-card">
            <div className="role-card-label">Current Role</div>
            <div className="role-select-wrap">
              <motion.div
                className="role-dot"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ background: role === "admin" ? "var(--orange)" : "var(--green)" }}
              />
              <select
                className="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div style={{
              marginTop: 10,
              fontFamily: "var(--mono)", fontSize: 10,
              color: "var(--text3)", lineHeight: 1.5,
            }}>
              {role === "admin"
                ? "Admin: can add & delete transactions"
                : "Viewer: read-only access"}
            </div>
          </div>

          <div style={{
            marginTop: 10,
            display: "flex", alignItems: "center", gap: 6,
            fontFamily: "var(--mono)", fontSize: 9,
            color: "var(--text4)", padding: "0 4px",
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "var(--green)", display: "inline-block",
            }} />
            Data persisted locally
          </div>
        </div>
      </aside>
    </>
  );
}