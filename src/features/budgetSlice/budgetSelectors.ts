import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { selectAllTransaction } from "../appData/appDataSelectors";

export const selectBudgets = (state: RootState) =>
  state.budgets.items;

export const budgetsWithTransactions = createSelector(
  [selectBudgets, selectAllTransaction],
  (budgets, transactions) => {
    const items = budgets.map((budget) => {
      const categoryTransactions = transactions.filter(
        (tx) => tx.category === budget.category
      );

      const spent = categoryTransactions.reduce(
        (sum, tx) => sum + Math.abs(tx.amount),
        0
      );

      const recentTransactions = [...categoryTransactions]
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
        .slice(0, 3);

      const remaining = Math.max(budget.maximum - spent, 0);
      const progress = Math.min((spent / budget.maximum) * 100, 100);

      return {
        budget,
        spent,
        remaining,
        progress,
        recentTransactions,
      };
    });

    const totalSpent = items.reduce((sum, i) => sum + i.spent, 0);
    const totalLimit = items.reduce(
      (sum, i) => sum + i.budget.maximum,
      0
    );

    return {
      items,
      totalSpent,
      totalLimit,
    };
  }
);
