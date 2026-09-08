const steps = [
  {
    number: "01",
    icon: "⌕",
    title: "Search Service",
    description:
      "Tell us what service you need and your location to find matching professionals nearby.",
  },
  {
    number: "02",
    icon: "◇",
    title: "Compare Profiles",
    description:
      "Browse professional profiles, credentials, specialties, ratings, and experience.",
  },
  {
    number: "03",
    icon: "☎",
    title: "Direct Contact",
    description:
      "Contact the professional directly and discuss your project, requirements, and pricing.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="how-section"
      id="how-it-works"
    >

      <div className="container">

        <div className="section-heading">

          <span className="section-label">
            SIMPLE PROCESS
          </span>

          <h2>
            How HomeFix Works
          </h2>

          <p>
            Get your home projects done in three simple steps.
          </p>

        </div>

        <div className="steps-grid">

          {steps.map((step, index) => (
            <div
              className="step"
              key={step.number}
            >

              <div className="step-top">

                <div className="step-number">
                  {step.number}
                </div>

                {index < steps.length - 1 && (
                  <div className="step-line" />
                )}

              </div>

              <div className="step-icon">
                {step.icon}
              </div>

              <h3>
                {step.title}
              </h3>

              <p>
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}