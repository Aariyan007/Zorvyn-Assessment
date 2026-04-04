import { motion } from "framer-motion";

const base = {
  background: "var(--bg2)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  padding: "9px 14px",
  color: "var(--text)",
  fontFamily: "var(--font)",
  fontSize: 13,
  outline: "none",
  boxShadow: "var(--shadow)",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const focus = { borderColor: "var(--orange)", boxShadow: "0 0 0 3px var(--orange-dim)" };
const blur  = { borderColor: "var(--border)",  boxShadow: "var(--shadow)" };

export default function Filters({ search, setSearch, filterType, setFilterType, sortOrder, setSortOrder }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}
    >
      <div style={{ position: "relative", flex: "1 1 180px", minWidth: 150 }}>
        <span style={{
          position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
          color: "var(--text3)", fontSize: 14, pointerEvents: "none",
        }}>🔍</span>
        <input
          style={{ ...base, width: "100%", paddingLeft: 34 }}
          placeholder="Search category or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={(e) => Object.assign(e.target.style, focus)}
          onBlur={(e)  => Object.assign(e.target.style, blur)}
        />
      </div>

      <select
        style={{ ...base, flex: "0 0 auto", cursor: "pointer" }}
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="all">All types</option>
        <option value="income">Income only</option>
        <option value="expense">Expense only</option>
      </select>

      <select
        style={{ ...base, flex: "0 0 auto", cursor: "pointer" }}
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="none">Sort: default</option>
        <option value="high">Amount: high → low</option>
        <option value="low">Amount: low → high</option>
        <option value="date_new">Date: newest first</option>
        <option value="date_old">Date: oldest first</option>
      </select>
    </motion.div>
  );
}