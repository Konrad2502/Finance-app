import NextArrow from "../../../../assets/images/icon-caret-right.svg";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
import { selectBillsSummary } from "../../../../features/appData/appDataSelectors";

export default function BillsOverview() {
  const navigate = useNavigate();

  const summary = useAppSelector(selectBillsSummary);
  const { paidTotal, upcomingTotal, dueTotal } = summary;

  return (
    <div className="bills">
      <div className="bills__heading">
        <h3 className="bills__heading-title">Recurring Bills</h3>
        <button
          onClick={() => navigate("bills")}
          className="bills__heading-btn"
          type="button"
        >
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
            <span className="bills__item-amount">${paidTotal.toFixed(2)}</span>
          </li>

          <li className="bills__item bills__item--yellow">
            <span className="bills__item-label">Total Upcoming</span>
            <span className="bills__item-amount">
              ${upcomingTotal.toFixed(2)}
            </span>
          </li>

          <li className="bills__item bills__item--cyan">
            <span className="bills__item-label">Due Soon</span>
            <span className="bills__item-amount">${dueTotal.toFixed(2)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
