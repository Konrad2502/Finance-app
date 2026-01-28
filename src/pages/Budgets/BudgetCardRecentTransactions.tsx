import ArrowRight from "../../assets/images/icon-caret-right.svg";
import type { Transaction } from "../../features/appData/appDataTypes";

type Props = {
  transactions: Transaction[];
  onNavigateTransactions: () => void;
};

export default function BudgetCardRecentTransactions({
  transactions,
  onNavigateTransactions,
}: Props) {
  return (
    <div className="budget-card__latest">
      <div className="budget-card__latest-header">
        <h4>Latest Spending</h4>

        <button type="button" onClick={onNavigateTransactions}>
          <span>See All</span>
          <img src={ArrowRight} alt="" aria-hidden="true" />
        </button>
      </div>

      <ul className="budget-card__transactions">
        {transactions.map((tr) => {
          const sign = tr.amount > 0 ? "+" : "-";
          const formattedAmount = Math.abs(tr.amount).toFixed(2);
          const formattedDate = new Date(tr.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          return (
            <li key={tr.id} className="budget-card__transaction">
              <div className="budget-card__transaction-left">
                <img
                  src={tr.avatar}
                  alt={tr.name}
                  className="budget-card__avatar"
                />
                <span className="budget-card__transaction-name">{tr.name}</span>
              </div>

              <div className="budget-card__transaction-right">
                <span className="budget-card__transaction-amount">
                  {sign}${formattedAmount}
                </span>
                <span className="budget-card__transaction-date">
                  {formattedDate}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
