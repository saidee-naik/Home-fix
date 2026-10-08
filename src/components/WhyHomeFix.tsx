"use client";

import "./WhyHomeFix.css";


/* =========================================================
   ICONS
========================================================= */

const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="28"
    height="28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3l8 3v5c0 5.2-3.4 8.9-8 10-4.6-1.1-8-4.8-8-10V6l8-3z" />
    <path d="m8.5 12 2.2 2.2 4.8-5" />
  </svg>
);


const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="28"
    height="28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);


const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="28"
    height="28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L9 10.9a16 16 0 0 0 4.1 4.1l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);


const RupeeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="28"
    height="28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 4h9" />
    <path d="M6 8h9" />
    <path d="M10 4c3 1 4 3 4 5s-1 4-5 4H6" />
    <path d="m9 13 6 7" />
  </svg>
);


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function WhyHomeFix() {
  return (
    <section className="why-homefix">

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


          {/* FEATURES */}

          <div className="why-homefix-features">

            <div className="why-feature">

              <div className="why-feature-icon">
                <ShieldIcon />
              </div>

              <div>
                <h3>ID-checked professionals</h3>

                <p>
                  Phone number and ID verified before listing.
                </p>
              </div>

            </div>


            <div className="why-feature">

              <div className="why-feature-icon">
                <LocationIcon />
              </div>

              <div>
                <h3>Local to Goa</h3>

                <p>
                  Providers who work in your area.
                </p>
              </div>

            </div>


            <div className="why-feature">

              <div className="why-feature-icon">
                <PhoneIcon />
              </div>

              <div>
                <h3>Direct contact</h3>

                <p>
                  Discuss your project directly with the
                  professional.
                </p>
              </div>

            </div>


            <div className="why-feature">

              <div className="why-feature-icon">
                <RupeeIcon />
              </div>

              <div>
                <h3>Transparent service</h3>

                <p>
                  Discuss the work and expected cost before
                  getting started.
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            RIGHT PROFILE
        ================================================= */}

        <div className="why-homefix-visual">

          {/* Verified professionals badge */}

          <div className="verified-count">

            <strong>100+</strong>

            <span>
              Verified Professionals
            </span>

          </div>


          {/* Professional profile card */}

          <div className="professional-card">

            {/* Top section */}

            <div className="professional-header">

              <div className="professional-avatar">
                RN
              </div>

              <div className="professional-name">

                <h3>
                  Ramesh N.
                </h3>

                <p>
                  Electrician, Panaji
                </p>

              </div>

            </div>


            {/* Category */}

            <span className="professional-category">
              Electrical
            </span>


            {/* Details */}

            <div className="professional-details">

              <span>
                <span className="detail-icon">☆</span>
                <strong>4.8</strong> (32)
              </span>

              <span>
                <span className="detail-icon">▣</span>
                9 years
              </span>

            </div>


            {/* Verification */}

            <div className="verified-badge">
              ✓ &nbsp; ID verified
            </div>

          </div>


          {/* Caption */}

          <p className="profile-caption">
            Professional profile preview
          </p>

        </div>

      </div>

    </section>
  );
}