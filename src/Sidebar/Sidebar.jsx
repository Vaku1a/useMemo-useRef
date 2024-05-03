// import { useState } from "react";
import styles from "../Sidebar/Sidebar.module.css";

export default function Sidebar({ isOpen, onClose, children }) {
  const sidebarClass = isOpen
    ? `${styles.sidebar} ${styles.open}`
    : styles.sidebar;

  return (
    <div className={sidebarClass}>
      <button className={styles["close-button"]} onClick={onClose}>
        &times;
      </button>
      {children}
    </div>
  );
}
