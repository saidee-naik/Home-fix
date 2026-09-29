"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/components/admin/adminsidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import ProviderRequestsTable from "@/components/admin/ProviderRequestsTable";

import styles from "./dashboard.module.css";

interface ProviderStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [stats, setStats] = useState<ProviderStats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/providers/stats", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (response.status === 401) {
          router.push("/admin/login");
          return;
        }

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch statistics");
        }

        setStats(data.stats);
      } catch (error) {
        console.error("Dashboard stats error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [router]);

  return (
    <div className={styles.adminLayout}>

      <AdminSidebar />

      <div className={styles.dashboardArea}>

        <AdminHeader />

        <main className={styles.dashboardContent}>

          <div className={styles.pageIntro}>

            <div>
              <span>Admin Dashboard</span>

              <h1>
                Welcome back, Admin
              </h1>

              <p>
                Manage provider registrations and keep
                HomeFix safe and trusted.
              </p>
            </div>

            <div className={styles.dateCard}>
              <span>▣</span>

              <div>
                <small>Today</small>
                <strong>23 Sep 2026</strong>
              </div>
            </div>

          </div>

          <section className={styles.statsGrid}>

            <StatCard
              title="Total Providers"
              value={stats.total}
              change="Live"
              description="from database"
              icon="♙"
              type="blue"
            />

            <StatCard
              title="Pending Requests"
              value={stats.pending}
              change="Live"
              description="from database"
              icon="◷"
              type="yellow"
            />

            <StatCard
              title="Approved Providers"
              value={stats.approved}
              change="Live"
              description="from database"
              icon="✓"
              type="green"
            />

            <StatCard
              title="Rejected Providers"
              value={stats.rejected}
              change="Live"
              description="from database"
              icon="×"
              type="red"
            />

          </section>

          <ProviderRequestsTable />

        </main>

      </div>

    </div>
  );
}