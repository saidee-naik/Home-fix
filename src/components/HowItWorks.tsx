"use client";

import Link from "next/link";
import "./howItWorks.css";

/* =========================================================
   SEARCH ICON
========================================================= */

const SearchIcon = ({
  size = 24,
  strokeWidth = 1.8,
}: {
  size?: number;
  strokeWidth?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="6" />
    <path d="m16 16 4 4" />
  </svg>
);


/* =========================================================
   COMPARE PROFILES ICON
   No image required
========================================================= */

const CompareProfilesIcon = ({
  size = 24,
  strokeWidth = 1.8,
}: {
  size?: number;
  strokeWidth?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Small bullets */}
    <circle cx="4" cy="6" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="4" cy="12" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="4" cy="18" r="0.8" fill="currentColor" stroke="none" />

    {/* List lines */}
    <path d="M9 6h11" />
    <path d="M9 12h11" />
    <path d="M9 18h11" />

    {/* Small comparison mark */}
    <path d="M6.5 6h0" />
    <path d="M6.5 12h0" />
    <path d="M6.5 18h0" />
  </svg>
);


/* =========================================================
   PHONE ICON
========================================================= */

const PhoneIcon = ({
  size = 24,
  strokeWidth = 1.8,
}: {
  size?: number;
  strokeWidth?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.11 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.2 4.1 2 2 0 0 1 4.18 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.1 6.1l1.28-1.43a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);


/* =========================================================
   STEPS
========================================================= */

const steps = [
  {
    number: "01",
    icon: SearchIcon,
    title: "Search a service",
    description:
      "Choose the job and your area to see nearby professionals.",
  },
  {
    number: "02",
    icon: CompareProfilesIcon,
    title: "Compare profiles",
    description:
      "Check experience, specialties, and ratings side by side.",
  },
  {
    number: "03",
    icon: PhoneIcon,
    title: "Contact directly",
    description:
      "Call or message them to discuss the work and the price.",
  },
];


/* =========================================================
   COMPONENT
========================================================= */

export default function HowItWorks() {
  return (
    <section
      className="how-it-works"
      id="how-it-works"
    >
      <div className="how-it-works-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="how-it-works-header">

          <span className="section-label">
            SIMPLE PROCESS
          </span>

          <h2>
            How HomeFix Works
          </h2>

          <p>
            Find a trusted professional in Goa in three
            simple steps.
          </p>

        </div>


        {/* =================================================
            STEPS
        ================================================= */}

        <div className="steps-wrapper">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                className="step-item"
                key={step.number}
              >

                {/* Icon + Number */}

                <div className="step-visual">

                  <div className="step-icon-box">

                    <Icon
                      size={25}
                      strokeWidth={1.8}
                    />

                  </div>

                  <span className="step-number">
                    {step.number}
                  </span>

                </div>


                {/* Content */}

                <div className="step-content">

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>

                </div>


                {/* Connecting line */}

                {index < steps.length - 1 && (
                  <div className="step-connector" />
                )}

              </div>
            );
          })}

        </div>


        {/* =================================================
            CTA
        ================================================= */}

        <div className="how-it-works-action">

          <Link
            href="/services"
            className="how-it-works-button"
          >
            Find a professional

            <span>
              →
            </span>

          </Link>

        </div>

      </div>
    </section>
  );
}