const trustItems = [
  {
    icon: "✓",
    title: "Licensed Professionals",
    description:
      "Every provider holds active local certifications.",
  },
  {
    icon: "◇",
    title: "100% Verified Identity",
    description:
      "Thorough background checks for premium security.",
  },
  {
    icon: "◎",
    title: "99.4% Fulfillment Rate",
    description:
      "Consistent results delivered to your doorstep.",
  },
];

export default function TrustFeatures() {
  return (
    <section
      className="trust-features"
      id="trust"
    >

      <div className="container trust-grid">

        {trustItems.map((item) => (
          <div
            className="trust-item"
            key={item.title}
          >

            <div className="trust-icon">
              {item.icon}
            </div>

            <div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}