import "./Budgets.scss";
import CloseBtn from "../../assets/images/icon-close-modal.svg";
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

import BudgetCategorySelect from "./BudgetCategorySelect";
import BudgetThemeSelect from "./BudgetThemeSelect";
import BudgetAmountInput from "./BudgetAmountInput";
import {
  categoryOptions,
  colorOptions,
  type CategoryOption,
  type ColorOption,
} from "../../utils/helpers";

type DropdownType = "category" | "color" | null;

type EditModalProps = {
  mode: "add" | "edit";
  title: string;
  text: string;
  closeModal: () => void;
  btnText: string;
  selectBudget?: number;
};

/* ===== COMPONENT ===== */

export default function EditModal({
  closeModal,
  title,
  text,
  btnText,
  mode,
  selectBudget,
}: EditModalProps) {
  const dispatch = useAppDispatch();

  /* ===== STATE ===== */

  const [categoryValue, setCategoryValue] =
    useState<CategoryOption>("Entertainment");
  const [colorValue, setColorValue] = useState<ColorOption>("green");
  const [maximum, setMaximum] = useState<number>(0);

  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);

  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [colorError, setColorError] = useState<string | null>(null);
  const [maxError, setMaxError] = useState<string | null>(null);

  /* ===== REFS ===== */

  const categoryRef = useRef<HTMLDivElement | null>(null);
  const colorRef = useRef<HTMLDivElement | null>(null);
  const maxInputRef = useRef<HTMLInputElement | null>(null);

  /* ===== SELECTORS ===== */

  const usedCategories = useAppSelector(selectUsedCategories);
  const usedThemes = useAppSelector(selectUsedThemes);

  const selectedColor = colorOptions.find((c) => c.value === colorValue);

  const isCategoryUsed = (opt: CategoryOption) => usedCategories.includes(opt);

  const isThemeUsed = (color: ColorOption) => usedThemes.includes(color);

  const handleSubmit = () => {
    if (isCategoryUsed(categoryValue)) {
      setCategoryError("Category already selected");
      return;
    }

    if (maximum <= 0) {
      setMaxError("Please enter a valid amount");
      maxInputRef.current?.focus();
      return;
    }

    if (isThemeUsed(colorValue)) {
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

  /* ===== OUTSIDE CLICK ===== */

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

  return (
    <>
      <div className="budget-modal__overlay" />
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
        <BudgetCategorySelect
          value={categoryValue}
          error={categoryError}
          options={categoryOptions}
          isUsed={isCategoryUsed}
          isOpen={openDropdown === "category"}
          onToggle={() => {
            setOpenDropdown((p) => (p === "category" ? null : "category"));
            setCategoryError(null);
          }}
          onSelect={(opt: CategoryOption) => {
            setCategoryValue(opt);
            setOpenDropdown(null);
          }}
          dropdownRef={categoryRef}
        />
        <BudgetAmountInput
          value={maximum}
          error={maxError}
          inputRef={maxInputRef}
          onChange={(val) => {
            setMaximum(val);
            if (maxError) setMaxError(null);
          }}
        />
        <BudgetThemeSelect
          selected={selectedColor}
          options={colorOptions}
          error={colorError}
          isUsed={isThemeUsed}
          isOpen={openDropdown === "color"}
          onToggle={() => {
            setOpenDropdown((p) => (p === "color" ? null : "color"));
            setColorError(null);
          }}
          onSelect={(color) => {
            setColorValue(color);
            setOpenDropdown(null);
          }}
          dropdownRef={colorRef}
        />

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
