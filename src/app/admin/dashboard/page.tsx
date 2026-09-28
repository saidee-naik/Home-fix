import AdminSidebar from "@/components/admin/adminsidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import ProviderRequestsTable from "@/components/admin/ProviderRequestsTable";

import styles from "./dashboard.module.css";

export default function AdminDashboardPage() {
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
              value={243}
              change="↑ +12%"
              description="from last month"
              icon="♙"
              type="blue"
            />

            <StatCard
              title="Pending Requests"
              value={23}
              change="↑ +5%"
              description="from last week"
              icon="◷"
              type="yellow"
            />

            <StatCard
              title="Approved Providers"
              value={196}
              change="↑ +18%"
              description="from last month"
              icon="✓"
              type="green"
            />

            <StatCard
              title="Rejected Providers"
              value={24}
              change="↑ +2%"
              description="from last month"
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