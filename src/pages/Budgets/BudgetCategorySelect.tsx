import Arrow from "../../assets/images/icon-caret-down.svg";
import React from "react";

type Props<T extends string> = {
  value: T;
  error: string | null;
  options: readonly T[];
  isUsed: (opt: T) => boolean;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (opt: T) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
};

export default function BudgetCategorySelect<T extends string>({
  value,
  error,
  options,
  isUsed,
  isOpen,
  onToggle,
  onSelect,
  dropdownRef,
}: Props<T>) {
  return (
    <div className="budget-modal__field">
      <label className="budget-modal__label">Budget Category</label>

      <div ref={dropdownRef} className="dropdown">
        <button
          type="button"
          className={`dropdown__btn ${error ? "dropdown__btn--error" : ""}`}
          onClick={onToggle}
        >
          <span className="dropdown__text">{value}</span>
          <img src={Arrow} alt="" aria-hidden="true" />
        </button>

        {error && <span className="budget-modal__error">{error}</span>}

        {isOpen && (
          <div className="dropdown__menu">
            {options.map((opt) => {
              const disable = isUsed(opt);

              return (
                <button
                  key={opt}
                  type="button"
                  className={`dropdown__item ${
                    disable ? "dropdown__item--disabled" : ""
                  }`}
                  onClick={() => {
                    if (disable) return;
                    onSelect(opt);
                  }}
                >
                  {opt}
                  {disable && (
                    <span className="dropdown__tag">Already used</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
