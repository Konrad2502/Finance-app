import "./Overview.scss";
import NextArrow from "../../assets/images/icon-caret-right.svg";
import PotIcon from "../../assets/images/icon-pot.svg";
import { useAppSelector } from "../../store/hooks";
import {
  selectAppData,
  selectRecentTransactions,
} from "../../features/appData/appDataSelectors";
import { useNavigate } from "react-router-dom";

export default function Overview() {
  const data = useAppSelector(selectAppData);
  const balance = data?.balance;

  const recentTransactions = useAppSelector(selectRecentTransactions);

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
              <button className="pots__heading-btn" type="button">
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
                  <p className="pots__total-amount">$850</p>
                </div>
              </div>

              {/* RIGHT LIST */}
              <ul className="pots__list">
                <li className="pots__item pots__item--green">
                  <span className="pots__item-label">Savings</span>
                  <span className="pots__item-amount">$159</span>
                </li>

                <li className="pots__item pots__item--navy">
                  <span className="pots__item-label">Concert Ticket</span>
                  <span className="pots__item-amount">$110</span>
                </li>

                <li className="pots__item pots__item--cyan">
                  <span className="pots__item-label">Gift</span>
                  <span className="pots__item-amount">$40</span>
                </li>

                <li className="pots__item pots__item--yellow">
                  <span className="pots__item-label">New Laptop</span>
                  <span className="pots__item-amount">$10</span>
                </li>
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
              <button className="budgets__heading-btn" type="button">
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
                <div className="budgets__chart">
                  <div className="budgets__chart-inner">
                    <p className="budgets__chart-amount">$338</p>
                    <p className="budgets__chart-label">of $975 limit</p>
                  </div>
                </div>
              </div>

              {/* LEGEND */}
              <ul className="budgets__legend">
                <li className="budgets__legend-item budgets__legend-item--green">
                  <span className="budgets__legend-label">Entertainment</span>
                  <span className="budgets__legend-amount">$50.00</span>
                </li>

                <li className="budgets__legend-item budgets__legend-item--cyan">
                  <span className="budgets__legend-label">Bills</span>
                  <span className="budgets__legend-amount">$750.00</span>
                </li>

                <li className="budgets__legend-item budgets__legend-item--yellow">
                  <span className="budgets__legend-label">Dining Out</span>
                  <span className="budgets__legend-amount">$75.00</span>
                </li>

                <li className="budgets__legend-item budgets__legend-item--navy">
                  <span className="budgets__legend-label">Personal Care</span>
                  <span className="budgets__legend-amount">$100.00</span>
                </li>
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
