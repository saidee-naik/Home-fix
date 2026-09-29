import styles from "@/app/admin/dashboard/dashboard.module.css";

type ProviderRequest = {
  id: number;
  company: string;
  image: string;
  experience: number;
  category: string;
  location: string;
  phone: string;
  email: string;
  appliedOn: string;
  time: string;
  status: "Pending" | "Approved" | "Rejected";
};

const providerRequests: ProviderRequest[] = [
  {
    id: 1,
    company: "Apex Plumbing Services",
    image: "/images/providers/provider-1.jpg",
    experience: 8,
    category: "Plumbing",
    location: "Austin, TX",
    phone: "(512) 555-0147",
    email: "contact@apexplumbing.com",
    appliedOn: "Mar 18, 2024",
    time: "2 hours ago",
    status: "Pending",
  },
  {
    id: 2,
    company: "BrightWire Electrical",
    image: "/images/providers/provider-2.jpg",
    experience: 12,
    category: "Electrical",
    location: "Denver, CO",
    phone: "(303) 555-0182",
    email: "hello@brightwire.com",
    appliedOn: "Mar 17, 2024",
    time: "1 day ago",
    status: "Approved",
  },
  {
    id: 3,
    company: "Sparkle Clean Co.",
    image: "/images/providers/provider-3.jpg",
    experience: 5,
    category: "Cleaning",
    location: "Seattle, WA",
    phone: "(206) 555-0131",
    email: "team@sparkleclean.com",
    appliedOn: "Mar 16, 2024",
    time: "2 days ago",
    status: "Pending",
  },
  {
    id: 4,
    company: "CoolAir HVAC",
    image: "/images/providers/provider-4.jpg",
    experience: 10,
    category: "HVAC",
    location: "Phoenix, AZ",
    phone: "(602) 555-0164",
    email: "service@coolairhvac.com",
    appliedOn: "Mar 15, 2024",
    time: "3 days ago",
    status: "Rejected",
  },
  {
    id: 5,
    company: "Perfect Finish Painting",
    image: "/images/providers/provider-5.jpg",
    experience: 7,
    category: "Painting",
    location: "Chicago, IL",
    phone: "(312) 555-0198",
    email: "info@perfectfinish.com",
    appliedOn: "Mar 14, 2024",
    time: "4 days ago",
    status: "Pending",
  },
];

export default function ProviderRequestsTable() {
  return (
    <section className={styles.requestsCard}>

      <div className={styles.requestsHeader}>

        <div>
          <h2>Recent Provider Requests</h2>

          <p>
            Review and manage new provider registrations.
          </p>
        </div>

        <div className={styles.requestActions}>
          <button className={styles.addButton}>
            + Add Provider
          </button>

          <button className={styles.viewAllButton}>
            View All →
          </button>
        </div>

      </div>

      <div className={styles.tableControls}>

        <select defaultValue="all">
          <option value="all">
            All Status
          </option>

          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        <select defaultValue="all">
          <option value="all">
            All Categories
          </option>

          <option>Plumbing</option>
          <option>Electrical</option>
          <option>Cleaning</option>
          <option>HVAC</option>
          <option>Painting</option>
        </select>

        <input
          type="text"
          placeholder="Search by name, email, or location..."
        />

        <button>
          ⇅ Sort: Newest
        </button>

      </div>

      <div className={styles.tableWrapper}>

        <table>

          <thead>
            <tr>
              <th>Provider</th>
              <th>Category</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Applied On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {providerRequests.map((provider: (typeof providerRequests)[number]) => (
              <tr key={provider.id}>

                <td>
                  <div className={styles.providerCell}>

                    <img
                      src={provider.image}
                      alt={provider.company}
                    />

                    <div>
                      <strong>
                        {provider.company}
                      </strong>

                      <span>
                        {provider.experience} years experience
                      </span>
                    </div>

                  </div>
                </td>

                <td>
                  <span
                    className={`${styles.categoryBadge} ${
                      styles[
                        provider.category.toLowerCase()
                      ]
                    }`}
                  >
                    {provider.category}
                  </span>
                </td>

                <td>
                  📍 {provider.location}
                </td>

                <td>
                  <div className={styles.contactCell}>
                    <span>☎ {provider.phone}</span>
                    <span>✉ {provider.email}</span>
                  </div>
                </td>

                <td>
                  <strong>
                    {provider.appliedOn}
                  </strong>

                  <span className={styles.time}>
                    {provider.time}
                  </span>
                </td>

                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      provider.status === "Pending"
                        ? styles.pending
                        : provider.status === "Approved"
                        ? styles.approved
                        : styles.rejected
                    }`}
                  >
                    {provider.status}
                  </span>
                </td>

                <td>
                  <div className={styles.actions}>

                    <button>
                      View
                    </button>

                    {provider.status === "Pending" && (
                      <>
                        <button
                          className={styles.approve}
                        >
                          ✓
                        </button>

                        <button
                          className={styles.reject}
                        >
                          ×
                        </button>
                      </>
                    )}

                  </div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <div className={styles.tableFooter}>

        <span>
          Showing 1 to 5 of 23 providers
        </span>

        <div>
          <button>‹</button>
          <button className={styles.pageActive}>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>›</button>
        </div>

      </div>

    </section>
  );
}