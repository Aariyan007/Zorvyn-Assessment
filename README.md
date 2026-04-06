# FinFlow — Finance Dashboard

> A modern, interactive finance dashboard with real-time charts, role-based access, and responsive design. Built with React, Framer Motion, and Chart.js.

![Status](https://img.shields.io/badge/status-ready-brightgreen)
![React](https://img.shields.io/badge/React-18.0+-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [Components](#-components)
- [Technologies](#-technologies)
- [Responsive Design](#-responsive-design)
- [Data Persistence](#-data-persistence)

---

## ✨ Features

### Core Dashboard

| Feature | Description |
|---|---|
| **Summary Cards** | Live balance (hero card), income, and expense totals |
| **Charts** | Balance Trend (line chart), Spending Breakdown (donut), Income vs Expense (bar chart) |
| **Transaction List** | Full table with date, category, type, and amount |
| **Search & Filter** | Filter by transaction type, search by category/date |
| **Smart Sorting** | Sort by amount (high/low) or date (newest/oldest) |
| **Insights Panel** | Top spending category, savings rate, average expense, monthly growth |
| **Role-Based Access** | Viewer (read-only) and Admin (edit/delete) modes |
| **Dark/Light Mode** | Toggle between dark and light themes with persistence |
| **Data Export** | Export filtered data as CSV or JSON |
| **Responsive Design** | Optimized for desktop, tablet, and mobile devices |

### Technical Highlights

✅ Real-time calculations  
✅ Framer Motion animations  
✅ localStorage persistence  
✅ Mobile-first responsive layout  
✅ Smooth page transitions  
✅ Accessible UI components  

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
cd finance-dashboard
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

3. **Open in browser:**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
finance-dashboard/
├── src/
│   ├── components/              # React components
│   │   ├── AddTransaction.jsx   # Add/edit transaction form
│   │   ├── CategoryBars.jsx     # Category breakdown chart
│   │   ├── Charts.jsx           # All chart components (line, donut, bar)
│   │   ├── Filters.jsx          # Search & filter controls
│   │   ├── Floatingbackground.jsx # Animated background
│   │   ├── Insights.jsx         # Analytics panel
│   │   ├── Loader.jsx           # Loading screen
│   │   ├── RoleSwitcher.jsx     # Admin/Viewer toggle
│   │   ├── sidebar.jsx          # Navigation sidebar
│   │   ├── SummaryCard.jsx      # Balance, income, expense cards
│   │   └── TransactionList.jsx  # Transaction table
│   ├── data/
│   │   └── mockData.js          # Sample transactions & helpers
│   ├── App.jsx                  # Main app logic
│   ├── main.jsx                 # Entry point
│   ├── index.css                # Global styles
│   └── assets/                  # Static images/icons
├── package.json
├── vite.config.js
└── README.md
```

---

## 👨‍💼 Usage Guide

### For Viewers
- **View** all transactions and charts
- **Filter** and search transactions
- **Export** data (CSV/JSON)
- **Switch theme** between dark/light mode
- ❌ Cannot add or delete transactions

### For Admins
- **All viewer features** +
- **Add** new transactions via the "+ Add Transaction" button
- **Delete** transactions with the trash icon
- **Role switching** via sidebar dropdown
- ✅ Full data management

### Theme Toggle
- Located in the top-right corner
- Toggles between dark (default) and light modes
- Preference persists on reload

### Data Export
- Click the **Export** button in the sidebar
- Downloads filtered transactions as CSV or JSON

---

## 🔧 Components Guide

### `AddTransaction.jsx`
Handles transaction creation. Displays a form with:
- Amount input (₹)
- Category (text field)
- Type toggle (Expense/Income)
- Date selector
- Validation with error messages

**Props:** `addTx` (function), `role` (string)

### `Charts.jsx`
Three interactive Chart.js visualizations:
- **BalanceTrendChart:** Line chart showing running balance over time
- **SpendingDonutChart:** Donut chart of expenses by category
- **MonthlyBarChart:** Bar chart comparing income vs expense

**Features:**
- Responsive sizing on desktop, tablet, and mobile
- Gradient backgrounds
- Custom tooltips with currency formatting
- Real-time data updates

### `Filters.jsx`
Search and filtering controls:
- Text search by category/date
- Type filter (All/Income/Expense)
- Sort options (amount, date)

**Props:** search, setSearch, filterType, setFilterType, sortOrder, setSortOrder

### `Insights.jsx`
Analytics panel showing:
- Top spending category
- Monthly savings rate (%)
- Average expense amount
- Month-over-month growth

### `SummaryCard.jsx`
Hero cards displaying:
- **Balance:** Running total (income - expense)
- **Income:** Total earnings
- **Expenses:** Total spending

### `sidebar.jsx`
Navigation sidebar with:
- Logo and branding
- Main navigation items
- Feature links (settings, export)
- Role switcher
- Status indicator (local data persistence)

**Features:**
- Animated drawer on mobile (≤768px)
- Fixed sidebar on desktop
- Smooth transitions

### `TransactionList.jsx`
Data table showing:
- Date, Category, Type, Amount
- Delete button (admin only)
- Animated row transitions
- Empty state message

---

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| **React 18** | UI library |
| **Vite** | Build tool & dev server |
| **Framer Motion** | Animations & transitions |
| **Chart.js** | Data visualization |
| **CSS Variables** | Theming system |
| **localStorage** | Data persistence |

### Key Dependencies
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "framer-motion": "^10.0.0",
  "chart.js": "^4.0.0"
}
```

---

## 📱 Responsive Design

### Breakpoints

| Screen | Breakpoint | Layout |
|---|---|---|
| Desktop | >768px | Sidebar fixed, full layout |
| Tablet | 768px - 900px | Charts stack, sidebar drawer |
| Mobile | ≤600px | Single column, all full-width |

### Mobile Optimizations
- ✅ Sidebar converts to hamburger drawer
- ✅ Charts scale down responsively
- ✅ Forms center on screen, full width
- ✅ Touch-friendly button sizes
- ✅ Optimized font sizes
- ✅ Table scrolls horizontally if needed

---

## 💾 Data Persistence

### localStorage Keys

| Key | Type | Purpose |
|---|---|---|
| `finflow_transactions` | JSON array | All transactions |
| `finflow_role` | String | Current user role (viewer/admin) |
| `finflow_dark` | Boolean | Theme preference |

### How It Works
1. Data is auto-saved to localStorage on every change
2. App loads data from localStorage on startup
3. Default fallback data provided if localStorage is empty
4. No backend required — all data is client-side

### Reset Data
To reset to default data, clear localStorage:
```javascript
localStorage.clear()
```

---

## 🎨 Theming

### CSS Variables System
All colors and spacing use CSS custom properties. Edit `index.css` to customize:

```css
:root {
  --orange: #f97316;
  --bg: #0d0d0f;
  --text: #f2f2f4;
  --radius: 14px;
  /* ... more variables ... */
}
```

### Dark Mode (Default)
```css
/* Automatically applied */
```

### Light Mode
```css
.light {
  --bg: #f4f4f6;
  --text: #111114;
  /* ... light theme colors ... */
}
```

Enable by toggling in the UI or adding `class="light"` to `<html>`

---

## 📊 Sample Data

The app includes mock transaction data for April 2026:
- 20+ sample transactions
- Mix of income and expenses
- Various categories (Food, Utilities, Salary, etc.)
- Realistic amounts in Indian Rupees (₹)

Data is located in [src/data/mockData.js](src/data/mockData.js)

---

## 🔐 Role-Based Access

### Viewer Role
```
✓ View all data
✓ Use filters/search
✓ Export data
✓ View charts
✗ Add transactions
✗ Delete transactions
```

### Admin Role
```
✓ Everything in Viewer role
✓ Add new transactions
✓ Delete transactions
✓ Switch roles
```

Switch roles via the dropdown in the sidebar (bottom left)

---

## 📝 Notes

- All data is stored locally in the browser — no backend required
- Exporting data downloads it as a file to your computer
- Animations use GPU acceleration for smooth performance
- Charts update in real-time as you modify transactions
- The app is fully functional offline once loaded

---

## 📄 License

MIT License — Feel free to use this project for learning or as a template!

---

**Made with ❤️ using React & Framer Motion**
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
