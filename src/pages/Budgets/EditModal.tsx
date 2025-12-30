import "./Budgets.scss";
import CloseBtn from "../../assets/images/icon-close-modal.svg";
import Arrow from "../../assets/images/icon-caret-down.svg";
import { useEffect, useRef, useState } from "react";

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

export default function EditModal() {
  const [categoryValue, setCategoryValue] =
    useState<CategoryOption>("Entertainment");
  const [colorValue, setColorValue] = useState<ColorOption>("green");
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);

  const categoryRef = useRef<HTMLDivElement | null>(null);
  const colorRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <>
      {/* overlay */}
      <div className="budget-modal__overlay" />

      {/* modal */}
      <div className="budget-modal" role="dialog" aria-modal="true">
        <header className="budget-modal__header">
          <h2 className="budget-modal__title">Add New Budget</h2>

          <button type="button" className="budget-modal__close">
            <img src={CloseBtn} alt="Close modal" />
          </button>
        </header>

        <p className="budget-modal__desc">
          Choose a category to set a spending budget. These categories can help
          you monitor spending.
        </p>

        {/* Budget Category */}
        <div className="budget-modal__field">
          <label className="budget-modal__label">Budget Category</label>

          <div ref={categoryRef} className="dropdown">
            <button
              type="button"
              className="dropdown__btn"
              onClick={() =>
                setOpenDropdown((p) => (p === "category" ? null : "category"))
              }
            >
              <span className="dropdown__text">{categoryValue}</span>
              <img src={Arrow} alt="" aria-hidden="true" />
            </button>

            {openDropdown === "category" && (
              <div className="dropdown__menu">
                {categoryOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className="dropdown__item"
                    onClick={() => {
                      setCategoryValue(opt);
                      setOpenDropdown(null);
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Maximum Spend*/}
        <div className="budget-modal__field">
          <label className="budget-modal__label">Maximum Spend</label>

          <div className="budget-modal__money-input">
            <span className="budget-modal__currency">$</span>
            <input
              className="budget-modal__input"
              type="text"
              placeholder="e.g. 2000"
            />
          </div>
        </div>

        {/* Theme */}
        <div className="budget-modal__field">
          <label className="budget-modal__label">Theme</label>

          <div ref={colorRef} className="dropdown">
            <button
              type="button"
              className="dropdown__btn"
              onClick={() =>
                setOpenDropdown((p) => (p === "color" ? null : "color"))
              }
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

            {openDropdown === "color" && (
              <div className="dropdown__menu">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className="dropdown__item"
                    onClick={() => {
                      setColorValue(opt.value);
                      setOpenDropdown(null);
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

        <button type="button" className="budget-modal__submit">
          Add Budget
        </button>
      </div>
    </>
  );
}
