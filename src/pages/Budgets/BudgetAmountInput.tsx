type Props = {
  value: number;
  error: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (value: number) => void;
};

export default function BudgetAmountInput({
  value,
  error,
  inputRef,
  onChange,
}: Props) {
  return (
    <div className="budget-modal__field">
      <label className="budget-modal__label">Maximum Spend</label>

      <div
        className={`budget-modal__money-input ${
          error ? "budget-modal__money-input--error" : ""
        }`}
      >
        <span className="budget-modal__currency">$</span>
        <input
          ref={inputRef}
          className="budget-modal__input"
          type="text"
          placeholder="e.g. 2000"
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>

      {error && <span className="budget-modal__error">{error}</span>}
    </div>
  );
}
