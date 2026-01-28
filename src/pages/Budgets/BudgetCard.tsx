import type { Transaction, Budget } from "../../features/appData/appDataTypes";
import BudgetCardRecentTransactions from "./BudgetCardRecentTransactions";
import BudgetMenu from "./BudgetMenu";

type BudgetCardProps = {
  budget: Budget;
  spent: number;
  remaining: number;
  progress: number;
  recentTransactions: Transaction[];

  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onNavigateTransactions: () => void;
};

export default function BudgetCard({
  budget,
  spent,
  remaining,
  progress,
  recentTransactions,
  isMenuOpen,
  onToggleMenu,
  onEdit,
  onDelete,
  onNavigateTransactions,
}: BudgetCardProps) {
  return (
    <article className="budget-card">
      {/* HEADER */}
      <header className="budget-card__header">
        <div className="budget-card__title">
          <span
            className={`budget-card__dot budget-card__dot--${budget.theme}`}
          />
          <h3 className="budget-card__name">{budget.category}</h3>
        </div>

        <BudgetMenu
          isOpen={isMenuOpen}
          onToggle={onToggleMenu}
          onEdit={onEdit}
          onDelete={onDelete}
          onClose={onToggleMenu}
        />
      </header>

      <p className="budget-card__limit">
        Maximum of ${budget.maximum.toFixed(2)}
      </p>

      {/* BAR */}
      <div className="budget-card__bar">
        <div
          className={`budget-card__bar-fill budget-card__bar-fill--${budget.theme}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* STATS */}
      <div className="budget-card__stats">
        <div className={`budget-card__stat budget-card__stat--${budget.theme}`}>
          <span className="budget-card__stat-label">Spent</span>
          <strong>${spent.toFixed(2)}</strong>
        </div>

        <div className="budget-card__stat">
          <span className="budget-card__stat-label">Remaining</span>
          <strong>${remaining.toFixed(2)}</strong>
        </div>
      </div>

      {/* LATEST */}
      <BudgetCardRecentTransactions
        transactions={recentTransactions}
        onNavigateTransactions={onNavigateTransactions}
      />
    </article>
  );
}
