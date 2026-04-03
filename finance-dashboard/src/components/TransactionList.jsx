
function TransactionList({ transactions, role, deleteTx }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>

      {transactions.map((t) => (
        <div key={t.id} className="flex justify-between mb-2">
          <span>
            {t.date} | {t.category} | ₹{t.amount}
          </span>

          {role === "admin" && (
            <button
              className="text-red-500"
              onClick={() => deleteTx(t.id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default TransactionList;