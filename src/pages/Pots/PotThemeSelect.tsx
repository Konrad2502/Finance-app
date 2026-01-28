import Arrow from "../../assets/images/icon-caret-down.svg";

type ColorOption<T extends string> = {
  value: T;
  label: string;
  className: string;
};

type PotThemeSelectProps<T extends string> = {
  selected: ColorOption<T> | undefined;
  options: readonly ColorOption<T>[];
  error: string | null;
  isUsed: (color: T) => boolean;
  isOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onToggle: () => void;
  onSelect: (color: T) => void;
};

export default function PotThemeSelect<T extends string>({
  selected,
  options,
  error,
  isUsed,
  isOpen,
  dropdownRef,
  onToggle,
  onSelect,
}: PotThemeSelectProps<T>) {
  return (
    <div className="pots-modal__field">
      <label className="pots-modal__label">Theme</label>

      <div ref={dropdownRef} className="pots-dropdown">
        <button
          type="button"
          className={`pots-dropdown__btn ${
            error ? "pots-dropdown__btn--error" : ""
          }`}
          onClick={onToggle}
        >
          <span className="pots-dropdown__value">
            <span
              className={`color-dot ${selected?.className ?? ""}`}
              aria-hidden="true"
            />
            <span className="pots-dropdown__text">{selected?.label}</span>
          </span>

          <img src={Arrow} alt="" aria-hidden="true" />
        </button>

        {isOpen && (
          <div className="pots-dropdown__menu">
            {options.map((opt) => {
              const disable = isUsed(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`pots-dropdown__item ${
                    disable ? "pots-dropdown__item--disabled" : ""
                  }`}
                  onClick={() => {
                    if (disable) return;
                    onSelect(opt.value);
                  }}
                >
                  <div className="wrapper">
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

      {error && <span className="pots-modal__error">{error}</span>}
    </div>
  );
}
