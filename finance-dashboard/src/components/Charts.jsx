import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { getCategoryColor } from "../data/mockData";

Chart.register(...registerables);

const tooltip = {
  backgroundColor: "var(--bg3)",
  borderColor: "var(--border2)",
  borderWidth: 1,
  titleColor: "var(--text)",
  bodyColor: "var(--text2)",
  cornerRadius: 10,
  padding: 10,
};

function scale(axis) {
  return {
    ticks: {
      color: "var(--text3)",
      font: { size: 11, family: "DM Mono" },
      ...(axis === "y" ? { callback: (v) => "₹" + v } : {}),
    },
    grid: { color: "rgba(128,128,128,0.06)" },
    border: { display: false },
  };
}

/* ── Balance Trend ─── */
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
          borderColor: "#f97316",
          backgroundColor: "rgba(249,115,22,0.06)",
          tension: 0.45, fill: true,
          pointBackgroundColor: "#f97316",
          pointRadius: 5, pointHoverRadius: 7,
          borderWidth: 2.5,
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
    <div className="chart-card" id="section-analytics">
      <div className="chart-title-row">
        <span className="chart-title">Balance Trend</span>
        <span className="section-badge">Apr 2026</span>
      </div>
      <div style={{ position: "relative", height: 210 }}><canvas ref={ref} /></div>
    </div>
  );
}

/* ── Spending Donut ─── */
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
        datasets: [{ data: entries.map(([, v]) => v), backgroundColor: entries.map(([k]) => getCategoryColor(k)), borderWidth: 0, hoverOffset: 6 }],
      },
      options: {
        responsive: false, cutout: "72%",
        plugins: { legend: { display: false }, tooltip: { ...tooltip, callbacks: { label: (c) => " ₹" + c.parsed.toLocaleString("en-IN") } } },
      },
    });
    return () => chart.current?.destroy();
  }, [transactions]);

  return (
    <div className="chart-card">
      <div className="chart-title-row">
        <span className="chart-title">Spending Breakdown</span>
        <span className="section-badge">by category</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ flexShrink: 0, width: 140, height: 140, position: "relative" }}>
          <canvas ref={ref} width={140} height={140} />
          {total > 0 && (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              pointerEvents: "none",
            }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>total</div>
              <div style={{ fontFamily: "var(--head)", fontSize: 14, fontWeight: 700, color: "var(--text)" }}>
                ₹{total.toLocaleString("en-IN")}
              </div>
            </div>
          )}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          {entries.map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: getCategoryColor(k), flexShrink: 0, display: "inline-block" }} />
              <span style={{ fontSize: 12, color: "var(--text2)", flex: 1, fontWeight: 500 }}>{k}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)" }}>
                {total ? Math.round((v / total) * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Monthly Bar ─── */
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
          { label: "Income",  data: income,  backgroundColor: "rgba(34,197,94,0.7)",  borderRadius: 8, borderSkipped: false },
          { label: "Expense", data: expense, backgroundColor: "rgba(239,68,68,0.6)", borderRadius: 8, borderSkipped: false },
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
    <div className="chart-card" style={{ marginBottom: 14 }}>
      <div className="chart-title-row">
        <span className="chart-title">Income vs Expense</span>
        <div style={{ display: "flex", gap: 14 }}>
          {[["Income", "var(--green)"], ["Expense", "var(--red)"]].map(([l, c]) => (
            <span key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text3)" }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: c, display: "inline-block" }} /> {l}
            </span>
          ))}
        </div>
      </div>
      <div style={{ position: "relative", height: 160 }}><canvas ref={ref} /></div>
    </div>
  );
}