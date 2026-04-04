import { motion } from "framer-motion";

const NAV_ITEMS = [
  { id: "dashboard",    label: "Dashboard",    icon: "⊞", section: null },
  { id: "analytics",   label: "Analytics",    icon: "◈", badge: null,   section: null },
  { id: "transactions",label: "Transactions",  icon: "⇄", badge: null,  section: null },
  { id: "insights",    label: "Insights",      icon: "⚡", section: null },
];

const FEATURE_ITEMS = [
  { id: "recurring",    label: "Recurring",    icon: "↻", badge: "3" },
  { id: "export",       label: "Export",       icon: "↗", badge: null },
  { id: "settings",     label: "Settings",     icon: "◎", badge: null },
];

export default function Sidebar({ role, setRole, activeNav, setActiveNav }) {
  function scrollTo(id) {
    setActiveNav(id);
    const el = document.getElementById("section-" + id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* LOGO */}
      <div className="sidebar-logo">
        <div className="logo-mark">F</div>
        <div>
          <div className="logo-text">FinFlow</div>
          <div className="logo-sub">Finance Dashboard</div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="sidebar-search">
        <span className="sidebar-search-icon">⌕</span>
        <input placeholder="Search…" readOnly />
        <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: 10, color: "var(--text4)", background: "var(--bg4)", padding: "2px 5px", borderRadius: 4 }}>⌘K</span>
      </div>

      {/* NAV */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeNav === item.id ? "active" : ""}`}
            onClick={() => scrollTo(item.id)}
          >
            <span className="nav-icon" style={{ fontSize: 15 }}>{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </div>
        ))}

        <div className="nav-section-label">Features</div>

        {FEATURE_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeNav === item.id ? "active" : ""}`}
            onClick={() => setActiveNav(item.id)}
          >
            <span className="nav-icon" style={{ fontSize: 15 }}>{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </div>
        ))}
      </nav>

      {/* BOTTOM: ROLE SWITCHER */}
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
        </div>
      </div>
    </motion.aside>
  );
}