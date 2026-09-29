"use client";

import styles from "@/app/admin/dashboard/dashboard.module.css";

export default function AdminHeader() {
  return (
    <header className={styles.adminHeader}>

      <div />

      <div className={styles.headerActions}>

        <button className={styles.notificationButton}>
          ♧
          <span>3</span>
        </button>

        <div className={styles.adminProfile}>
          <div className={styles.avatar}>
            A
          </div>

          <span>Admin</span>

          <span>⌄</span>
        </div>

      </div>

    </header>
  );
}