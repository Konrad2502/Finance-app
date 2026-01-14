import "./Budgets.scss";
import { useEffect, useRef, useState } from "react";
import DotsIcon from "../../assets/images/icon-ellipsis.svg";
import ArrowRight from "../../assets/images/icon-caret-right.svg";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { useAppSelector } from "../../store/hooks";
import { budgetsWithTransactions } from "../../features/budgetSlice/budgetSelectors";
import { useNavigate } from "react-router-dom";
import { deleteBudget } from "../../features/budgetSlice/budgetSlice";
import { useAppDispatch } from "../../store/hooks";

type BudgetAction = number | null;
type ModalType = "delete" | "edit" | "add" | null;

export default function Budgets() {
  const [openMenu, setOpenMenu] = useState<BudgetAction>(null);
  const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const confirmDelete = () => {
    if (selectedBudgetId !== null) {
      dispatch(deleteBudget(selectedBudgetId));
    }
    console.log(selectedBudgetId);

    setSelectedBudgetId(null);
    setOpenModal(null);
  };
  /* close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const [openModal, setOpenModal] = useState<ModalType>(null);

  const openEditModal = (type: ModalType) => {
    setOpenModal(type);
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
  console.log(items, totalLimit, totalSpent);

  const selectBudget = items.find(
    (b) => b.budget.id === selectedBudgetId
  )?.budget;
  console.log(selectBudget);

  const donutGradient = items
    .reduce<{
      parts: string[];
      offset: number;
    }>(
      (acc, { budget }) => {
        if (budget.maximum <= 0 || totalLimit <= 0) return acc;

        const percent = (budget.maximum / totalLimit) * 100;
        const start = acc.offset;
        const end = start + percent;

        acc.parts.push(`var(--${budget.theme}) ${start}% ${end}%`);

        acc.offset = end;
        return acc;
      },
      { parts: [], offset: 0 }
    )
    .parts.join(", ");

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
        <div className="budgets-summary">
          <div
            className="budgets-summary__chart"
            style={{
              background: `conic-gradient(${donutGradient})`,
            }}
          >
            <div className="budgets-summary__chart-inner">
              <p className="budgets-summary__amount">
                ${totalSpent.toFixed(0)}
              </p>
              <p className="budgets-summary__label">
                of ${totalLimit.toFixed(0)} limit
              </p>
            </div>
          </div>

          <h3 className="budgets-summary__title">Spending Summary</h3>

          <ul className="budgets-summary__list">
            {items.map(({ budget, spent }) => (
              <li
                key={budget.id}
                className={`budgets-summary__item budgets-summary__item--${budget.theme}`}
              >
                <span>{budget.category}</span>
                <div className="budgets-summary__wrapper">
                  <strong>${spent.toFixed(2)}</strong>
                  <span>of ${budget.maximum.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT – BUDGET CARDS */}
        <div className="budgets-list">
          {items.map(
            ({ budget, spent, remaining, progress, recentTransactions }) => (
              <article key={budget.id} className="budget-card">
                {/* HEADER */}
                <header className="budget-card__header">
                  <div className="budget-card__title">
                    <span
                      className={`budget-card__dot budget-card__dot--${budget.theme}`}
                    />
                    <h3 className="budget-card__name">{budget.category}</h3>
                  </div>

                  <div
                    className="budget-card__menu"
                    ref={menuRef}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="budget-card__menu-btn"
                      onClick={() =>
                        setOpenMenu((prev) =>
                          prev === budget.id ? null : budget.id
                        )
                      }
                    >
                      <img src={DotsIcon} alt="" aria-hidden="true" />
                    </button>

                    {openMenu === budget.id && (
                      <div className="budget-card__menu-dropdown">
                        <button
                          type="button"
                          className="budget-card__menu-item"
                          onClick={() => {
                            setSelectedBudgetId(budget.id);
                            openEditModal("edit");
                          }}
                        >
                          Edit Budget
                        </button>

                        <button
                          type="button"
                          className="budget-card__menu-item budget-card__menu-item--danger"
                          onClick={() => openDeleteModal(budget.id)}
                        >
                          Delete Budget
                        </button>
                      </div>
                    )}
                  </div>
                </header>

                <p className="budget-card__limit">
                  Maximum of ${budget.maximum.toFixed(2)}
                </p>

                {/* BAR */}
                <div className="budget-card__bar">
                  <div
                    className={`budget-card__bar-fill budget-card__bar-fill--${budget.theme}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* STATS */}
                <div className="budget-card__stats">
                  <div
                    className={`budget-card__stat budget-card__stat--${budget.theme}`}
                  >
                    <span className="budget-card__stat-label">Spent</span>
                    <strong>${spent.toFixed(2)}</strong>
                  </div>

                  <div className="budget-card__stat">
                    <span className="budget-card__stat-label">Remaining</span>
                    <strong>${remaining.toFixed(2)}</strong>
                  </div>
                </div>

                {/* LATEST */}
                <div className="budget-card__latest">
                  <div className="budget-card__latest-header">
                    <h4>Latest Spending</h4>

                    <button
                      onClick={() => navigate("/transactions")}
                      type="button"
                    >
                      <span>See All</span>
                      <img src={ArrowRight} alt="" aria-hidden="true" />
                    </button>
                  </div>

                  <ul className="budget-card__transactions">
                    {recentTransactions.map((tr) => {
                      const isPositive = tr.amount > 0;
                      const sign = isPositive ? "+" : "-";
                      const formattedAmount = Math.abs(tr.amount).toFixed(2);
                      const formattedDate = new Date(
                        tr.date
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });

                      return (
                        <li key={tr.id} className="budget-card__transaction">
                          <div className="budget-card__transaction-left">
                            <img
                              src={tr.avatar}
                              alt={tr.name}
                              className="budget-card__avatar"
                            />
                            <span className="budget-card__transaction-name">
                              {tr.name}
                            </span>
                          </div>

                          <div className="budget-card__transaction-right">
                            <span className="budget-card__transaction-amount">
                              {sign}${formattedAmount}
                            </span>
                            <span className="budget-card__transaction-date">
                              {formattedDate}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
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
