export const categoryOptions = [
  "All Transactions",
  "Entertainment",
  "Bills",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Personal Care",
  "Education",
  "Lifestyle",
  "Shopping",
  "General",
] as const;

export const colorOptions = [
  { value: "green", label: "Green", className: "color-dot--green" },
  { value: "yellow", label: "Yellow", className: "color-dot--yellow" },
  { value: "cyan", label: "Cyan", className: "color-dot--cyan" },
  { value: "navy", label: "Navy", className: "color-dot--navy" },
  { value: "red", label: "Red", className: "color-dot--red" },
  { value: "purple", label: "Purple", className: "color-dot--purple" },
  { value: "turquoise", label: "Turquoise", className: "color-dot--turquoise" },
  { value: "brown", label: "Brown", className: "color-dot--brown" },
  { value: "magenta", label: "Magenta", className: "color-dot--magenta" },
  { value: "blue", label: "Blue", className: "color-dot--blue" },
  { value: "army-green", label: "Army green", className: "color-dot--army-green" },
  { value: "gold", label: "Gold", className: "color-dot--gold" },
  { value: "orange", label: "Orange", className: "color-dot--orange" },
] as const;

export const sortOptions = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
] as const;

export type CategoryOption = (typeof categoryOptions)[number];
export type ColorOption = (typeof colorOptions)[number]["value"];
export type SortOption = (typeof sortOptions)[number];