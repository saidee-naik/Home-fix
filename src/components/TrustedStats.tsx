const stats = [
  {
    icon: "🔧",
    value: "1,000+",
    label: "Customers Served",
  },
  {
    icon: "◇",
    value: "500+",
    label: "Services Completed",
  },
  {
    icon: "✓",
    value: "100+",
    label: "Verified Professionals",
  },
  {
    icon: "★",
    value: "4.8★",
    label: "Average Customer Rating",
  },
  {
    icon: "◎",
    value: "98%",
    label: "Customer Satisfaction",
  },
];

export default function TrustedStats() {
  return (
    <section className="trusted-section">

      <div className="container">

        <div className="section-heading">

          <span className="section-label">
            TRUSTED BY HOMEOWNERS
          </span>

          <h2>
            Trusted by homeowners across Goa
          </h2>

          <p>
            Verified local professionals. Simple pricing. Direct contact.
          </p>

        </div>

        <div className="stats-grid">

          {stats.map((stat) => (
            <div
              className="stat"
              key={stat.label}
            >

              <div className="stat-icon">
                {stat.icon}
              </div>

              <strong>
                {stat.value}
              </strong>

              <span>
                {stat.label}
              </span>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}