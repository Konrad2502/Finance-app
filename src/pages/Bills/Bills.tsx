import "./Bills.scss";
import { useEffect, useRef, useState } from "react";
import BillPaid from "../../assets/images/icon-bill-paid.svg";
import BillDue from "../../assets/images/icon-bill-due.svg";
import BillsIcon from "../../assets/images/icon-recurring-bills.svg";
import Arrow from "../../assets/images/icon-caret-down.svg";
import { CiSearch } from "react-icons/ci";
import { useAppSelector } from "../../store/hooks";
import {
  selectRecurringBills,
  selectBillsSummary,
} from "../../features/appData/appDataSelectors";
import { useMemo } from "react";

const sortOptions = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
] as const;

type SortType = (typeof sortOptions)[number];
type DropdownType = "active" | null;

export default function Bills() {
  const [sortValue, setSortValue] = useState<SortType>("Latest");
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
  const [searchValue, setSearchValue] = useState("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const bills = useAppSelector(selectRecurringBills);
  const summary = useAppSelector(selectBillsSummary);
  console.log(bills, summary);
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
      {/* HEADER */}
      <h1 className="bills-page__title">Recurring Bills</h1>

      <section className="bills-page__content">
        {/* LEFT */}
        <aside className="bills-page__left">
          <div className="bills-summary">
            <img src={BillsIcon} alt="" aria-hidden="true" />
            <span>Total Bills</span>
            <strong>${total}</strong>
          </div>

          <div className="bills-summary-card">
            <h3>Summary</h3>

            <div className="bills-summary-row">
              <span>Paid Bills</span>
              <strong>
                {paidCount} (${paidTotal.toFixed(2)})
              </strong>
            </div>

            <div className="bills-summary-row">
              <span>Total Upcoming</span>
              <strong>
                {upcomingCount}(${upcomingTotal.toFixed(2)})
              </strong>
            </div>

            <div className="bills-summary-row bills-summary-row--danger">
              <span>Due Soon</span>
              <strong>
                {dueCount} (${dueTotal.toFixed(2)})
              </strong>
            </div>
          </div>
        </aside>

        {/* RIGHT */}
        <div className="bills-page__right">
          {/* INPUTS */}
          <div className="bills-page__inputs" ref={dropdownRef}>
            <div className="bills-page__search">
              <input
                type="text"
                placeholder="Search bills"
                className="bills-page__search-input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <CiSearch className="bills-page__search-icon" />
            </div>

            <div className="bills-page__sort">
              <span>Sort by</span>
              <button
                type="button"
                className="bills-page__sort-btn"
                onClick={() =>
                  setOpenDropdown((p) => (p === "active" ? null : "active"))
                }
              >
                <span>{sortValue}</span>
                <img
                  src={Arrow}
                  alt=""
                  aria-hidden="true"
                  className={
                    openDropdown === "active" ? "bills-page__rotate" : ""
                  }
                />
              </button>

              {openDropdown === "active" && (
                <div className="bills-page__dropdown">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`bills-page__dropdown-item ${
                        opt === sortValue
                          ? "bills-page__dropdown-item--active"
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
          </div>

          {/* LIST */}
          <ul className="bills-page__list">
            {sortedBills.map((bill) => (
              <li key={bill.id} className="bills-page__row">
                <div className="bills-page__bill">
                  <img src={bill.avatar} alt="" />
                  <span>{bill.name}</span>
                </div>

                <div className="bills-page__due">
                  <span>{bill.dueText}</span>
                  {bill.status === "paid" && <img src={BillPaid} alt="" />}
                  {bill.status === "due" && <img src={BillDue} alt="" />}
                </div>

                <strong
                  className={`bills-page__amount ${
                    bill.status === "due" ? "bills-page__amount--danger" : ""
                  }`}
                >
                  {bill.amountFormatted}
                </strong>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
