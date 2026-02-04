import "./Bills.scss";
import { useEffect, useRef, useState, useMemo } from "react";
import { useAppSelector } from "../../store/hooks";
import {
  selectRecurringBills,
  selectBillsSummary,
} from "../../features/appData/appDataSelectors";

import BillsSummary from "./BillsSummary";
import BillsFilters from "./BillsFilters";
import BillsList from "./BillsList";

import { sortOptions, type SortOption } from "../../utils/helpers";
import type { Bill } from "./BillsList";

type DropdownType = "active" | null;

export default function Bills() {
  const [sortValue, setSortValue] = useState<SortOption>("Latest");
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
  const [searchValue, setSearchValue] = useState("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const bills = useAppSelector(selectRecurringBills);
  const summary = useAppSelector(selectBillsSummary);

  const {
    total,
    paidTotal,
    paidCount,
    upcomingCount,
    upcomingTotal,
    dueCount,
    dueTotal,
  } = summary;

  const billsBySearch = bills.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const sortedBills = useMemo(() => {
    return [...billsBySearch].sort((a, b) => {
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
  }, [billsBySearch, sortValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;

      if (
        openDropdown === "active" &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  return (
    <main className="bills-page">
      <h1 className="bills-page__title">Recurring Bills</h1>

      <section className="bills-page__content">
        <aside className="bills-page__left">
          <BillsSummary
            total={total}
            paidCount={paidCount}
            paidTotal={paidTotal}
            upcomingCount={upcomingCount}
            upcomingTotal={upcomingTotal}
            dueCount={dueCount}
            dueTotal={dueTotal}
          />
        </aside>

        <div className="bills-page__right">
          <BillsFilters
            sortValue={sortValue}
            sortOptions={sortOptions}
            onSortChange={(val) => {
              setSortValue(val);
              setOpenDropdown(null);
            }}
            openDropdown={openDropdown}
            onToggleDropdown={(type) =>
              setOpenDropdown((p) => (p === type ? null : type))
            }
            dropdownRef={dropdownRef}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />

          <BillsList bills={sortedBills as Bill[]} />
        </div>
      </section>
    </main>
  );
}
