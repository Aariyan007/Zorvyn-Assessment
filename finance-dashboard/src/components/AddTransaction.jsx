import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddTransaction({ addTx, role }) {
  const [open, setOpen]         = useState(false);
  const [amount, setAmount]     = useState("");
  const [category, setCategory] = useState("");
  const [type, setType]         = useState("expense");
  const [date, setDate]         = useState(new Date().toISOString().split("T")[0]);
  const [err, setErr]           = useState("");

  if (role !== "admin") return null;

  function handleSubmit() {
    if (!amount || Number(amount) <= 0) { setErr("Enter a valid amount"); return; }
    if (!category.trim())               { setErr("Category is required"); return; }
    setErr("");
    addTx({ id: Date.now(), date, amount: Number(amount), category: category.trim(), type });
    setAmount(""); setCategory(""); setType("expense");
    setDate(new Date().toISOString().split("T")[0]);
    setOpen(false);
  }

  return (
    <div>
      <motion.button
        className={`btn ${open ? "btn-ghost" : "btn-primary"}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => { setOpen((o) => !o); setErr(""); }}
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          style={{ display: "inline-block", fontSize: 16, lineHeight: 1 }}
        >
          +
        </motion.span>
        {open ? "Cancel" : "Add Transaction"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden", position: "absolute", right: 0, minWidth: 400, zIndex: 20 }}
          >
            <div className="add-form" style={{ marginTop: 8 }}>
              <div className="add-form-grid">
                <div className="form-field">
                  <label className="form-label">Amount (₹)</label>
                  <input className="form-input" type="number" min="1" placeholder="500"
                    value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Category</label>
                  <input className="form-input" placeholder="Food, Rent…"
                    value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="form-label">Type</label>
                  <select className="form-input" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Date</label>
                  <input className="form-input" type="date" value={date}
                    onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>

              {err && <div className="form-error">⚠ {err}</div>}

              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
              >
                Add Transaction
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}