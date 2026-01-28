import Arrow from "../../assets/images/icon-caret-down.svg";

type ColorOption<T extends string> = {
  value: T;
  label: string;
  className: string;
};

type Props<T extends string> = {
  selected: ColorOption<T> | undefined;
  options: readonly ColorOption<T>[];
  error: string | null;
  isUsed: (color: T) => boolean;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (color: T) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
};

export default function BudgetThemeSelect<T extends string>({
  selected,
  options,
  error,
  isUsed,
  isOpen,
  onToggle,
  onSelect,
  dropdownRef,
}: Props<T>) {
  return (
    <div className="budget-modal__field">
      <label className="budget-modal__label">Theme</label>

      <div ref={dropdownRef} className="dropdown">
        <button
          type="button"
          className={`dropdown__btn ${error ? "dropdown__btn--error" : ""}`}
          onClick={onToggle}
        >
          <span className="dropdown__value">
            <span
              className={`color-dot ${selected?.className ?? ""}`}
              aria-hidden="true"
            />
            <span className="dropdown__text">{selected?.label}</span>
          </span>

          <img src={Arrow} alt="" aria-hidden="true" />
        </button>

        {error && <span className="budget-modal__error">{error}</span>}

        {isOpen && (
          <div className="dropdown__menu">
            {options.map((opt) => {
              const disable = isUsed(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`dropdown__item ${
                    disable ? "dropdown__item--disabled" : ""
                  }`}
                  onClick={() => {
                    if (disable) return;
                    onSelect(opt.value);
                  }}
                >
                  <div className="span-wrapper">
                    <span
                      className={`color-dot ${opt.className}`}
                      aria-hidden="true"
                    />
                    <span>{opt.label}</span>
                  </div>

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
