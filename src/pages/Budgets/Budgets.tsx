import "./Budgets.scss";
import DotsIcon from "../../assets/images/icon-ellipsis.svg";
import ArrowRight from "../../assets/images/icon-caret-right.svg";
import Avatar from "../../assets/images/avatars/daniel-carter.jpg";

const mockBudgets = [
  { id: 1, name: "Entertainment", color: "green" },
  { id: 2, name: "Bills", color: "cyan" },
  { id: 3, name: "Dining Out", color: "yellow" },
  { id: 4, name: "Personal Care", color: "navy" },
];

export default function Budgets() {
  return (
    <main className="budgets-page">
      {/* HEADER */}
      <div className="budgets-page__heading">
        <h1 className="budgets-page__title">Budgets</h1>

        <button className="budgets-page__btn" type="button">
          <span className="budgets-page__btnIcon">+</span>
          <span className="budgets-page__btnText">Add New Budget</span>
        </button>
      </div>

      {/* CONTENT */}
      <section className="budgets-page__content">
        {/* LEFT – CHART */}
        <div className="budgets-summary">
          <div className="budgets-summary__chart">
            <div className="budgets-summary__chart-inner">
              <p className="budgets-summary__amount">$338</p>
              <p className="budgets-summary__label">of $975 limit</p>
            </div>
          </div>

          <h3 className="budgets-summary__title">Spending Summary</h3>

          <ul className="budgets-summary__list">
            <li className="budgets-summary__item budgets-summary__item--green">
              <span>Entertainment</span>
              <div className="budgets-summary__wrapper">
                <strong>$15.00</strong>
                <span>of $50.00</span>
              </div>
            </li>

            <li className="budgets-summary__item budgets-summary__item--cyan">
              <span>Bills</span>
              <div className="budgets-summary__wrapper">
                <strong>$150.00</strong>
                <span>of $750.00</span>
              </div>
            </li>

            <li className="budgets-summary__item budgets-summary__item--yellow">
              <span>Dining Out</span>
              <div className="budgets-summary__wrapper">
                <strong>$133.00</strong>
                <span>of $75.00</span>
              </div>
            </li>

            <li className="budgets-summary__item budgets-summary__item--navy">
              <span>Personal Care</span>
              <div className="budgets-summary__wrapper">
                <strong>$40.00</strong>
                <span>of $100.00</span>
              </div>
            </li>
          </ul>
        </div>
        {/* RIGHT – BUDGET CARDS */}
        <div className="budgets-list">
          {mockBudgets.map((budget) => (
            <article key={budget.id} className="budget-card">
              {/* CARD HEADER */}
              <header className="budget-card__header">
                <div className="budget-card__title">
                  <span
                    className={`budget-card__dot budget-card__dot--${budget.color}`}
                  />
                  <h3 className="budget-card__name">{budget.name}</h3>
                </div>

                <img src={DotsIcon} alt="" aria-hidden="true" />
              </header>

              <p className="budget-card__limit">Maximum of $50.00</p>

              {/* PROGRESS */}
              <div className="budget-card__bar">
                <div
                  className={`budget-card__bar-fill budget-card__bar-fill--${budget.color}`}
                />
              </div>

              {/* STATS */}
              <div className="budget-card__stats">
                <div
                  className={`budget-card__stat budget-card__stat--${budget.color}`}
                >
                  <span className="budget-card__stat-label">Spent</span>
                  <strong>$15.00</strong>
                </div>

                <div className="budget-card__stat">
                  <span className="budget-card__stat-label">Remaining</span>
                  <strong>$35.00</strong>
                </div>
              </div>

              {/* LATEST */}
              <div className="budget-card__latest">
                <div className="budget-card__latest-header">
                  <h4>Latest Spending</h4>

                  <button type="button">
                    <span>See All</span>
                    <img src={ArrowRight} alt="" aria-hidden="true" />
                  </button>
                </div>

                <ul className="budget-card__transactions">
                  <li className="budget-card__transaction">
                    <div className="budget-card__transaction-left">
                      <img
                        src={Avatar}
                        alt="James Thompson"
                        className="budget-card__avatar"
                      />
                      <span className="budget-card__transaction-name">
                        James Thompson
                      </span>
                    </div>

                    <div className="budget-card__transaction-right">
                      <span className="budget-card__transaction-amount">
                        -$5.00
                      </span>
                      <span className="budget-card__transaction-date">
                        11 Aug 2024
                      </span>
                    </div>
                  </li>

                  <li className="budget-card__transaction">
                    <div className="budget-card__transaction-left">
                      <img
                        src={Avatar}
                        alt="Pixel Playground"
                        className="budget-card__avatar"
                      />
                      <span className="budget-card__transaction-name">
                        Pixel Playground
                      </span>
                    </div>

                    <div className="budget-card__transaction-right">
                      <span className="budget-card__transaction-amount">
                        -$10.00
                      </span>
                      <span className="budget-card__transaction-date">
                        11 Aug 2024
                      </span>
                    </div>
                  </li>

                  <li className="budget-card__transaction">
                    <div className="budget-card__transaction-left">
                      <img
                        src={Avatar}
                        alt="Rina Sato"
                        className="budget-card__avatar"
                      />
                      <span className="budget-card__transaction-name">
                        Rina Sato
                      </span>
                    </div>

                    <div className="budget-card__transaction-right">
                      <span className="budget-card__transaction-amount">
                        -$10.00
                      </span>
                      <span className="budget-card__transaction-date">
                        13 Jul 2024
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
