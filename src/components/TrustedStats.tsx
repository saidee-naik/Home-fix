"use client";

import { useState } from "react";
import "./TrustedStats.css";

/* =========================================================
   REVIEW DATA
========================================================= */

const reviews = [
  {
    name: "Olivia Bennett",
    image: "https://i.pravatar.cc/150?img=20",
    rating: 4.8,
    date: "2 days ago",
    service: "Plumbing",
    review:
      "I recently hired a plumber through HomeFix to fix a leaky faucet, and I couldn't be happier with the results! The service was quick, affordable, and professional.",
  },

  {
    name: "Rahul Patel",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 4.5,
    date: "5 days ago",
    service: "Carpentry",
    review:
      "I needed custom shelves for my living room and found an excellent carpenter through HomeFix. The attention to detail was impressive and the final result looks amazing.",
  },

  {
    name: "Shivani Sharma",
    image: "https://i.pravatar.cc/150?img=49",
    rating: 4.2,
    date: "1 week ago",
    service: "Electrical",
    review:
      "The electrician arrived on time, explained the problem clearly, and completed the work safely. The entire booking process through HomeFix was simple.",
  },

  {
    name: "Ethan Wilson",
    image: "https://i.pravatar.cc/150?img=33",
    rating: 4.7,
    date: "1 week ago",
    service: "Cleaning",
    review:
      "I booked a deep cleaning service and the team did a fantastic job. They were thorough and left my home looking brand new.",
  },

  {
    name: "Abhishik Singh",
    image: "https://i.pravatar.cc/150?img=54",
    rating: 4.4,
    date: "2 weeks ago",
    service: "Home Repair",
    review:
      "HomeFix made it easy to find a reliable professional. Communication was good and the service was completed exactly as expected.",
  },

  {
    name: "Neha Desai",
    image: "https://i.pravatar.cc/150?img=44",
    rating: 4.9,
    date: "3 weeks ago",
    service: "Painting",
    review:
      "The painter was punctual, professional, and very careful with the furniture. The room looks completely different now and the finish is excellent.",
  },

  {
    name: "Arjun Naik",
    image: "https://i.pravatar.cc/150?img=68",
    rating: 4.6,
    date: "1 month ago",
    service: "HVAC",
    review:
      "Finding an AC technician through HomeFix was easy. The technician explained everything clearly and fixed the issue without any unnecessary charges.",
  },
];


/* =========================================================
   STAR COMPONENT

   Examples:
   4.8 = 4 full + 80% fifth
   4.5 = 4 full + 50% fifth
   4.2 = 4 full + 20% fifth
========================================================= */

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="rating"
      aria-label={`${rating} out of 5 stars`}
    >
      <div className="stars">

        {[0, 1, 2, 3, 4].map((index) => {
          const fillPercentage =
            Math.min(
              Math.max(rating - index, 0),
              1
            ) * 100;

          return (
            <span
              className="star"
              key={index}
            >
              <span className="star-empty">
                ★
              </span>

              <span
                className="star-filled"
                style={{
                  width: `${fillPercentage}%`,
                }}
              >
                ★
              </span>
            </span>
          );
        })}

      </div>

      <span className="rating-number">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}


/* =========================================================
   REVIEWS COMPONENT
========================================================= */

export default function Reviews() {

  const [showAllReviews, setShowAllReviews] =
    useState(false);

  const overallRating = 4.6;

  /*
    Initial:
    4 reviews

    View All:
    6 reviews
  */

  const displayedReviews = showAllReviews
    ? reviews.slice(0, 6)
    : reviews.slice(0, 4);


  return (
    <section
      id="trust-safety"
      className="reviews-section"
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="reviews-top">

        <div className="reviews-heading">

          {/* Trust & Safety badge */}

          <div className="reviews-brand">

            <span className="reviews-icon">
              ✓
            </span>

            <div className="reviews-brand-text">

              <strong>
                Trust & Safety
              </strong>

              <span>
                Verified & reliable professionals
              </span>

            </div>

          </div>


          {/* Main heading */}

          <h2>
            What Our Customers Say
          </h2>


          <p>
            Real feedback from homeowners who booked
            professionals through HomeFix.
          </p>

        </div>


        {/* =================================================
            OVERALL RATING
        ================================================= */}

        <div className="overall-rating">

          <div className="overall-number">
            {overallRating.toFixed(1)}
          </div>


          <div className="overall-rating-info">

            <div
              className="overall-stars"
              aria-label={`${overallRating} out of 5 stars`}
            >

              {[0, 1, 2, 3, 4].map((index) => {

                const fillPercentage =
                  Math.min(
                    Math.max(
                      overallRating - index,
                      0
                    ),
                    1
                  ) * 100;

                return (
                  <span
                    className="overall-star"
                    key={index}
                  >

                    <span className="overall-star-empty">
                      ★
                    </span>

                    <span
                      className="overall-star-filled"
                      style={{
                        width: `${fillPercentage}%`,
                      }}
                    >
                      ★
                    </span>

                  </span>
                );

              })}

            </div>

            <span>
              128 customer reviews
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          REVIEWS GRID
      ================================================= */}

      <div
        className={`reviews-grid ${
          showAllReviews
            ? "show-all-reviews"
            : ""
        }`}
      >

        {/* =================================================
            TRUST SUMMARY
        ================================================= */}

        <div className="review-summary">

          <div className="summary-icon">
            ✦
          </div>


          <h3>
            Trusted by Homeowners
          </h3>


          <p>
            HomeFix connects homeowners with reliable
            professionals for everyday home services.
          </p>


          <div className="summary-rating">

            <strong>
              {overallRating.toFixed(1)}
            </strong>


            <div className="summary-stars">

              {[0, 1, 2, 3, 4].map((index) => {

                const fillPercentage =
                  Math.min(
                    Math.max(
                      overallRating - index,
                      0
                    ),
                    1
                  ) * 100;

                return (
                  <span
                    className="summary-star"
                    key={index}
                  >

                    <span className="summary-star-empty">
                      ★
                    </span>

                    <span
                      className="summary-star-filled"
                      style={{
                        width: `${fillPercentage}%`,
                      }}
                    >
                      ★
                    </span>

                  </span>
                );

              })}

            </div>

          </div>


          <small>
            Based on 128 reviews
          </small>

        </div>


        {/* =================================================
            CUSTOMER REVIEWS
        ================================================= */}

        {displayedReviews.map((review) => (

          <article
            className="review-card"
            key={review.name}
          >

            <div className="review-user">

              <img
                src={review.image}
                alt={`${review.name} customer`}
              />

              <div>

                <h3>
                  {review.name}
                </h3>

                <span className="review-date">
                  {review.date}
                </span>

              </div>

            </div>


            <Stars
              rating={review.rating}
            />


            <div className="review-meta">

              <span className="service-tag">
                {review.service}
              </span>

              <span className="verified-review">
                ✓ Verified
              </span>

            </div>


            <p className="review-text">
              "{review.review}"
            </p>

          </article>

        ))}

      </div>


      {/* =================================================
          VIEW ALL BUTTON
      ================================================= */}

      <div className="reviews-footer">

        <button
          className="view-reviews-button"
          type="button"
          onClick={() =>
            setShowAllReviews(
              (previous) => !previous
            )
          }
        >

          {showAllReviews
            ? "Show Less"
            : "View All Reviews"}

          <span>
            {showAllReviews
              ? "↑"
              : "→"}
          </span>

        </button>

      </div>

    </section>
  );
}