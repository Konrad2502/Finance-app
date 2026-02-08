import "./Budgets.scss";
import CloseBtn from "../../assets/images/icon-close-modal.svg";

type DeleteModalProps = {
  closeModal: () => void;
  confirmDelete: () => void;
};

export default function DeleteModal({
  closeModal,
  confirmDelete,
}: DeleteModalProps) {
  return (
    <div className="delete-modal">
      <div className="delete-modal__overlay" />
      <div className="delete-modal__content" role="dialog" aria-modal="true">
        <button
          className="delete-modal__close"
          type="button"
          aria-label="Close modal"
          onClick={closeModal}
        >
          <img src={CloseBtn} alt="" aria-hidden="true" />
        </button>

        <h2 className="delete-modal__title">Delete</h2>

        <p className="delete-modal__text">
          Are you sure you want to delete this budget? This action cannot be
          reversed, and all the data inside it will be removed forever.
        </p>

        <button
          className="delete-modal__confirm"
          type="button"
          onClick={confirmDelete}
        >
          Yes, Confirm Deletion
        </button>

        <button
          className="delete-modal__cancel"
          type="button"
          onClick={closeModal}
        >
          No, Go Back
        </button>
      </div>
    </div>
  );
}
