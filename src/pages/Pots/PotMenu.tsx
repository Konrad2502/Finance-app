// PotMenu.tsx
import DotsIcon from "../../assets/images/icon-ellipsis.svg";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function PotMenu({ isOpen, onToggle, onEdit, onDelete }: Props) {
  return (
    <div className="pot-card__menu" onClick={(e) => e.stopPropagation()}>
      <button type="button" className="pot-card__menu-btn" onClick={onToggle}>
        <img src={DotsIcon} alt="" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="pot-card__menu-dropdown">
          <button
            type="button"
            className="pot-card__menu-item"
            onClick={onEdit}
          >
            Edit Pot
          </button>

          <button
            type="button"
            className="pot-card__menu-item pot-card__menu-item--danger"
            onClick={onDelete}
          >
            Delete Pot
          </button>
        </div>
      )}
    </div>
  );
}
