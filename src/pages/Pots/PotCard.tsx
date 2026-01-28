// PotCard.tsx
import { type Pot } from "../../features/appData/appDataTypes";
import PotMenu from "./PotMenu";

const formatMoney = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

type Props = {
  pot: Pot;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAddMoney: () => void;
  onWithdraw: () => void;
};

export default function PotCard({
  pot,
  isMenuOpen,
  onToggleMenu,
  onEdit,
  onDelete,
  onAddMoney,
  onWithdraw,
}: Props) {
  const percent = pot.target > 0 ? (pot.total / pot.target) * 100 : 0;

  const safePercent = Math.max(0, Math.min(100, percent));

  return (
    <article className="pot-card">
      {/* HEADER */}
      <header className="pot-card__header">
        <div className="pot-card__title">
          <span className={`pot-card__dot pot-card__dot--${pot.theme}`} />
          <h3 className="pot-card__name">{pot.name}</h3>
        </div>

        <PotMenu
          isOpen={isMenuOpen}
          onToggle={onToggleMenu}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </header>

      {/* CONTENT */}
      <div className="pots-card__wrapper">
        <div className="pot-card__top">
          <span className="pot-card__label">Total Saved</span>
          <span className="pot-card__amount">${formatMoney(pot.total)}</span>
        </div>

        {/* BAR */}
        <div className="pot-card__bar">
          <div
            className={`pot-card__bar-fill pot-card__bar-fill--${pot.theme}`}
            style={{ width: `${safePercent}%` }}
          />
        </div>

        {/* META */}
        <div className="pot-card__meta">
          <span className="pot-card__percent">{safePercent.toFixed(1)}%</span>
          <span className="pot-card__target">
            Target of ${pot.target.toLocaleString("en-US")}
          </span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="pot-card__actions">
        <button type="button" className="pot-card__action" onClick={onAddMoney}>
          + Add Money
        </button>

        <button type="button" className="pot-card__action" onClick={onWithdraw}>
          Withdraw
        </button>
      </div>
    </article>
  );
}
