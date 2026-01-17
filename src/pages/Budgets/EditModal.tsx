import "./Budgets.scss";
import CloseBtn from "../../assets/images/icon-close-modal.svg";
import Arrow from "../../assets/images/icon-caret-down.svg";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addBudget,
  updateBudget,
} from "../../features/budgetSlice/budgetSlice";
import {
  selectUsedCategories,
  selectUsedThemes,
} from "../../features/budgetSlice/budgetSelectors";

const categoryOptions = [
  "Entertainment",
  "Bills",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Personal Care",
  "Education",
  "Lifestyle",
  "Shopping",
  "General",
] as const;

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

type CategoryOption = (typeof categoryOptions)[number];
type ColorOption = (typeof colorOptions)[number]["value"];
type DropdownType = "category" | "color" | null;
type EditModalProps = {
  mode: "add" | "edit";
  title: string;
  text: string;
  closeModal: () => void;
  btnText: string;
  selectBudget?: number;
};

export default function EditModal({
  closeModal,
  title,
  text,
  btnText,
  mode,
  selectBudget,
}: EditModalProps) {
  const [categoryValue, setCategoryValue] =
    useState<CategoryOption>("Entertainment");
  const [colorValue, setColorValue] = useState<ColorOption>("green");
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
  const [maximum, setMaximum] = useState<number>(0);
  const [colorError, setColorError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const categoryRef = useRef<HTMLDivElement | null>(null);
  const colorRef = useRef<HTMLDivElement | null>(null);

  const [maxError, setMaxError] = useState<string | null>(null);
  const maxInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (isUsed(categoryValue)) {
      setCategoryError("Category already selected");
      return;
    }
    if (maximum <= 0) {
      setMaxError("Please enter a valid amount");
      maxInputRef.current?.focus();
      return;
    }
    if (isTheme(colorValue)) {
      setColorError("Color already selected");
      return;
    }
    if (mode === "add") {
      dispatch(
        addBudget({
          category: categoryValue,
          theme: colorValue,
          maximum,
        })
      );
    }
    if (mode === "edit" && selectBudget) {
      dispatch(
        updateBudget({
          id: selectBudget,
          changes: {
            category: categoryValue,
            theme: colorValue,
            maximum,
          },
        })
      );
    }

    closeModal();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;

      if (
        openDropdown === "category" &&
        categoryRef.current &&
        !categoryRef.current.contains(target)
      ) {
        setOpenDropdown(null);
      }

      if (
        openDropdown === "color" &&
        colorRef.current &&
        !colorRef.current.contains(target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const selectedColor = colorOptions.find((c) => c.value === colorValue);
  const usedCategories = useAppSelector(selectUsedCategories);
  const isUsed = (opt: CategoryOption) => usedCategories.includes(opt);
  const usedTheme = useAppSelector(selectUsedThemes);
  const isTheme = (color: ColorOption) => usedTheme.includes(color);

  return (
    <>
      {/* overlay */}
      <div className="budget-modal__overlay" />

      {/* modal */}
      <div className="budget-modal" role="dialog" aria-modal="true">
        <header className="budget-modal__header">
          <h2 className="budget-modal__title">{title}</h2>

          <button
            onClick={closeModal}
            type="button"
            className="budget-modal__close"
          >
            <img src={CloseBtn} alt="Close modal" />
          </button>
        </header>

        <p className="budget-modal__desc">{text}</p>

        {/* Budget Category */}
        <div className="budget-modal__field">
          <label className="budget-modal__label">Budget Category</label>

          <div ref={categoryRef} className="dropdown">
            <button
              type="button"
              className={`dropdown__btn ${
                categoryError ? "dropdown__btn--error" : ""
              }`}
              onClick={() => {
                setOpenDropdown((p) => (p === "category" ? null : "category"));
                setCategoryError(null);
              }}
            >
              <span className="dropdown__text">{categoryValue}</span>
              <img src={Arrow} alt="" aria-hidden="true" />
            </button>
            {categoryError && (
              <span className="budget-modal__error">{categoryError}</span>
            )}
            {openDropdown === "category" && (
              <div className="dropdown__menu">
                {categoryOptions.map((opt) => {
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
                        setCategoryValue(opt);
                        setOpenDropdown(null);
                      }}
                    >
                      {opt}
                      {disable && (
                        <span className="dropdown__tag"> Already used</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Maximum Spend*/}
        <div className="budget-modal__field">
          <label className="budget-modal__label">Maximum Spend</label>

          <div
            className={`budget-modal__money-input ${
              maxError ? "budget-modal__money-input--error" : ""
            }`}
          >
            <span className="budget-modal__currency">$</span>
            <input
              ref={maxInputRef}
              className="budget-modal__input "
              type="text"
              placeholder="e.g. 2000"
              value={maximum || ""}
              onChange={(e) => {
                setMaximum(Number(e.target.value));
                if (maxError) setMaxError(null);
              }}
            />
          </div>
          {maxError && <span className="budget-modal__error">{maxError}</span>}
        </div>

        {/* Theme */}
        <div className="budget-modal__field">
          <label className="budget-modal__label">Theme</label>

          <div ref={colorRef} className="dropdown">
            <button
              type="button"
              className={`dropdown__btn ${
                colorError ? "dropdown__btn--error" : ""
              }`}
              onClick={() => {
                setOpenDropdown((p) => (p === "color" ? null : "color"));
                setColorError(null);
              }}
            >
              <span className="dropdown__value">
                <span
                  className={`color-dot ${selectedColor?.className ?? ""}`}
                  aria-hidden="true"
                />
                <span className="dropdown__text">{selectedColor?.label}</span>
              </span>

              <img src={Arrow} alt="" aria-hidden="true" />
            </button>
            {colorError && (
              <span className="budget-modal__error">{colorError}</span>
            )}

            {openDropdown === "color" && (
              <div className="dropdown__menu">
                {colorOptions.map((opt) => {
                  const disable = isTheme(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`dropdown__item ${
                        disable ? "dropdown__item--disabled" : ""
                      }`}
                      onClick={() => {
                        if (disable) return;
                        setColorValue(opt.value);
                        setOpenDropdown(null);
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

        <button
          type="button"
          className="budget-modal__submit"
          onClick={handleSubmit}
        >
          {btnText}
        </button>
      </div>
    </>
  );
}
