const reasons = [
  {
    icon: "✓",
    title: "Verified Professionals",
    description:
      "Connect with professionals whose identity and credentials have been verified.",
  },
  {
    icon: "⌾",
    title: "Local to Goa",
    description:
      "Find trusted service providers who understand your local area and needs.",
  },
  {
    icon: "☎",
    title: "Direct Contact",
    description:
      "Speak directly with professionals without complicated booking processes.",
  },
  {
    icon: "₹",
    title: "Transparent Service",
    description:
      "Understand the service you need before getting started with your project.",
  },
];

export default function WhyHomeFix() {
  return (
    <section className="why-section">

      <div className="container why-container">

        <div className="why-content">

          <span className="section-label">
            WHY HOMEFIX
          </span>

          <h2>
            A simpler way to get
            <br />
            things done at home.
          </h2>

          <p className="why-intro">
            HomeFix connects homeowners with reliable local
            professionals so you can find the right person
            for the job with confidence.
          </p>

          <div className="why-list">

            {reasons.map((reason) => (
              <div
                className="why-item"
                key={reason.title}
              >

                <div className="why-icon">
                  {reason.icon}
                </div>

                <div>

                  <h3>
                    {reason.title}
                  </h3>

                  <p>
                    {reason.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        <div className="why-visual">

          <div className="visual-card main-visual">

            <div className="visual-icon">
              🔧
            </div>

            <div className="visual-title">
              Trusted Professional
            </div>

            <div className="visual-rating">
              <span>★★★★★</span>
              <span>4.9</span>
            </div>

            <div className="verified-badge">
              ✓ Verified
            </div>

          </div>

          <div className="floating-card floating-one">
            <strong>100+</strong>
            <span>Verified Professionals</span>
          </div>

          <div className="floating-card floating-two">
            <strong>4.8 ★</strong>
            <span>Average Rating</span>
          </div>

        </div>

      </div>

    </section>
  );
}