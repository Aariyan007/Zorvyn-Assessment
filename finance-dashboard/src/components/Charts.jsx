import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Chart, registerables } from "chart.js";
import { getCategoryColor } from "../data/mockData";

Chart.register(...registerables);

function Card({ children, delay = 0, title, badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      style={{
        background: "var(--bg2)", border: "1px solid var(--border)",
        borderRadius: 16, padding: "22px 24px",
        boxShadow: "var(--shadow)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{title}</span>
        {badge && (
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, background: "var(--bg3)", color: "var(--text3)", borderRadius: 99, padding: "4px 12px" }}>
            {badge}
          </span>
        )}
      </div>
      {children}
    </motion.div>
  );
}

const tooltip = { backgroundColor: "var(--bg3)", borderColor: "var(--border2)", borderWidth: 1, titleColor: "var(--text)", bodyColor: "var(--text2)", cornerRadius: 8, padding: 10 };

function scale(axis) {
  return {
    ticks: { color: "#9a9a9a", font: { size: 11, family: "JetBrains Mono" }, ...(axis === "y" ? { callback: (v) => "₹" + v } : {}) },
    grid:  { color: "rgba(128,128,128,0.08)" },
    border: { display: false },
  };
}

/* ── Balance Trend ─────────────────────────────── */
export function BalanceTrendChart({ transactions }) {
  const ref   = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    const dayMap = {};
    transactions.filter((t) => t.date.startsWith("2026-04")).forEach((t) => {
      if (!dayMap[t.date]) dayMap[t.date] = { income: 0, expense: 0 };
      dayMap[t.date][t.type] += t.amount;
    });
    const days = Object.keys(dayMap).sort();
    let running = 0;
    const data  = days.map((d) => { running += dayMap[d].income - dayMap[d].expense; return running; });

    if (chart.current) chart.current.destroy();
    chart.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: days.map((d) => d.slice(8) + " Apr"),
        datasets: [{
          label: "Balance", data,
          borderColor: "#f97316", backgroundColor: "rgba(249,115,22,0.07)",
          tension: 0.4, fill: true,
          pointBackgroundColor: "#f97316", pointRadius: 4, pointHoverRadius: 6,
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { ...tooltip, callbacks: { label: (c) => " ₹" + c.parsed.y.toLocaleString("en-IN") } } },
        scales: { x: scale("x"), y: scale("y") },
      },
    });
    return () => chart.current?.destroy();
  }, [transactions]);

  return (
    <Card title="Balance Trend" badge="Apr 2026" delay={0.1}>
      <div style={{ position: "relative", height: 200 }}><canvas ref={ref} /></div>
    </Card>
  );
}

/* ── Spending Donut ────────────────────────────── */
export function SpendingDonutChart({ transactions }) {
  const ref   = useRef(null);
  const chart = useRef(null);

  const expenses = transactions.filter((t) => t.type === "expense");
  const catMap   = {};
  expenses.forEach((t) => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
  const entries  = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const total    = entries.reduce((s, [, v]) => s + v, 0);

  useEffect(() => {
    if (chart.current) chart.current.destroy();
    if (!entries.length) return;
    chart.current = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: entries.map(([k]) => k),
        datasets: [{ data: entries.map(([, v]) => v), backgroundColor: entries.map(([k]) => getCategoryColor(k)), borderWidth: 0, hoverOffset: 4 }],
      },
      options: {
        responsive: false, cutout: "70%",
        plugins: { legend: { display: false }, tooltip: { ...tooltip, callbacks: { label: (c) => " ₹" + c.parsed.toLocaleString("en-IN") } } },
      },
    });
    return () => chart.current?.destroy();
  }, [transactions]);

  return (
    <Card title="Spending Breakdown" badge="by category" delay={0.15}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ flexShrink: 0, width: 160, height: 160, position: "relative" }}>
          <canvas ref={ref} width={160} height={160} />
          {total > 0 && (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)" }}>total</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>₹{total.toLocaleString("en-IN")}</div>
            </div>
          )}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          {entries.map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: getCategoryColor(k), flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "var(--text2)", flex: 1, fontWeight: 500 }}>{k}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)" }}>
                {total ? Math.round((v / total) * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ── Monthly Bar ───────────────────────────────── */
export function MonthlyBarChart({ transactions }) {
  const ref   = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    const months  = ["2026-03", "2026-04"];
    const labels  = ["Mar 2026", "Apr 2026"];
    const income  = months.map((m) => transactions.filter((t) => t.type === "income"  && t.date.startsWith(m)).reduce((a, t) => a + t.amount, 0));
    const expense = months.map((m) => transactions.filter((t) => t.type === "expense" && t.date.startsWith(m)).reduce((a, t) => a + t.amount, 0));

    if (chart.current) chart.current.destroy();
    chart.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          { label: "Income",  data: income,  backgroundColor: "rgba(22,163,74,0.75)",  borderRadius: 6, borderSkipped: false },
          { label: "Expense", data: expense, backgroundColor: "rgba(220,38,38,0.65)", borderRadius: 6, borderSkipped: false },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { ...tooltip, callbacks: { label: (c) => " " + c.dataset.label + ": ₹" + c.parsed.y.toLocaleString("en-IN") } },
        },
        scales: { x: scale("x"), y: scale("y") },
      },
    });
    return () => chart.current?.destroy();
  }, [transactions]);

  return (
    <Card title="Income vs Expense" badge="monthly" delay={0.2}>
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        {[["Income", "var(--green)"], ["Expense", "var(--red)"]].map(([l, c]) => (
          <span key={l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text3)" }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: c, display: "inline-block" }} /> {l}
          </span>
        ))}
      </div>
      <div style={{ position: "relative", height: 160 }}><canvas ref={ref} /></div>
    </Card>
  );
}