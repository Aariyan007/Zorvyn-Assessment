import { useState } from "react";
import { transactionsData } from "./data/mockData";
import SummaryCard from "./components/SummaryCard";
import TransactionList from "./components/TransactionList";
import RoleSwitcher from "./components/RoleSwitcher";

function App() {
  const [transactions, setTransactions] = useState(transactionsData);
  const [role, setRole] = useState("viewer");

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

      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Finance Dashboard</h1>
        <RoleSwitcher role={role} setRole={setRole} />
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expenses" value={expense} />
      </div>

      {/* Transactions */}
      <TransactionList
        transactions={transactions}
        role={role}
        deleteTx={deleteTx}
      />

    </div>
  );
}

export default App;