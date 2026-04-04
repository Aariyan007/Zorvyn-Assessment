import { motion } from "framer-motion";

export default function RoleSwitcher({ role, setRole }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "var(--bg2)",
        border: "1px solid var(--border)",
        borderRadius: 99, padding: "7px 16px 7px 12px",
        boxShadow: "var(--shadow)",
      }}
    >
      <motion.div
        animate={{ opacity: [1, 0.25, 1] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        style={{
          width: 7, height: 7, borderRadius: "50%",
          background: role === "admin" ? "var(--orange)" : "var(--green)",
          flexShrink: 0,
        }}
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{
          background: "transparent", border: "none",
          color: "var(--text)", fontFamily: "var(--font)",
          fontSize: 13, fontWeight: 600, cursor: "pointer",
          outline: "none",
        }}
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </motion.div>
  );
}