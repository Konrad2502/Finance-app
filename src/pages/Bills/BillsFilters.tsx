import { CiSearch } from "react-icons/ci";
import Arrow from "../../assets/images/icon-caret-down.svg";
import { type SortOption } from "../../utils/helpers";
import { RiSortDesc } from "react-icons/ri";

type Props = {
  sortValue: SortOption;
  sortOptions: readonly SortOption[];
  onSortChange: (val: SortOption) => void;
  openDropdown: "active" | null;
  onToggleDropdown: (type: "active") => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;

  searchValue: string;
  onSearchChange: (val: string) => void;
};

export default function BillsFilters({
  sortValue,
  sortOptions,
  onSortChange,
  openDropdown,
  onToggleDropdown,
  dropdownRef,
  searchValue,
  onSearchChange,
}: Props) {
  return (
    <div className="bills-page__inputs" ref={dropdownRef}>
      <div className="bills-page__search">
        <input
          type="text"
          placeholder="Search bills"
          className="bills-page__search-input"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <CiSearch className="bills-page__search-icon" />
      </div>
      <div className="bills-page__sort">
        <span className="bills-page__sort-label">Sort by</span>

        {/* desktop/tablet */}
        <button
          type="button"
          className="bills-page__sort-btn bills-page__sort-btn--desktop"
          onClick={() => onToggleDropdown("active")}
          aria-expanded={openDropdown === "active"}
        >
          <span>{sortValue}</span>
          <img
            src={Arrow}
            alt=""
            aria-hidden="true"
            className={openDropdown === "active" ? "bills-page__rotate" : ""}
          />
        </button>

        {/* mobile icon-only */}
        <button
          type="button"
          className="bills-page__sort-btn bills-page__sort-btn--mobile"
          onClick={() => onToggleDropdown("active")}
          aria-label="Open sort options"
          aria-expanded={openDropdown === "active"}
        >
          <RiSortDesc className="bills-page__sort-icon" />
        </button>

        {openDropdown === "active" && (
          <div className="bills-page__dropdown">
            {sortOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`bills-page__dropdown-item ${
                  opt === sortValue ? "bills-page__dropdown-item--active" : ""
                }`}
                onClick={() => onSortChange(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
