import NextArrow from "../../../../assets/images/icon-caret-right.svg";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
import { selectRecentTransactions } from "../../../../features/appData/appDataSelectors";

export default function TransactionsOverview() {
  const navigate = useNavigate();
  const recentTransactions = useAppSelector(selectRecentTransactions);

  return (
    <div className="transactions">
      <div className="transactions__heading">
        <h3 className="transactions__heading-title">Transactions</h3>
        <button
          onClick={() => navigate("transactions")}
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
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            );

            const isPositive = item.amount > 0;

            return (
              <li key={item.id} className="transactions__item">
                <div className="transactions__item-left">
                  <img
                    className="transactions__avatar"
                    src={item.avatar}
                    alt={item.name}
                  />
                  <p className="transactions__name">{item.name}</p>
                </div>

                {/* RIGHT */}
                <div className="transactions__item-right">
                  <p
                    className={`transactions__amount ${
                      isPositive ? "transactions__amount--positive" : ""
                    }`}
                  >
                    {(isPositive ? "+" : "-") +
                      "$" +
                      Math.abs(item.amount).toFixed(2)}
                  </p>
                  <p className="transactions__date">{formattedDate}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
