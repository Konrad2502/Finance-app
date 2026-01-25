import { useAppSelector } from "../../../../store/hooks";
import { selectBalanceOverview } from "../../../../features/appData/appDataSelectors";

export default function BalanceSummary() {
  const { income, expenses, currentBalance } = useAppSelector(
    selectBalanceOverview
  );

  return (
    <div className="overview__summary">
      <div className="overview__item overview__item--active">
        <p className="overview__item-label">Current Balance</p>
        <p className="overview__item-amount">${currentBalance}</p>
      </div>

      <div className="overview__item">
        <p className="overview__item-label">Income</p>
        <p className="overview__item-amount">${income}</p>
      </div>

      <div className="overview__item">
        <p className="overview__item-label">Expenses</p>
        <p className="overview__item-amount">${expenses}</p>
      </div>
    </div>
  );
}
