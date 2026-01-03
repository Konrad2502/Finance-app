import "./Pots.scss";
import CloseBtn from "../../assets/images/icon-close-modal.svg";
import Arrow from "../../assets/images/icon-caret-down.svg";
import { useEffect, useRef, useState } from "react";

const colorOptions = [
  { value: "green", label: "Green", className: "color-dot--green" },
  { value: "yellow", label: "Yellow", className: "color-dot--yellow" },
  { value: "cyan", label: "Cyan", className: "color-dot--cyan" },
  { value: "navy", label: "Navy", className: "color-dot--navy" },
  { value: "red", label: "Red", className: "color-dot--red" },
  { value: "purple", label: "Purple", className: "color-dot--purple" },
  { value: "turquoise", label: "Turquoise", className: "color-dot--turquoise" },
  { value: "brown", label: "Brown", className: "color-dot--brown" },
  { value: "magenta", label: "Magenta", className: "color-dot--magenta" },
  { value: "blue", label: "Blue", className: "color-dot--blue" },
  {
    value: "army-green",
    label: "Army green",
    className: "color-dot--army-green",
  },
  { value: "gold", label: "Gold", className: "color-dot--gold" },
  { value: "orange", label: "Orange", className: "color-dot--orange" },
] as const;

type ColorOption = (typeof colorOptions)[number]["value"];
type OpenColor = "active" | null;

// type AddPotModalProps = {
//   closeModal: () => void;
// };

type AddPotModalProps = {
  title: string;
  charMax: number;
  description: string;
  btnText: string;
  closeModal: () => void;
};

export default function AddPotModal({
  title,
  charMax,
  description,
  btnText,
  closeModal,
}: AddPotModalProps) {
  const [potName, setPotName] = useState("");
  const [target, setTarget] = useState("");
  const [color, setColor] = useState<ColorOption>("green");
  const [openColor, setOpenColor] = useState<OpenColor>(null);
  const MAX_NAME = charMax;

  const colorRef = useRef<HTMLDivElement | null>(null);

  const selectedColor = colorOptions.find((c) => c.value === color);

  const charsLeft = MAX_NAME - potName.length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof Node)) return;

      if (
        openColor === "active" &&
        colorRef.current &&
        !colorRef.current.contains(t)
      ) {
        setOpenColor(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openColor]);

  return (
    <>
      <div className="pots-modal__overlay" />

      <div className="pots-modal" role="dialog" aria-modal="true">
        <header className="pots-modal__header">
          <h2 className="pots-modal__title">{title}</h2>

          <button
            type="button"
            className="pots-modal__close"
            onClick={closeModal}
          >
            <img src={CloseBtn} alt="Close modal" />
          </button>
        </header>

        <p className="pots-modal__desc">{description}</p>

        {/* Pot Name */}
        <div className="pots-modal__field">
          <label className="pots-modal__label" htmlFor="pot-name">
            Pot Name
          </label>

          <input
            id="pot-name"
            className="pots-modal__input"
            type="text"
            placeholder="e.g. Rainy Days"
            value={potName}
            maxLength={MAX_NAME}
            onChange={(e) => setPotName(e.target.value)}
          />

          <div className="pots-modal__hint">{charsLeft} characters left</div>
        </div>

        {/* Target */}
        <div className="pots-modal__field">
          <label className="pots-modal__label" htmlFor="pot-target">
            Target
          </label>

          <div className="pots-modal__money-input">
            <span className="pots-modal__currency">$</span>
            <input
              id="pot-target"
              className="pots-modal__money"
              type="text"
              placeholder="e.g. 2000"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>
        </div>

        {/* Theme */}
        <div className="pots-modal__field">
          <label className="pots-modal__label">Theme</label>

          <div ref={colorRef} className="pots-dropdown">
            <button
              type="button"
              className="pots-dropdown__btn"
              onClick={() =>
                setOpenColor((p) => (p === "active" ? null : "active"))
              }
            >
              <span className="pots-dropdown__value">
                <span
                  className={`color-dot ${selectedColor?.className ?? ""}`}
                  aria-hidden="true"
                />
                <span className="pots-dropdown__text">
                  {selectedColor?.label}
                </span>
              </span>

              <img src={Arrow} alt="" aria-hidden="true" />
            </button>

            {openColor === "active" && (
              <div className="pots-dropdown__menu">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className="pots-dropdown__item"
                    onClick={() => {
                      setColor(opt.value);
                      setOpenColor(null);
                    }}
                  >
                    <span
                      className={`color-dot ${opt.className}`}
                      aria-hidden="true"
                    />
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button type="button" className="pots-modal__submit">
          {btnText}
        </button>
      </div>
    </>
  );
}
