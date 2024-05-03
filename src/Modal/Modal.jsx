import styles from "../Modal/Modal.module.css"; // Import CSS Module

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <button className={styles["close-button"]} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
