import { useEffect, useRef } from "react";
import DotsIcon from "../../assets/images/icon-ellipsis.svg";

type BudgetMenuProps = {
  isOpen: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
};

export default function BudgetMenu({
  isOpen,
  onToggle,
  onEdit,
  onDelete,
  onClose,
}: BudgetMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div ref={menuRef} className="budget-card__menu">
      <button
        type="button"
        className="budget-card__menu-btn"
        onClick={onToggle}
      >
        <img src={DotsIcon} alt="" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="budget-card__menu-dropdown">
          <button
            type="button"
            className="budget-card__menu-item"
            onClick={onEdit}
          >
            Edit Budget
          </button>

          <button
            type="button"
            className="budget-card__menu-item budget-card__menu-item--danger"
            onClick={onDelete}
          >
            Delete Budget
          </button>
        </div>
      )}
    </div>
  );
}
