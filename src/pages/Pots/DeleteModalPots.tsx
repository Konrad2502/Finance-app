import "./Pots.scss";
import CloseBtn from "../../assets/images/icon-close-modal.svg";

type DeleteModalProps = {
  closeModal: () => void;
  confirmDeletePot: () => void;
};

export default function DeleteModalPots({
  closeModal,
  confirmDeletePot,
}: DeleteModalProps) {
  return (
    <div className="delete-modal">
      {/* BACKDROP */}
      <div className="delete-modal__overlay" />

      {/* CONTENT */}
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
          Are you sure you want to delete this pots? This action cannot be
          reversed, and all the data inside it will be removed forever.
        </p>

        <button
          onClick={confirmDeletePot}
          className="delete-modal__confirm"
          type="button"
        >
          Yes, Confirm Deletion
        </button>

        <button
          onClick={closeModal}
          className="delete-modal__cancel"
          type="button"
        >
          No, Go Back
        </button>
      </div>
    </div>
  );
}
