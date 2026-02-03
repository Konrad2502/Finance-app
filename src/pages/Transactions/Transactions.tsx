import "./Transactions.scss";
import { useState, useEffect, useRef, useMemo } from "react";

import { useAppSelector } from "../../store/hooks";
import { selectAllTransaction } from "../../features/appData/appDataSelectors";

import TransactionsFilters from "./TransactionsFilters";
import TransactionsList from "./TransactionsList";
import TransactionsPagination from "./TransactionsPagination";
import {
  sortOptions,
  categoryOptions,
  type SortOption,
  type CategoryOption,
} from "../../utils/helpers";

const ITEMS_PER_PAGE = 10;

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
        {/* FILTERS */}
        <TransactionsFilters
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          sortValue={sortValue}
          sortOptions={sortOptions}
          onSortChange={(val) => {
            setSortValue(val);
            setOpenDropdown(null);
          }}
          categoryValue={categoryValue}
          categoryOptions={categoryOptions}
          onCategoryChange={(val) => {
            setCategoryValue(val);
            setOpenDropdown(null);
          }}
          openDropdown={openDropdown}
          onToggleDropdown={(type) =>
            setOpenDropdown((p) => (p === type ? null : type))
          }
          dropdownRef={dropdownRef}
        />

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
        <TransactionsList items={currentItems} />

        {/* PAGINATION */}
        <TransactionsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </main>
  );
}
