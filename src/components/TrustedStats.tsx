"use client";

import "./TrustedStats.css";

const reviews = [
  {
    name: "Rohan Naik",
    location: "Ponda",
    service: "Plumbing",
    initials: "RN",
    color: "green",
    review:
      "The plumber arrived on time and fixed the leakage quickly. Very professional and polite. Highly recommended!",
  },
  {
    name: "Priya Fernandes",
    location: "Margao",
    service: "Cleaning",
    initials: "PF",
    color: "blue",
    review:
      "Booked a house cleaning service and the team did an amazing job. My home looks so much better now!",
  },
  {
    name: "Amit Kamat",
    location: "Panjim",
    service: "Electrical",
    initials: "AK",
    color: "orange",
    review:
      "The electrician was knowledgeable and fixed the issue the same day. Fair pricing and great communication.",
  },
  {
    name: "Sneha Dessai",
    location: "Mapusa",
    service: "Painting",
    initials: "SD",
    color: "purple",
    review:
      "Got my living room painted through HomeFix. The work quality was excellent and completed on time.",
  },
];

export default function TrustedStats() {
  return (
    <section className="reviews-section">
      <div className="reviews-container">

        {/* Section Heading */}
        <div className="reviews-heading">
          <span className="reviews-label">
            WHAT OUR CUSTOMERS SAY
          </span>

          <h2>Trusted by homeowners across Goa</h2>

          <p>
            Real experiences from people who used HomeFix to get
            their home projects done.
          </p>
        </div>

        {/* Customer Reviews */}
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div className="review-card" key={review.name}>

              {/* Quote Icon */}
              <div className={`quote-icon ${review.color}`}>
                “
              </div>

              {/* Review */}
              <p className="review-text">
                “{review.review}”
              </p>

              {/* Rating */}
              <div className="review-stars">
                ★ ★ ★ ★ ★
              </div>

              <div className="review-divider" />

              {/* Customer Details */}
              <div className="review-bottom">

                <div
                  className={`customer-avatar ${review.color}`}
                >
                  {review.initials}
                </div>

                <div className="customer-info">
                  <h4>{review.name}</h4>
                  <span>{review.location}</span>
                </div>

                <div
                  className={`service-badge ${review.color}`}
                >
                  {review.service}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}