import "./Budgets.scss";
import { useMemo } from "react";
import type { Budget } from "../../features/appData/appDataTypes";

type BudgetsSummaryItem = {
  budget: Budget;
  spent: number;
};

type BudgetsSummaryProps = {
  items: BudgetsSummaryItem[];
  totalSpent: number;
  totalLimit: number;
};

export default function BudgetsSummary({
  items,
  totalSpent,
  totalLimit,
}: BudgetsSummaryProps) {
  const donutGradient = useMemo(() => {
    if (totalLimit <= 0) return "";

    const result = items.reduce<{
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

    return result.parts.join(", ");
  }, [items, totalLimit]);

  return (
    <div className="budgets-summary">
      <div
        className="budgets-summary__chart"
        style={{ background: `conic-gradient(${donutGradient})` }}
      >
        <div className="budgets-summary__chart-inner">
          <p className="budgets-summary__amount">${totalSpent.toFixed(0)}</p>
          <p className="budgets-summary__label">
            of ${totalLimit.toFixed(0)} limit
          </p>
        </div>
      </div>

      <h3 className="budgets-summary__title">Spending Summary</h3>

      <ul className="budgets-summary__list">
        {items.map(({ budget, spent }) => (
          <li
            key={budget.id}
            className={`budgets-summary__item budgets-summary__item--${budget.theme}`}
          >
            <span>{budget.category}</span>
            <div className="budgets-summary__wrapper">
              <strong>${spent.toFixed(2)}</strong>
              <span>of ${budget.maximum.toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
