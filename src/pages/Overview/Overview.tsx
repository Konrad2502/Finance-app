import "./Overview.scss";
import BalanceSummary from "./sections/BalanceSummary/BalanceSummary";
import BudgetsOverview from "./sections/BudgetsOverview/BudgetsOverview";
import TransactionsOverview from "./sections/TransactionsOverview/TransactionsOverview";
import PotsOverview from "./sections/PotsOverview/PotsOverview";
import BillsOverview from "./sections/BillsOverview/BillsOverview";

export default function Overview() {
  return (
    <main className="overview">
      <h1 className="overview__title">Overview</h1>
      <BalanceSummary />
      <div className="overview__main">
        <div className="overview__left">
          <PotsOverview />
          <TransactionsOverview />
        </div>
        <div className="overview__right">
          <BudgetsOverview />
          <BillsOverview />
        </div>
      </div>
    </main>
  );
}
