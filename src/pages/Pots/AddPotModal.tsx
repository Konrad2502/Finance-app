import "./Pots.scss";
import CloseBtn from "../../assets/images/icon-close-modal.svg";
import Arrow from "../../assets/images/icon-caret-down.svg";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addPot, updatePot } from "../../features/potSlice/potSlice";
import { selectUsedThemesPot } from "../../features/potSlice/potSelectors";
import { useAppSelector } from "../../store/hooks";

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

type AddPotModalProps = {
  title: string;
  charMax: number;
  description: string;
  btnText: string;
  mode: "add" | "edit";
  closeModal: () => void;
  selectPot?: number;
};

export default function AddPotModal({
  title,
  charMax,
  description,
  btnText,
  closeModal,
  mode,
  selectPot,
}: AddPotModalProps) {
  const [potName, setPotName] = useState("");
  const [target, setTarget] = useState("");
  const [color, setColor] = useState<ColorOption>("green");
  const [openColor, setOpenColor] = useState<OpenColor>(null);
  const MAX_NAME = charMax;

  const colorRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const selectedColor = colorOptions.find((c) => c.value === color);

  const usedThemePot = useAppSelector(selectUsedThemesPot);
  const isTheme = (color: ColorOption) => usedThemePot.includes(color);

  const charsLeft = MAX_NAME - potName.length;

  const [nameError, setNameError] = useState<string | null>(null);
  const [targetError, setTargetError] = useState<string | null>(null);
  const [colorError, setColorError] = useState<string | null>(null);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const targetInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    const trimmedName = potName.trim();
    const targetNumber = Number(target);

    setNameError(null);
    setTargetError(null);

    if (!trimmedName) {
      setNameError("Pot name is required");
      nameInputRef.current?.focus();
      return;
    }

    if (!Number.isFinite(targetNumber) || targetNumber <= 0) {
      setTargetError("Please enter a valid amount");
      targetInputRef.current?.focus();
      return;
    }

    if (isTheme(color)) {
      setColorError("Color already selected");
      return;
    }

    if (mode === "add") {
      dispatch(
        addPot({
          name: potName.trim(),
          target: targetNumber,
          theme: color,
        })
      );
    }

    if (mode === "edit" && selectPot) {
      dispatch(
        updatePot({
          id: selectPot,
          name: potName.trim(),
          target: targetNumber,
          theme: color,
        })
      );
    }

    closeModal();
  };
  console.log(addPot);

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
            ref={nameInputRef}
            className={`pots-modal__input ${
              nameError ? "pots-modal__input--error" : ""
            }`}
            type="text"
            placeholder="e.g. Rainy Days"
            value={potName}
            maxLength={MAX_NAME}
            onChange={(e) => {
              setPotName(e.target.value);
              if (nameError) setNameError(null);
            }}
          />

          <div
            className={`pots-modal__hint ${
              nameError ? "pots-modal__hint--between" : ""
            }`}
          >
            {nameError && (
              <span className="pots-modal__error">{nameError}</span>
            )}
            <span> {charsLeft} characters left</span>
          </div>
        </div>

        {/* Target */}
        <div className="pots-modal__field">
          <label className="pots-modal__label" htmlFor="pot-target">
            Target
          </label>

          <div
            className={`pots-modal__money-input ${
              targetError ? "pots-modal__money-input--error" : ""
            }`}
          >
            <span className="pots-modal__currency">$</span>
            <input
              ref={targetInputRef}
              className="pots-modal__money"
              type="text"
              placeholder="e.g. 2000"
              value={target}
              onChange={(e) => {
                setTarget(e.target.value);
                if (targetError) setTargetError(null);
              }}
            />
          </div>
          {targetError && (
            <span className="pots-modal__error">{targetError}</span>
          )}
        </div>

        {/* Theme */}
        <div className="pots-modal__field">
          <label className="pots-modal__label">Theme</label>

          <div ref={colorRef} className="pots-dropdown">
            <button
              type="button"
              className={`pots-dropdown__btn ${
                colorError ? "pots-dropdown__btn--error" : ""
              }`}
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
                {colorOptions.map((opt) => {
                  const disable = isTheme(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`pots-dropdown__item ${
                        disable ? "pots-dropdown__item--disabled" : ""
                      }`}
                      onClick={() => {
                        if (disable) return;
                        setColor(opt.value);
                        setOpenColor(null);
                        if (colorError) setColorError(null);
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
          {colorError && (
            <span className="pots-modal__error">{colorError}</span>
          )}
        </div>

        <button
          type="button"
          className="pots-modal__submit"
          onClick={handleSubmit}
        >
          {btnText}
        </button>
      </div>
    </>
  );
}
