import "./Bills.scss";
import { useEffect, useRef, useState } from "react";
import BillPaid from "../../assets/images/icon-bill-paid.svg";
import BillDue from "../../assets/images/icon-bill-due.svg";
import BillsIcon from "../../assets/images/icon-recurring-bills.svg";
import Arrow from "../../assets/images/icon-caret-down.svg";
import Avatar from "../../assets/images/avatars/ecofuel-energy.jpg";
import { CiSearch } from "react-icons/ci";

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

const mockBills = [
  {
    id: 1,
    name: "Spark Electric Solutions",
    due: "Monthly - 2nd",
    amount: "$100.00",
    status: "paid",
  },
  {
    id: 2,
    name: "Serenity Spa & Wellness",
    due: "Monthly - 3rd",
    amount: "$30.00",
    status: "paid",
  },
  {
    id: 3,
    name: "Elevate Education",
    due: "Monthly - 4th",
    amount: "$50.00",
    status: "paid",
  },
  {
    id: 4,
    name: "Pixel Playground",
    due: "Monthly - 11th",
    amount: "$10.00",
    status: "paid",
  },
  {
    id: 5,
    name: "Nimbus Data Storage",
    due: "Monthly - 21st",
    amount: "$9.99",
    status: "due",
  },
  {
    id: 6,
    name: "ByteWise",
    due: "Monthly - 23rd",
    amount: "$49.99",
    status: "due",
  },
  {
    id: 7,
    name: "EcoFuel Energy",
    due: "Monthly - 29th",
    amount: "$35.00",
    status: "normal",
  },
  {
    id: 8,
    name: "Aqua Flow Utilities",
    due: "Monthly - 30th",
    amount: "$100.00",
    status: "normal",
  },
];

export default function Bills() {
  const [sortValue, setSortValue] = useState<SortType>("Latest");
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
            <strong>$384.98</strong>
          </div>

          <div className="bills-summary-card">
            <h3>Summary</h3>

            <div className="bills-summary-row">
              <span>Paid Bills</span>
              <strong>4 ($190.00)</strong>
            </div>

            <div className="bills-summary-row">
              <span>Total Upcoming</span>
              <strong>4 ($194.98)</strong>
            </div>

            <div className="bills-summary-row bills-summary-row--danger">
              <span>Due Soon</span>
              <strong>2 ($59.98)</strong>
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
            {mockBills.map((bill) => (
              <li key={bill.id} className="bills-page__row">
                <div className="bills-page__bill">
                  <img src={Avatar} alt="" />
                  <span>{bill.name}</span>
                </div>

                <div className="bills-page__due">
                  <span>{bill.due}</span>
                  {bill.status === "paid" && <img src={BillPaid} alt="" />}
                  {bill.status === "due" && <img src={BillDue} alt="" />}
                </div>

                <strong
                  className={`bills-page__amount ${
                    bill.status === "due" ? "bills-page__amount--danger" : ""
                  }`}
                >
                  {bill.amount}
                </strong>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
