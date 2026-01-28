// Pots.tsx
import "./Pots.scss";
import { useState, useEffect, useRef } from "react";
import DeleteModalPots from "./DeleteModalPots";
import AddPotModal from "./AddPotModal";
import PotAmountModal from "./PotAmountModal";
import { useAppSelector } from "../../store/hooks";
import { selectPots } from "../../features/potSlice/potSelectors";
import { useAppDispatch } from "../../store/hooks";
import { deletePot } from "../../features/potSlice/potSlice";
import PotCard from "./PotCard";

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

  const selectPot = pots.find((p) => p.id === selectPotId);

  const percent =
    selectPot && selectPot.target > 0
      ? (selectPot.total / selectPot.target) * 100
      : 0;

  const safePercent = Math.max(0, Math.min(100, percent));

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
        {pots.map((pot) => (
          <PotCard
            key={pot.id}
            pot={pot}
            isMenuOpen={openMenu === pot.id}
            onToggleMenu={() => {
              setOpenMenu((p) => (p === pot.id ? null : pot.id));
              setSelectPotId(pot.id);
            }}
            onEdit={() => setOpenModal("editPot")}
            onDelete={() => setOpenModal("deletePot")}
            onAddMoney={() => {
              setSelectPotId(pot.id);
              setOpenModal("addMoney");
            }}
            onWithdraw={() => {
              setSelectPotId(pot.id);
              setOpenModal("withdrawMoney");
            }}
          />
        ))}
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
      {openModal === "addMoney" && selectPot && (
        <PotAmountModal
          title="Add to Savings"
          description="Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.
"
          amountLabel="Amount to Add"
          buttonText="Confirm Addition"
          percent={safePercent}
          currentAmount={selectPot.total}
          target={selectPot.target}
          variant="add"
          closeModal={closeModalHandle}
          selectPot={selectPot.id}
        />
      )}
      {openModal === "withdrawMoney" && selectPot && (
        <PotAmountModal
          title="Withdraw from Savings"
          description=" Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot."
          amountLabel="Amount to Withdraw"
          buttonText="Confirm Withdrawal"
          percent={safePercent}
          currentAmount={selectPot.total}
          target={selectPot.target}
          variant="withdraw"
          closeModal={closeModalHandle}
          selectPot={selectPot.id}
        />
      )}
    </main>
  );
}
