import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const inputStyle = {
  width: "100%",
  background: "var(--bg3)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  padding: "10px 12px",
  color: "var(--text)",
  fontFamily: "var(--font)",
  fontSize: 13,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontFamily: "var(--mono)", fontSize: 10,
        color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1.2,
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

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

  const onFocus = (e) => { e.target.style.borderColor = "var(--orange)"; e.target.style.boxShadow = "0 0 0 3px var(--orange-dim)"; };
  const onBlur  = (e) => { e.target.style.borderColor = "var(--border)";  e.target.style.boxShadow = "none"; };

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => { setOpen((o) => !o); setErr(""); }}
        style={{
          background: open ? "var(--bg2)" : "var(--orange)",
          color: open ? "var(--orange)" : "#000",
          border: "1px solid var(--orange)",
          borderRadius: 10, padding: "9px 18px",
          fontFamily: "var(--font)", fontSize: 13, fontWeight: 600,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
        }}
      >
        <motion.span animate={{ rotate: open ? 45 : 0 }} style={{ display: "inline-block", fontSize: 16, lineHeight: 1 }}>+</motion.span>
        {open ? "Cancel" : "Add Transaction"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              marginTop: 12,
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: 20,
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 14,
                marginBottom: err ? 10 : 16,
              }}>
                <Field label="Amount (₹)">
                  <input style={inputStyle} type="number" min="1" placeholder="500"
                    value={amount} onChange={(e) => setAmount(e.target.value)}
                    onFocus={onFocus} onBlur={onBlur} />
                </Field>
                <Field label="Category">
                  <input style={inputStyle} placeholder="Food, Rent…"
                    value={category} onChange={(e) => setCategory(e.target.value)}
                    onFocus={onFocus} onBlur={onBlur} />
                </Field>
                <Field label="Type">
                  <select style={{ ...inputStyle, cursor: "pointer" }}
                    value={type} onChange={(e) => setType(e.target.value)}
                    onFocus={onFocus} onBlur={onBlur}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </Field>
                <Field label="Date">
                  <input style={inputStyle} type="date" value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onFocus={onFocus} onBlur={onBlur} />
                </Field>
              </div>

              {err && (
                <div style={{ fontSize: 12, color: "var(--red)", marginBottom: 12 }}>⚠ {err}</div>
              )}

              <motion.button
                whileHover={{ scale: 1.02, background: "#fb923c" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                style={{
                  background: "var(--orange)", color: "#000",
                  border: "none", borderRadius: 10,
                  padding: "10px 24px",
                  fontFamily: "var(--font)", fontSize: 13, fontWeight: 700,
                  cursor: "pointer",
                }}
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