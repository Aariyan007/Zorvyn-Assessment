function Filters({ search, setSearch, filterType, setFilterType, sortOrder, setSortOrder }) {
  return (
    <div className="flex gap-4 mb-4">

      <input
        className="border p-2 rounded"
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-2 rounded"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* NEW: Sort */}
      <select
        className="border p-2 rounded"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="none">No Sort</option>
        <option value="low">Amount: Low → High</option>
        <option value="high">Amount: High → Low</option>
      </select>

    </div>
  );
}

export default Filters;