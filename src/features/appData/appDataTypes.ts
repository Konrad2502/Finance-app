


export type Balance = {
  current: number;
  income: number;
  expenses: number;
};


export type TransactionCategory =
  | "All Transactions"
  | "General"
  | "Dining Out"
  | "Groceries"
  | "Entertainment"
  | "Transportation"
  | "Lifestyle"
  | "Shopping"
  | "Bills"
  | "Personal Care"
  | "Education";

export type Transaction = {
  id:number;
  avatar: string;
  name: string;
  category: TransactionCategory;
  date: string; 
  amount: number;
  recurring: boolean;
};


export type Budget = {
  id: number;
  category: TransactionCategory;
  maximum: number;
  theme: string; // hex
};


export type Pot = {
  id:number;
  name: string;
  target: number;
  total: number;
  theme: string;
};


export type AppData = {
  balance: Balance;
  transactions: Transaction[];
  budgets: Budget[];
  pots: Pot[];
};


export type AsyncStatus = "idle" | "loading" | "succeeded" | "failed";

export type AppDataState = {
  data: AppData | null;
  status: AsyncStatus;
  error: string | null;
};
