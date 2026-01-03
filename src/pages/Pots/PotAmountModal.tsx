import "./Pots.scss";
import CloseBtn from "../../assets/images/icon-close-modal.svg";
import { useState } from "react";

type PotAmountModalProps = {
  title: string;
  description: string;
  amountLabel: string;
  buttonText: string;
  percent: number;
  currentAmount: number;
  target: number;
  variant: "add" | "withdraw";
  closeModal: () => void;
};

export default function PotAmountModal({
  title,
  description,
  amountLabel,
  buttonText,
  percent,
  currentAmount,
  target,
  variant,
  closeModal,
}: PotAmountModalProps) {
  const [amount, setAmount] = useState("");

  const safePercent = Math.max(0, Math.min(100, percent));

  return (
    <>
      {/* overlay */}
      <div className="pot-amount-modal__overlay" />

      {/* modal */}
      <div className="pot-amount-modal" role="dialog" aria-modal="true">
        <header className="pot-amount-modal__header">
          <h2 className="pot-amount-modal__title">{title}</h2>

          <button
            onClick={closeModal}
            type="button"
            className="pot-amount-modal__close"
          >
            <img src={CloseBtn} alt="Close modal" />
          </button>
        </header>

        <p className="pot-amount-modal__desc">{description}</p>

        {/* AMOUNT INFO */}
        <div className="pot-amount-modal__top">
          <span className="pot-amount-modal__label">New Amount</span>
          <span className="pot-amount-modal__value">
            ${currentAmount.toFixed(2)}
          </span>
        </div>

        {/* PROGRESS */}
        <div className="pot-amount-modal__progress">
          <div className="pot-amount-modal__bar">
            <div
              className={`pot-amount-modal__bar-fill pot-amount-modal__bar-fill--${variant}`}
              style={{ width: `${safePercent}%` }}
            />
          </div>

          <div className="pot-amount-modal__meta">
            <span
              className={`pot-amount-modal__percent pot-amount-modal__percent--${variant}`}
            >
              {safePercent.toFixed(2)}%
            </span>
            <span className="pot-amount-modal__target">
              Target of ${target.toLocaleString("en-US")}
            </span>
          </div>
        </div>

        {/* INPUT */}
        <div className="pot-amount-modal__field">
          <label className="pot-amount-modal__field-label">{amountLabel}</label>

          <div className="pot-amount-modal__money-input">
            <span className="pot-amount-modal__currency">$</span>
            <input
              type="number"
              className="pot-amount-modal__input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        {/* SUBMIT */}
        <button type="button" className="pot-amount-modal__submit">
          {buttonText}
        </button>
      </div>
    </>
  );
}
