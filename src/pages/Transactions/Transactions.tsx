import "./Transactions.scss";
import Arrow from "../../assets/images/icon-caret-left.svg";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect, useRef } from "react";
import Avatar from "../../assets/images/avatars/aqua-flow-utilities.jpg";

const ITEMS_PER_PAGE = 10;

type DropdownType = "sort" | "category" | null;
type SortOption = (typeof sortOptions)[number];
type CategoryOption = (typeof categoryOptions)[number];

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

const mockTransactions = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  category: "General",
  date: "19 Aug 2024",
  amount: i % 2 === 0 ? "+$75.50" : "-$42.30",
}));

export default function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState<SortOption>("Latest");
  const [categoryValue, setCategoryValue] =
    useState<CategoryOption>("All Transactions");
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* pagination */
  const totalPages = Math.ceil(mockTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = mockTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* close dropdown on outside click */
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
    <main className="transactions">
      <h1 className="transactions__title">Transactions</h1>

      <section className="transactions__card">
        <div className="transactions__inputs" ref={dropdownRef}>
          <div className="transactions__search">
            <input
              type="text"
              placeholder="Search transaction"
              className="transactions__search-input"
            />
            <CiSearch className="transactions__search-icon" />
          </div>
          <div className="transactions__filters">
            <div className="transactions__dropdown">
              <span className="transactions__dropdown-label">Sort by</span>
              <button
                type="button"
                className="transactions__dropdown-btn"
                onClick={() =>
                  setOpenDropdown((p) => (p === "sort" ? null : "sort"))
                }
              >
                <span>{sortValue}</span>
                <img
                  src={Arrow}
                  alt=""
                  aria-hidden="true"
                  className={`transactions__dropdown-arrow ${
                    openDropdown === "sort"
                      ? "transactions__dropdown-arrow--open"
                      : ""
                  }`}
                />
              </button>

              {openDropdown === "sort" && (
                <div className="transactions__dropdown-menu">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`transactions__dropdown-item ${
                        opt === sortValue
                          ? "transactions__dropdown-item--active"
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
            <div className="transactions__dropdown">
              <span className="transactions__dropdown-label">Category</span>
              <button
                type="button"
                className="transactions__dropdown-btn"
                onClick={() =>
                  setOpenDropdown((p) => (p === "category" ? null : "category"))
                }
              >
                <span>{categoryValue}</span>
                <img
                  src={Arrow}
                  alt=""
                  aria-hidden="true"
                  className={`transactions__dropdown-arrow ${
                    openDropdown === "category"
                      ? "transactions__dropdown-arrow--open"
                      : ""
                  }`}
                />
              </button>

              {openDropdown === "category" && (
                <div className="transactions__dropdown-menu transactions__dropdown-menu--scroll">
                  {categoryOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`transactions__dropdown-item ${
                        opt === categoryValue
                          ? "transactions__dropdown-item--active"
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
        <div className="transactions__header">
          <span className="transactions__header-user">Recipient / Sender</span>
          <span className="transactions__header-category">Category</span>
          <span className="transactions__header-date">Transaction Date</span>
          <span className="transactions__header-amount">Amount</span>
        </div>

        {/* LIST */}
        <ul className="transactions__list">
          {currentItems.map((item) => (
            <li key={item.id} className="transactions__row">
              <div className="transactions__user">
                <img src={Avatar} alt="" className="transactions__avatar" />
                <span className="transactions__name">{item.name}</span>
              </div>

              <span className="transactions__category">{item.category}</span>
              <span className="transactions__date">{item.date}</span>

              <span
                className={`transactions__amount ${
                  item.amount.startsWith("+")
                    ? "transactions__amount--positive"
                    : "transactions__amount--negative"
                }`}
              >
                {item.amount}
              </span>
            </li>
          ))}
        </ul>

        {/* PAGINATION */}
        <div className="transactions__pagination">
          <button
            type="button"
            className="transactions__page-btn"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <img src={Arrow} alt="" aria-hidden="true" />
            <span>Prev</span>
          </button>

          <div className="transactions__pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`transactions__page-number ${
                  page === currentPage
                    ? "transactions__page-number--active"
                    : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="transactions__page-btn"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            <span>Next</span>
            <img
              src={Arrow}
              alt=""
              aria-hidden="true"
              className="transactions__page-arrow--next"
            />
          </button>
        </div>
      </section>
    </main>
  );
}
