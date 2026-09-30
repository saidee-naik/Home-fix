"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "@/app/admin/dashboard/dashboard.module.css";

const menuItems = [
  {
    label: "Dashboard",
    icon: "⌂",
    href: "/admin/dashboard",
  },
  {
    label: "Provider Requests",
    icon: "♙",
    href: "/admin/dashboard?section=requests",
    badge: 12,
  },
  {
    label: "All Providers",
    icon: "☷",
    href: "/admin/dashboard?section=providers",
  },
  {
    label: "Approved Providers",
    icon: "✓",
    href: "/admin/dashboard?section=approved",
  },
  {
    label: "Rejected Providers",
    icon: "×",
    href: "/admin/dashboard?section=rejected",
  },
];

const bottomItems = [
  {
    label: "Categories",
    icon: "▦",
  },
  {
    label: "Analytics",
    icon: "▥",
  },
  {
    label: "Settings",
    icon: "⚙",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className={styles.sidebar}>

      <div className={styles.brand}>
        <div className={styles.brandIcon}>
          🔧
        </div>

        <div>
          <strong>HomeFix</strong>
          <span>Admin Portal</span>
        </div>
      </div>

      <nav className={styles.sideNavigation}>

        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={
              pathname === "/admin/dashboard" &&
              item.label === "Dashboard"
                ? `${styles.navItem} ${styles.activeNav}`
                : styles.navItem
            }
          >
            <span className={styles.navIcon}>
              {item.icon}
            </span>

            <span>{item.label}</span>

            {item.badge && (
              <span className={styles.navBadge}>
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        <div className={styles.sidebarDivider} />

        {bottomItems.map((item) => (
          <button
            key={item.label}
            className={styles.navItem}
          >
            <span className={styles.navIcon}>
              {item.icon}
            </span>

            <span>{item.label}</span>
          </button>
        ))}

      </nav>

      {/* Logout */}
      <button
        type="button"
        className={styles.logout}
        onClick={handleLogout}
      >
        <span>⇥</span>
        Logout
      </button>

    </aside>
  );
}