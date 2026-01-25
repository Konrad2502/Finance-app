import NextArrow from "../../../../assets/images/icon-caret-right.svg";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
import { budgetsWithTransactions } from "../../../../features/budgetSlice/budgetSelectors";
import { useBudgetDonut } from "./useBudgetDonut";

export default function BudgetsOverview() {
  const navigate = useNavigate();

  const { items, totalLimit, totalSpent } = useAppSelector(
    budgetsWithTransactions
  );

  const donutGradient = useBudgetDonut(items, totalLimit);

  return (
    <section className="budgets">
      <div className="budgets__heading">
        <h3 className="budgets__heading-title">Budgets</h3>

        <button
          type="button"
          className="budgets__heading-btn"
          onClick={() => navigate("budgets")}
        >
          <span className="budgets__heading-btnText">See details</span>
          <img src={NextArrow} alt="" aria-hidden="true" />
        </button>
      </div>

      <div className="budgets__content">
        {/* DONUT */}
        <div className="budgets__wrap">
          <div
            className="budgets__chart"
            style={{
              background: `conic-gradient(${donutGradient})`,
            }}
          >
            <div className="budgets__chart-inner">
              <p className="budgets__chart-amount">${totalSpent.toFixed(0)}</p>
              <p className="budgets__chart-label">
                of ${totalLimit.toFixed(0)} limit
              </p>
            </div>
          </div>
        </div>

        {/* LEGEND */}
        <ul className="budgets__legend">
          {items.map(({ budget }) => (
            <li
              key={budget.id}
              className={`budgets__legend-item budgets__legend-item--${budget.theme}`}
            >
              <span className="budgets__legend-label">{budget.category}</span>
              <span className="budgets__legend-amount">
                ${budget.maximum.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
