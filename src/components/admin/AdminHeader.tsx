"use client";

import styles from "@/app/admin/dashboard/dashboard.module.css";
import { useState } from "react";

export default function AdminHeader() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className={styles.adminHeader}>
      <div />

      <div className={styles.headerActions}>
        {/* Notifications */}
        <button className={styles.notificationButton}>
          ♧
          <span>3</span>
        </button>

        {/* Admin Profile */}
        <div className={styles.adminProfileWrapper}>
          <button
            type="button"
            className={styles.adminProfile}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className={styles.avatar}>A</div>

            <span>Admin</span>

            <span>{showDropdown ? "⌃" : "⌄"}</span>
          </button>

          {/* Admin dropdown - NO LOGOUT */}
          {showDropdown && (
            <div className={styles.adminDropdown}>
              <div className={styles.adminDropdownInfo}>
                <strong>Admin</strong>
                <span>Administrator</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}