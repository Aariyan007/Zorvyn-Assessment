export default function Filters({ search, setSearch, filterType, setFilterType, sortOrder, setSortOrder }) {
  return (
    <div className="filters-row">
      <div className="filter-input-wrap">
        <span className="filter-search-icon">⌕</span>
        <input
          className="filter-input"
          placeholder="Search category or date…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="all">All types</option>
        <option value="income">Income only</option>
        <option value="expense">Expense only</option>
      </select>
      <select className="filter-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="none">Sort: default</option>
        <option value="high">Amount: High → Low</option>
        <option value="low">Amount: Low → High</option>
        <option value="date_new">Date: Newest first</option>
        <option value="date_old">Date: Oldest first</option>
      </select>
    </div>
  );
}