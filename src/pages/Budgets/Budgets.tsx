import "./Budgets.scss";
import { useState } from "react";

import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { useAppSelector } from "../../store/hooks";
import { budgetsWithTransactions } from "../../features/budgetSlice/budgetSelectors";
import { useNavigate } from "react-router-dom";
import { deleteBudget } from "../../features/budgetSlice/budgetSlice";
import { useAppDispatch } from "../../store/hooks";
import BudgetsSummary from "./BudgetsSummary";
import BudgetCard from "./BudgetCard";

type BudgetAction = number | null;
type ModalType = "delete" | "edit" | "add" | null;

export default function Budgets() {
  const [openMenu, setOpenMenu] = useState<BudgetAction>(null);
  const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const confirmDelete = () => {
    if (selectedBudgetId !== null) {
      dispatch(deleteBudget(selectedBudgetId));
    }
    setSelectedBudgetId(null);
    setOpenModal(null);
  };

  const openDeleteModal = (id: number) => {
    setSelectedBudgetId(id);
    setOpenModal("delete");
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  const { items, totalSpent, totalLimit } = useAppSelector(
    budgetsWithTransactions
  );

  const selectBudget = items.find(
    (b) => b.budget.id === selectedBudgetId
  )?.budget;

  return (
    <main className="budgets-page">
      {/* HEADER */}
      <div className="budgets-page__heading">
        <h1 className="budgets-page__title">Budgets</h1>

        <button
          onClick={() => setOpenModal("add")}
          className="budgets-page__btn"
          type="button"
        >
          <span className="budgets-page__btnIcon">+</span>
          <span className="budgets-page__btnText">Add New Budget</span>
        </button>
      </div>

      {/* CONTENT */}
      <section className="budgets-page__content">
        {/* LEFT – SUMMARY */}
        <BudgetsSummary
          items={items}
          totalSpent={totalSpent}
          totalLimit={totalLimit}
        />

        {/* RIGHT – BUDGET CARDS */}
        <div className="budgets-list">
          {items.map(
            ({ budget, spent, remaining, progress, recentTransactions }) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                spent={spent}
                remaining={remaining}
                progress={progress}
                recentTransactions={recentTransactions}
                isMenuOpen={openMenu === budget.id}
                onToggleMenu={() =>
                  setOpenMenu((prev) => (prev === budget.id ? null : budget.id))
                }
                onEdit={() => {
                  setSelectedBudgetId(budget.id);
                  setOpenModal("edit");
                }}
                onDelete={() => openDeleteModal(budget.id)}
                onNavigateTransactions={() => navigate("/transactions")}
              />
            )
          )}
        </div>
      </section>

      {openModal === "delete" && (
        <DeleteModal closeModal={closeModal} confirmDelete={confirmDelete} />
      )}
      {openModal === "add" && (
        <EditModal
          btnText="Add Budget"
          mode="add"
          title="Add New Budget"
          text="Choose a category to set a spending budget.These categories can help you monitor spending"
          closeModal={closeModal}
        />
      )}
      {openModal === "edit" && selectBudget && (
        <EditModal
          selectBudget={selectBudget.id}
          btnText="Edit Budget"
          mode="edit"
          title="Edit Budget"
          text="As your budget change, feel free to update your spending limit"
          closeModal={closeModal}
        />
      )}
    </main>
  );
}
