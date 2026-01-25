import "./Transactions.scss";
import Arrow from "../../assets/images/icon-caret-left.svg";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect, useRef, useMemo } from "react";

import { useAppSelector } from "../../store/hooks";
import { selectAllTransaction } from "../../features/appData/appDataSelectors";

const ITEMS_PER_PAGE = 10;

const sortOptions = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
] as const;

const categoryOptions = [
  "All Transactions",
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

type SortOption = (typeof sortOptions)[number];
type CategoryOption = (typeof categoryOptions)[number];
type DropdownType = "sort" | "category" | null;

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState<SortOption>("Latest");
  const [categoryValue, setCategoryValue] =
    useState<CategoryOption>("All Transactions");
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
  const [searchValue, setSearchValue] = useState("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const allTransactions = useAppSelector(selectAllTransaction);
  const filteredByCategory =
    categoryValue === "All Transactions"
      ? allTransactions
      : allTransactions.filter((item) => item.category === categoryValue);
  const filteredBySearch = filteredByCategory.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const sortedTransactions = useMemo(() => {
    return [...filteredBySearch].sort((a, b) => {
      switch (sortValue) {
        case "Latest":
          return +new Date(b.date) - +new Date(a.date);
        case "Oldest":
          return +new Date(a.date) - +new Date(b.date);
        case "A to Z":
          return a.name.localeCompare(b.name);
        case "Z to A":
          return b.name.localeCompare(a.name);
        case "Highest":
          return b.amount - a.amount;
        case "Lowest":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });
  }, [filteredBySearch, sortValue]);

  const totalPages = Math.ceil(sortedTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = sortedTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="transactions-page">
      <h1 className="transactions-page__title">Transactions</h1>

      <section className="transactions-page__card">
        {/* INPUTS */}
        <div className="transactions-page__inputs" ref={dropdownRef}>
          <div className="transactions-page__search">
            <input
              type="text"
              placeholder="Search transaction"
              className="transactions-page__search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <CiSearch className="transactions-page__search-icon" />
          </div>

          <div className="transactions-page__filters">
            {/* SORT */}
            <div className="transactions-page__dropdown">
              <span className="transactions-page__dropdown-label">Sort by</span>
              <button
                type="button"
                className="transactions-page__dropdown-btn"
                onClick={() =>
                  setOpenDropdown((p) => (p === "sort" ? null : "sort"))
                }
              >
                <span>{sortValue}</span>
                <img
                  src={Arrow}
                  alt=""
                  aria-hidden="true"
                  className={`transactions-page__dropdown-arrow ${
                    openDropdown === "sort"
                      ? "transactions-page__dropdown-arrow--open"
                      : ""
                  }`}
                />
              </button>

              {openDropdown === "sort" && (
                <div className="transactions-page__dropdown-menu">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`transactions-page__dropdown-item ${
                        opt === sortValue
                          ? "transactions-page__dropdown-item--active"
                          : ""
                      }`}
                      onClick={() => {
                        setSortValue(opt);
                        setOpenDropdown(null);
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CATEGORY */}
            <div className="transactions-page__dropdown">
              <span className="transactions-page__dropdown-label">
                Category
              </span>
              <button
                type="button"
                className="transactions-page__dropdown-btn"
                onClick={() =>
                  setOpenDropdown((p) => (p === "category" ? null : "category"))
                }
              >
                <span>{categoryValue}</span>
                <img
                  src={Arrow}
                  alt=""
                  aria-hidden="true"
                  className={`transactions-page__dropdown-arrow ${
                    openDropdown === "category"
                      ? "transactions-page__dropdown-arrow--open"
                      : ""
                  }`}
                />
              </button>

              {openDropdown === "category" && (
                <div className="transactions-page__dropdown-menu transactions-page__dropdown-menu--scroll">
                  {categoryOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`transactions-page__dropdown-item ${
                        opt === categoryValue
                          ? "transactions-page__dropdown-item--active"
                          : ""
                      }`}
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
        </div>

        {/* HEADER */}
        <div className="transactions-page__header">
          <span className="transactions-page__header-user">
            Recipient / Sender
          </span>
          <span className="transactions-page__header-category">Category</span>
          <span className="transactions-page__header-date">
            Transaction Date
          </span>
          <span className="transactions-page__header-amount">Amount</span>
        </div>

        {/* LIST */}

        <ul className="transactions-page__list">
          {currentItems.map((item) => {
            const isPositive = item.amount > 0;
            const sign = isPositive ? "+" : "-";
            const formatted = Math.abs(item.amount).toFixed(2);
            const formattedDate = new Date(item.date).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            );

            return (
              <li key={item.id} className="transactions-page__row">
                <div className="transactions-page__user">
                  <img
                    src={item.avatar}
                    alt=""
                    className="transactions-page__avatar"
                  />
                  <span className="transactions-page__name">{item.name}</span>
                </div>

                <span className="transactions-page__category">
                  {item.category}
                </span>
                <span className="transactions-page__date">{formattedDate}</span>

                <span
                  className={`transactions-page__amount ${
                    isPositive
                      ? "transactions-page__amount--positive"
                      : "transactions-page__amount--negative"
                  }`}
                >
                  {sign}${formatted}
                </span>
              </li>
            );
          })}
        </ul>

        {/* PAGINATION */}
        <div className="transactions-page__pagination">
          <button
            type="button"
            className="transactions-page__page-btn"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <img src={Arrow} alt="" aria-hidden="true" />
            <span>Prev</span>
          </button>

          <div className="transactions-page__pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`transactions-page__page-number ${
                  page === currentPage
                    ? "transactions-page__page-number--active"
                    : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="transactions-page__page-btn"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            <span>Next</span>
            <img
              src={Arrow}
              alt=""
              aria-hidden="true"
              className="transactions-page__page-arrow--next"
            />
          </button>
        </div>
      </section>
    </main>
  );
}
