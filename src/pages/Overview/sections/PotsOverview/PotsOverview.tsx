import NextArrow from "../../../../assets/images/icon-caret-right.svg";
import PotIcon from "../../../../assets/images/icon-pot.svg";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
import {
  selectPots,
  selectPotsTotal,
} from "../../../../features/potSlice/potSelectors";

export default function PotsOverview() {
  const navigate = useNavigate();

  const pots = useAppSelector(selectPots);
  const totalPots = useAppSelector(selectPotsTotal);

  return (
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
        <div className="pots__total">
          <img
            className="pots__total-icon"
            src={PotIcon}
            alt=""
            aria-hidden="true"
          />
          <div className="pots__total-text">
            <p className="pots__total-label">Total Saved</p>
            <p className="pots__total-amount">${totalPots.toFixed(2)}</p>
          </div>
        </div>
        <ul className="pots__list">
          {pots.map((pot) => (
            <li key={pot.id} className={`pots__item pots__item--${pot.theme}`}>
              <span className="pots__item-label">{pot.name}</span>
              <span className="pots__item-amount">${pot.total.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
