import { useState } from "react";
import { transactionsData } from "./data/mockData";
import SummaryCard from "./components/SummaryCard";
import TransactionList from "./components/TransactionList";
import RoleSwitcher from "./components/RoleSwitcher";
import Filters from "./components/Filters";

function App() {
  const [transactions, setTransactions] = useState(transactionsData);
  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  let filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      filterType === "all" || t.type === filterType;

    return matchesSearch && matchesType;
  });

  filteredTransactions = [...filteredTransactions];

  if (sortOrder === "low") {
    filteredTransactions.sort((a, b) => a.amount - b.amount);
  } else if (sortOrder === "high") {
    filteredTransactions.sort((a, b) => b.amount - a.amount);
  }

  // SUMMARY
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  function deleteTx(id) {
    setTransactions(transactions.filter(t => t.id !== id));
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Finance Dashboard</h1>
        <RoleSwitcher role={role} setRole={setRole} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expenses" value={expense} />
      </div>

      <Filters
        search={search}
        setSearch={setSearch}
        filterType={filterType}
        setFilterType={setFilterType}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <TransactionList
        transactions={filteredTransactions}
        role={role}
        deleteTx={deleteTx}
      />

    </div>
  );
}

export default App;