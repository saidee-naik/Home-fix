"use client";

import "./safetyFeatures.css";

const BadgeCheck = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3.5 5.5 5.8v5.2c0 4.1 2.8 7.9 6.5 9.5 3.7-1.6 6.5-5.4 6.5-9.5V5.8L12 3.5Z" />
    <path d="m9.5 12 1.7 1.8 3.3-4.1" />
  </svg>
);

const MapPin = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const Phone = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.9 4.3a2 2 0 0 1-.5 1.8L8 10.3a16 16 0 0 0 5.7 5.7l.5-.5a2 2 0 0 1 1.8-.5l4.3.9A2 2 0 0 1 22 16.9Z" />
  </svg>
);

const IndianRupee = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 5H7.5a4.5 4.5 0 0 1 0 9H9l9 8" />
    <path d="M7 5h11" />
    <path d="M7 10h11" />
    <path d="M7 15h2.5" />
  </svg>
);

const Star = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={1.5}
    {...props}
  >
    <path d="m12 2.8 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 0 6.6 19.6l1-6.1L3.2 9.2l6.1-.9L12 2.8Z" />
  </svg>
);

const BriefcaseBusiness = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 19V7.5A1.5 1.5 0 0 1 5.5 6H9V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V6h3.5A1.5 1.5 0 0 1 20 7.5V19" />
    <path d="M8 6h8" />
    <path d="M4 12h16" />
    <path d="M9 15h6" />
  </svg>
);


const features = [
  {
    icon: BadgeCheck,
    title: "ID-checked professionals",
    description:
      "Phone number and ID verified before listing.",
  },

  {
    icon: MapPin,
    title: "Local to Goa",
    description:
      "Providers who work in your area.",
  },

  {
    icon: Phone,
    title: "Direct contact",
    description:
      "Discuss your project directly with the professional.",
  },

  {
    icon: IndianRupee,
    title: "Transparent service",
    description:
      "Discuss the work and expected cost before getting started.",
  },
];


export default function SafetyFeatures() {
  return (
    <section
      className="why-homefix"
      id="why-homefix"
    >

      <div className="why-homefix-container">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="why-homefix-content">

          <span className="why-homefix-label">
            WHY HOMEFIX
          </span>


          <h2>
            Trusted home professionals,
            <br />
            right here in Goa
          </h2>


          <p className="why-homefix-description">
            Find reliable local help for repairs and upkeep,
            from people who know your area.
          </p>


          {/* =================================================
              FEATURES
          ================================================= */}

          <div className="why-features">

            {features.map((feature) => {

              const Icon = feature.icon;

              return (
                <div
                  className="why-feature"
                  key={feature.title}
                >

                  <div className="why-feature-icon">

                    <Icon
                      size={21}
                      strokeWidth={1.8}
                    />

                  </div>


                  <div className="why-feature-content">

                    <h3>
                      {feature.title}
                    </h3>

                    <p>
                      {feature.description}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>


        {/* =================================================
            RIGHT TRUST CARD
        ================================================= */}

        <div className="trust-visual">

          {/* Top floating card */}

          <div className="trust-floating-card trust-floating-top">

            <strong>
              100+
            </strong>

            <span>
              Verified Professionals
            </span>

          </div>


          {/* Main card */}

          <div className="trust-provider-card">

            <div className="provider-avatar">
              RN
            </div>


            <div className="provider-information">

              <h3>
                Ramesh N.
              </h3>

              <p>
                Electrician, Panaji
              </p>

            </div>


            <div className="provider-details">

              <span>
                <Star size={17} />
                4.8 (32)
              </span>

              <span>
                <BriefcaseBusiness size={17} />
                9 years
              </span>

            </div>


            <div className="verified-badge">

              <BadgeCheck size={17} />

              ID verified

            </div>

          </div>


          {/* Bottom floating card */}

          <div className="trust-floating-card trust-floating-bottom">

            <strong>
              128+
            </strong>

            <span>
              Customer Reviews
            </span>

          </div>


          <span className="trust-caption">
            Example profile for illustration
          </span>

        </div>

      </div>

    </section>
  );
}