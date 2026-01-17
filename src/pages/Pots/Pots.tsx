// Pots.tsx
import "./Pots.scss";
import DotsIcon from "../../assets/images/icon-ellipsis.svg";
import { useState, useEffect, useRef } from "react";

import DeleteModalPots from "./DeleteModalPots";
import AddPotModal from "./AddPotModal";
import PotAmountModal from "./PotAmountModal";
import { useAppSelector } from "../../store/hooks";
import { selectPots } from "../../features/potSlice/potSelectors";
import { useAppDispatch } from "../../store/hooks";
import { deletePot } from "../../features/potSlice/potSlice";
// type PotColor =
//   | "green"
//   | "navy"
//   | "cyan"
//   | "yellow"
//   | "red"
//   | "purple"
//   | "turquoise"
//   | "brown"
//   | "magenta"
//   | "blue"
//   | "army-green"
//   | "gold"
//   | "orange";

const formatMoney = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

type ModalType =
  | "addPot"
  | "deletePot"
  | "editPot"
  | "addMoney"
  | "withdrawMoney"
  | null;

export default function Pots() {
  type PotAction = number | null;
  const [openMenu, setOpenMenu] = useState<PotAction>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [selectPotId, setSelectPotId] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  const confirmDeletePot = () => {
    if (selectPotId !== null) {
      dispatch(deletePot(selectPotId));
    }
    setSelectPotId(null);
    setOpenModal(null);
  };

  const pots = useAppSelector(selectPots);
  console.log();

  const selectPot = pots.find((p) => p.id === selectPotId);
  console.log(selectPot);

  const closeModalHandle = () => setOpenModal(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <main className="pots-page">
      <div className="pots-page__heading">
        <h1 className="pots-page__title">Pots</h1>

        <button
          onClick={() => setOpenModal("addPot")}
          className="pots-page__btn"
          type="button"
        >
          <span className="pots-page__btnIcon">+</span>
          <span className="pots-page__btnText">Add New Pot</span>
        </button>
      </div>

      <section className="pots-page__content">
        {pots.map((pot) => {
          const percent = pot.target > 0 ? (pot.total / pot.target) * 100 : 0;
          const safePercent = Math.max(0, Math.min(100, percent));

          return (
            <article key={pot.id} className="pot-card">
              {/* header */}
              <header className="pot-card__header">
                <div className="pot-card__title">
                  <span
                    className={`pot-card__dot pot-card__dot--${pot.theme}`}
                  />
                  <h3 className="pot-card__name">{pot.name}</h3>
                </div>

                <div
                  className="pot-card__menu"
                  ref={menuRef}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="pot-card__menu-btn"
                    onClick={() => {
                      setOpenMenu((prev) => (prev === pot.id ? null : pot.id));
                      setSelectPotId(pot.id);
                    }}
                  >
                    <img src={DotsIcon} alt="" aria-hidden="true" />
                  </button>

                  {openMenu === pot.id && (
                    <div className="pot-card__menu-dropdown">
                      <button
                        onClick={() => {
                          setOpenModal("editPot");
                        }}
                        type="button"
                        className="pot-card__menu-item"
                      >
                        Edit Pot
                      </button>

                      <button
                        type="button"
                        className="pot-card__menu-item pot-card__menu-item--danger"
                        onClick={() => setOpenModal("deletePot")}
                      >
                        Delete Pot
                      </button>
                    </div>
                  )}
                </div>
              </header>

              {/* totals */}
              <div className="pots-card__wrapper">
                <div className="pot-card__top">
                  <div className="pot-card__label">Total Saved</div>
                  <div className="pot-card__amount">
                    ${formatMoney(pot.total)}
                  </div>
                </div>

                {/* bar */}
                <div className="pot-card__bar">
                  <div
                    className={`pot-card__bar-fill pot-card__bar-fill--${pot.theme}`}
                    style={{ width: `${safePercent}%` }}
                  />
                </div>

                {/* bottom numbers */}
                <div className="pot-card__meta">
                  <span className="pot-card__percent">
                    {safePercent.toFixed(1)}%
                  </span>
                  <span className="pot-card__target">
                    Target of ${pot.target.toLocaleString("en-US")}
                  </span>
                </div>
              </div>
              {/* actions */}
              <div className="pot-card__actions">
                <button
                  type="button"
                  className="pot-card__action"
                  onClick={() => setOpenModal("addMoney")}
                >
                  + Add Money
                </button>
                <button
                  type="button"
                  className="pot-card__action"
                  onClick={() => setOpenModal("withdrawMoney")}
                >
                  Withdraw
                </button>
              </div>
            </article>
          );
        })}
      </section>
      {openModal === "deletePot" && (
        <DeleteModalPots
          confirmDeletePot={confirmDeletePot}
          closeModal={closeModalHandle}
        />
      )}
      {openModal === "addPot" && (
        <AddPotModal
          mode="add"
          charMax={30}
          description=" Create a pot to set savings targets. These can help keep you on track
          as you save for special purchases."
          title="Add New Pot"
          btnText="Add Pot"
          closeModal={closeModalHandle}
        />
      )}
      {openModal === "editPot" && selectPot && (
        <AddPotModal
          selectPot={selectPot.id}
          mode="edit"
          charMax={30}
          description="If your savings targets change, feel free to update your pots"
          title="Edit Pot"
          btnText="Save Changes"
          closeModal={closeModalHandle}
        />
      )}
      {openModal === "addMoney" && (
        <PotAmountModal
          title="Add to Savings"
          description="Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.
"
          amountLabel="Amount to Add"
          buttonText="Confirm Addition"
          percent={27.95}
          currentAmount={559}
          target={2000}
          variant="add"
          closeModal={closeModalHandle}
        />
      )}
      {openModal === "withdrawMoney" && (
        <PotAmountModal
          title="Withdraw from Savings"
          description=" Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot."
          amountLabel="Amount to Withdraw"
          buttonText="Confirm Withdrawal"
          percent={24}
          currentAmount={334}
          target={2000}
          variant="withdraw"
          closeModal={closeModalHandle}
        />
      )}
    </main>
  );
}
