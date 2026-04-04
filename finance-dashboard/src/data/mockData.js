export const transactionsData = [
  { id: 1,  date: "2026-04-01", amount: 500,  category: "Food",      type: "expense" },
  { id: 2,  date: "2026-04-02", amount: 2000, category: "Salary",    type: "income"  },
  { id: 3,  date: "2026-04-03", amount: 800,  category: "Shopping",  type: "expense" },
  { id: 4,  date: "2026-04-04", amount: 1200, category: "Freelance", type: "income"  },
  { id: 5,  date: "2026-04-05", amount: 300,  category: "Travel",    type: "expense" },
  { id: 6,  date: "2026-03-28", amount: 450,  category: "Food",      type: "expense" },
  { id: 7,  date: "2026-03-25", amount: 3500, category: "Salary",    type: "income"  },
  { id: 8,  date: "2026-03-20", amount: 1200, category: "Rent",      type: "expense" },
  { id: 9,  date: "2026-03-18", amount: 650,  category: "Shopping",  type: "expense" },
  { id: 10, date: "2026-03-15", amount: 900,  category: "Freelance", type: "income"  },
  { id: 11, date: "2026-03-10", amount: 200,  category: "Travel",    type: "expense" },
  { id: 12, date: "2026-03-05", amount: 100,  category: "Utilities", type: "expense" },
];

export const categoryColors = {
  Food:      "#f97316",
  Salary:    "#22c55e",
  Shopping:  "#60a5fa",
  Freelance: "#a78bfa",
  Travel:    "#f59e0b",
  Rent:      "#ef4444",
  Utilities: "#06b6d4",
  Other:     "#6b7280",
};

export function getCategoryColor(category) {
  return categoryColors[category] ?? categoryColors.Other;
}