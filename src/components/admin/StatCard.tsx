import styles from "@/app/admin/dashboard/dashboard.module.css";

type StatCardProps = {
  title: string;
  value: number;
  change: string;
  description: string;
  icon: string;
  type: "blue" | "yellow" | "green" | "red";
};

export default function StatCard({
  title,
  value,
  change,
  description,
  icon,
  type,
}: StatCardProps) {
  return (
    <div className={`${styles.statCard} ${styles[type]}`}>

      <div className={styles.statIcon}>
        {icon}
      </div>

      <div className={styles.statInformation}>
        <span>{title}</span>

        <strong>{value}</strong>

        <p>
          <b>{change}</b> {description}
        </p>
      </div>

    </div>
  );
}