# FinFlow — Finance Dashboard

A clean, interactive finance dashboard built with React, Framer Motion, and Chart.js.

---

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

**Dependencies needed:**
```bash
npm install framer-motion chart.js
```

---

## Features

### ✅ Core Requirements

| Requirement | Implementation |
|---|---|
| Summary cards | Balance (hero card), Income, Expenses — with live totals |
| Time-based chart | Balance Trend line chart (April 2026) |
| Categorical chart | Spending Breakdown donut chart |
| Transaction list | Full table: Date, Category, Type, Amount |
| Filtering | Filter by type (income/expense), search by category or date |
| Sorting | Sort by amount (high/low) or date (newest/oldest) |
| Role-based UI | Viewer: read-only · Admin: add + delete transactions |
| Role switching | Dropdown in sidebar, persisted to localStorage |
| Insights section | Top category, Savings Rate, Avg Expense, Monthly Growth |
| State management | useState + localStorage persistence |

### ✅ Optional Enhancements

| Enhancement | Status |
|---|---|
| Dark mode | ✅ Toggle in topbar, persisted |
| Light mode | ✅ Full CSS variable system |
| Data persistence | ✅ localStorage (transactions + role + theme) |
| Animations | ✅ Framer Motion throughout (page, cards, rows) |
| Export CSV | ✅ Filtered data exported |
| Export JSON | ✅ Filtered data exported |
| Floating background | ✅ Animated financial icon canvas |
| Responsive | ✅ Sidebar collapses on mobile |

---

## Architecture

```
src/
├── App.jsx                  # Root: state, localStorage, layout
├── index.css                # Design tokens, all CSS
├── main.jsx                 # Entry (no StrictMode)
├── data/
│   └── mockData.js          # 12 transactions across 2 months
└── components/
    ├── Sidebar.jsx           # Navigation, role switcher
    ├── SummaryCard.jsx       # 3 summary cards (Balance hero + Income + Expense)
    ├── Insights.jsx          # 4 insight metric cards
    ├── Charts.jsx            # BalanceTrend, SpendingDonut, MonthlyBar
    ├── CategoryBars.jsx      # Gradient progress bars by spending category
    ├── TransactionList.jsx   # Animated table with admin delete
    ├── AddTransaction.jsx    # Admin-only form (slide-in animated)
    ├── Filters.jsx           # Search + type filter + sort
    ├── Loader.jsx            # Spinning rings splash screen
    ├── FloatingBackground.jsx# Canvas: drifting financial icons
    └── Icons.jsx             # SVG icon library (no emoji)
```

## State Management

All state lives in `App.jsx` and is passed down as props (no Context/Redux needed at this scale).

Three pieces are persisted to `localStorage`:
- `finflow_transactions` — full array, updated on add/delete/reset
- `finflow_role` — "viewer" | "admin"
- `finflow_dark` — boolean

## Role Behavior

- **Viewer**: sees all data, charts, insights. No add/delete/reset buttons.
- **Admin**: sees all of the above + "Add Transaction" form, "delete" buttons on each row, "Reset" button to restore default data.

Switch role from the sidebar bottom panel.