import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import type { AppData} from "./appDataTypes";
import { selectPotsTotal } from '../potSlice/potSelectors';


/* ===== ROOT ===== */
export const selectAppData = (state: RootState): AppData | null =>
  state.appData.data;

/* ===== STATUS / ERROR ===== */
export const selectAppDataStatus = (state: RootState) =>
  state.appData.status;

export const selectAppDataError = (state: RootState) =>
  state.appData.error;

// export const selectBalance = (state: RootState) : Balance | undefined => 
//     state.appData.data?.balance

export const selectAllTransaction = (state: RootState) => 
    state.appData.data?.transactions ?? [];

export const selectRecentTransactions = (state: RootState) => {
  const transactions = state.appData.data?.transactions ?? [];
    return [...transactions]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 5) ?? [];
}

export const selectRecurringTransactions = createSelector(
  [selectAllTransaction],
  transactions => {
    const recurring = transactions.filter(t => t.recurring);

    const uniqueByName: typeof recurring = [];

    for (const tx of recurring) {
      const exists = uniqueByName.find(item => item.name === tx.name);
      if (!exists) {
        uniqueByName.push(tx);
      }
    }

    return uniqueByName;
  }
);

const REFERENCE_DATE = new Date("2024-08-19T14:23:11Z");

export const selectRecurringBills = createSelector(
  [selectRecurringTransactions],
  bills =>
    bills.map(bill => {
      const billDate = new Date(bill.date);
      const billDay = billDate.getDate();
      const refDay = REFERENCE_DATE.getDate();

      const isPaid =
        billDate.getMonth() === 7 && // August
        billDate.getFullYear() === 2024 &&
        billDate <= REFERENCE_DATE;

      const isDueSoon =
        !isPaid &&
        billDay > refDay &&
        billDay <= refDay + 5;

      return {
        ...bill,
        status: isPaid ? "paid" : isDueSoon ? "due" : "normal",
        dueText: `Monthly - ${billDay}th`,
        amountValue: Math.abs(bill.amount),
        amountFormatted: `$${Math.abs(bill.amount).toFixed(2)}`,
      };
    })
);

export const selectBillsSummary = createSelector(
  [selectRecurringBills],
  bills => {
    const paid = bills.filter(b => b.status === "paid");
    const due = bills.filter(b => b.status === "due");
    const upcoming = bills.filter(b => b.status !== "paid");

    const sum = (arr: typeof bills) =>
      arr.reduce((s, b) => s + b.amountValue, 0);

    return {
      paidCount: paid.length,
      paidTotal: sum(paid),
      upcomingCount: upcoming.length,
      upcomingTotal: sum(upcoming),
      dueCount: due.length,
      dueTotal: sum(due),
      total: sum(bills),
    };
  }
);

export const selectIncomeFromTransactions = createSelector(
  [selectAllTransaction],
  (transactions) =>
    transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0)
);

export const selectExpensesFromTransactions = createSelector(
  [selectAllTransaction],
  (transactions) =>
    transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
);

export const selectBalanceOverview = createSelector(
  [selectIncomeFromTransactions,
    selectExpensesFromTransactions,
    selectPotsTotal
  ],
  (incomeTx, expensesTx, potsTotal) => {
    const income = incomeTx + potsTotal;
    const expenses = expensesTx;
    const currentBalance = income - expenses;

    return {
      income,
      expenses,
      currentBalance,
    }
  }
)