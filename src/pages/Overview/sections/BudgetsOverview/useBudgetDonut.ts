import { useMemo } from "react";
import type { Budget } from "../../../../features/appData/appDataTypes";

type BudgetWithStats = {
  budget: Budget;
};

export function useBudgetDonut(
  items: BudgetWithStats[],
  totalLimit: number
): string {
  return useMemo(() => {
    if (!items.length || totalLimit <= 0) return "";

    const { parts } = items.reduce<{
      parts: string[];
      offset: number;
    }>(
      (acc, { budget }) => {
        if (budget.maximum <= 0) return acc;

        const percent = (budget.maximum / totalLimit) * 100;
        const start = acc.offset;
        const end = start + percent;

        acc.parts.push(`var(--${budget.theme}) ${start}% ${end}%`);
        acc.offset = end;

        return acc;
      },
      { parts: [], offset: 0 }
    );

    return parts.join(", ");
  }, [items, totalLimit]);
}
