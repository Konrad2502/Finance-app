import Arrow from "../../assets/images/icon-caret-left.svg";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function TransactionsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="transactions-page__pagination">
      <button
        type="button"
        className="transactions-page__page-btn"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      >
        <img src={Arrow} alt="" aria-hidden="true" />
        <span>Prev</span>
      </button>

      <div className="transactions-page__pages">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
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
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
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
  );
}
