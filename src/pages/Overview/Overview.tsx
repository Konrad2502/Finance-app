import "./Overview.scss";
import NextArrow from "../../assets/images/icon-caret-right.svg";
import PotIcon from "../../assets/images/icon-pot.svg";
import { useAppSelector } from "../../store/hooks";
import {
  selectAppData,
  selectRecentTransactions,
} from "../../features/appData/appDataSelectors";
import { useNavigate } from "react-router-dom";
import { budgetsWithTransactions } from "../../features/budgetSlice/budgetSelectors";
import {
  selectPots,
  selectPotsTotal,
} from "../../features/potSlice/potSelectors";

export default function Overview() {
  const data = useAppSelector(selectAppData);
  const balance = data?.balance;

  const recentTransactions = useAppSelector(selectRecentTransactions);
  const { items, totalLimit, totalSpent } = useAppSelector(
    budgetsWithTransactions
  );

  const pots = useAppSelector(selectPots);
  const totalPots = useAppSelector(selectPotsTotal);

  const donutGradient = items
    .reduce<{
      parts: string[];
      offset: number;
    }>(
      (acc, { budget }) => {
        if (budget.maximum <= 0 || totalLimit <= 0) return acc;

        const percent = (budget.maximum / totalLimit) * 100;
        const start = acc.offset;
        const end = start + percent;

        acc.parts.push(`var(--${budget.theme}) ${start}% ${end}%`);

        acc.offset = end;
        return acc;
      },
      { parts: [], offset: 0 }
    )
    .parts.join(", ");

  const navigate = useNavigate();

  return (
    <main className="overview">
      <h1 className="overview__title">Overview</h1>
      <div className="overview__summary">
        <div className="overview__item overview__item--active">
          <p className="overview__item-label">Current Balance</p>
          <p className="overview__item-amount">{`$${balance?.current}`}</p>
        </div>
        <div className="overview__item">
          <p className="overview__item-label">Income</p>
          <p className="overview__item-amount">{`$${balance?.income}`}</p>
        </div>
        <div className="overview__item">
          <p className="overview__item-label">Expenses</p>
          <p className="overview__item-amount">{`$${balance?.expenses}`}</p>
        </div>
      </div>
      <div className="overview__main">
        <div className="overview__left">
          {/* POTS */}
          <div className="pots">
            <div className="pots__heading">
              <h3 className="pots__heading-title">Pots</h3>
              <button
                onClick={() => navigate("pots")}
                className="pots__heading-btn"
                type="button"
              >
                <span className="pots__heading-btnText">See details</span>
                <img
                  className="pots__heading-btnIcon"
                  src={NextArrow}
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="pots__content">
              {/* LEFT TILE */}
              <div className="pots__total">
                <img
                  className="pots__total-icon"
                  src={PotIcon}
                  alt=""
                  aria-hidden="true"
                />
                <div className="pots__total-text">
                  <p className="pots__total-label">Total Saved</p>
                  <p className="pots__total-amount">${totalPots}</p>
                </div>
              </div>

              {/* RIGHT LIST */}
              <ul className="pots__list">
                {pots.map((pot) => (
                  <li className={`pots__item pots__item--${pot.theme}`}>
                    <span className="pots__item-label">{pot.name}</span>
                    <span className="pots__item-amount">${pot.total}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* TRANSACTIONS */}
          <div className="transactions">
            <div className="transactions__heading">
              <h3 className="transactions__heading-title">Transactions</h3>
              <button
                onClick={() => {
                  navigate("transactions");
                }}
                className="transactions__heading-btn"
                type="button"
              >
                <span className="transactions__heading-btnText">View all</span>
                <img
                  className="transactions__heading-btnIcon"
                  src={NextArrow}
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="transactions__content">
              <ul className="transactions__list">
                {recentTransactions.map((item) => {
                  const formattedDate = new Date(item.date).toLocaleDateString(
                    "en-GB"
                  );
                  return (
                    <li key={item.id} className="transactions__item">
                      <div className="transactions__item-left">
                        <img
                          className="transactions__avatar"
                          src={item.avatar}
                          alt="Daniel Carter"
                        />
                        <p className="transactions__name">{item.name}</p>
                      </div>
                      <div className="transactions__item-right">
                        <p className="transactions__amount transactions__amount--positive">
                          {(item.amount > 0 ? "+" : "-") +
                            "$" +
                            Math.abs(item.amount).toFixed(2)}
                        </p>
                        <p className="transactions__date">{formattedDate}</p>
                      </div>
                    </li>
                  );
                })}
                ;
              </ul>
            </div>
          </div>
        </div>

        <div className="overview__right">
          {/* BUDGETS */}
          <div className="budgets">
            <div className="budgets__heading">
              <h3 className="budgets__heading-title">Budgets</h3>
              <button
                onClick={() => navigate("budgets")}
                className="budgets__heading-btn"
                type="button"
              >
                <span className="budgets__heading-btnText">See details</span>
                <img
                  className="budgets__heading-btnIcon"
                  src={NextArrow}
                  alt=""
                  aria-hidden="true"
                />
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
                    <p className="budgets__chart-amount">
                      ${totalSpent.toFixed()}
                    </p>
                    <p className="budgets__chart-label">
                      of ${totalLimit.toFixed()} limit
                    </p>
                  </div>
                </div>
              </div>

              {/* LEGEND */}
              <ul className="budgets__legend">
                {items.map((item) => {
                  const budget = item.budget;
                  return (
                    <li
                      key={budget.id}
                      className={`budgets__legend-item budgets__legend-item--${budget.theme}`}
                    >
                      <span className="budgets__legend-label">
                        {budget.category}
                      </span>
                      <span className="budgets__legend-amount">
                        ${budget.maximum.toFixed(2)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* BILLS */}
          <div className="bills">
            <div className="bills__heading">
              <h3 className="bills__heading-title">Recurring Bills</h3>
              <button className="bills__heading-btn" type="button">
                <span className="bills__heading-btnText">See details</span>
                <img
                  className="bills__heading-btnIcon"
                  src={NextArrow}
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="bills__content">
              <ul className="bills__list">
                <li className="bills__item bills__item--green">
                  <span className="bills__item-label">Paid Bills</span>
                  <span className="bills__item-amount">$190.00</span>
                </li>

                <li className="bills__item bills__item--yellow">
                  <span className="bills__item-label">Total Upcoming</span>
                  <span className="bills__item-amount">$194.98</span>
                </li>

                <li className="bills__item bills__item--cyan">
                  <span className="bills__item-label">Due Soon</span>
                  <span className="bills__item-amount">$59.98</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
