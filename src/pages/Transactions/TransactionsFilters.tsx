import Arrow from "../../assets/images/icon-caret-left.svg";
import { CiSearch } from "react-icons/ci";
import { type SortOption, type CategoryOption } from "../../utils/helpers";

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;

  sortValue: SortOption;
  sortOptions: readonly SortOption[];
  onSortChange: (value: SortOption) => void;

  categoryValue: CategoryOption;
  categoryOptions: readonly CategoryOption[];
  onCategoryChange: (value: CategoryOption) => void;

  openDropdown: "sort" | "category" | null;
  onToggleDropdown: (type: "sort" | "category") => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
};

export default function TransactionsFilters({
  searchValue,
  onSearchChange,
  sortValue,
  sortOptions,
  onSortChange,
  categoryValue,
  categoryOptions,
  onCategoryChange,
  openDropdown,
  onToggleDropdown,
  dropdownRef,
}: Props) {
  return (
    <div className="transactions-page__inputs" ref={dropdownRef}>
      {/* SEARCH */}
      <div className="transactions-page__search">
        <input
          type="text"
          placeholder="Search transaction"
          className="transactions-page__search-input"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <CiSearch className="transactions-page__search-icon" />
      </div>

      {/* FILTERS */}
      <div className="transactions-page__filters">
        {/* SORT */}
        <div className="transactions-page__dropdown">
          <span className="transactions-page__dropdown-label">Sort by</span>
          <button
            type="button"
            className="transactions-page__dropdown-btn"
            onClick={() => onToggleDropdown("sort")}
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
                  onClick={() => onSortChange(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CATEGORY */}
        <div className="transactions-page__dropdown">
          <span className="transactions-page__dropdown-label">Category</span>
          <button
            type="button"
            className="transactions-page__dropdown-btn"
            onClick={() => onToggleDropdown("category")}
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
                  onClick={() => onCategoryChange(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
