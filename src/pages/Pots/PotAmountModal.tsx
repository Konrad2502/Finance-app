import "./Pots.scss";
import CloseBtn from "../../assets/images/icon-close-modal.svg";
import { useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addMoney, withdrawMoney } from "../../features/potSlice/potSlice";

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
  selectPot?: number;
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
  selectPot,
}: PotAmountModalProps) {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState<string | null>(null);
  const amountInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const numberAmount = Number(amount);
    if (!Number.isFinite(numberAmount) || numberAmount <= 0) {
      setAmountError("Please enter a valid amount");
      amountInputRef.current?.focus();
      return;
    }

    if (variant === "add" && selectPot) {
      dispatch(
        addMoney({
          id: selectPot,
          amount: numberAmount,
        })
      );
    }
    if (variant === "withdraw" && selectPot) {
      dispatch(
        withdrawMoney({
          id: selectPot,
          amount: numberAmount,
        })
      );
    }

    setAmountError(null);
    closeModal();
  };

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
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="pot-amount-modal__meta">
            <span
              className={`pot-amount-modal__percent pot-amount-modal__percent--${variant}`}
            >
              {percent.toFixed(2)}%
            </span>
            <span className="pot-amount-modal__target">
              Target of ${target.toLocaleString("en-US")}
            </span>
          </div>
        </div>

        {/* INPUT */}
        <div className="pot-amount-modal__field">
          <label className="pot-amount-modal__field-label">{amountLabel}</label>

          <div
            className={`pot-amount-modal__money-input ${
              amountError ? "pot-amount-modal__money-input--error" : ""
            }`}
          >
            <span className="pot-amount-modal__currency">$</span>
            <input
              ref={amountInputRef}
              type="number"
              className="pot-amount-modal__input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 50"
            />
          </div>
          {amountError && (
            <span className="pots-modal__error">{amountError}</span>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="button"
          className="pot-amount-modal__submit"
          onClick={handleSubmit}
        >
          {buttonText}
        </button>
      </div>
    </>
  );
}
