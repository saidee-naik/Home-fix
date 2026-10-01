const reviews = [
  {
    name: "Olivia Bennett",
    image: "https://i.pravatar.cc/150?img=09",
    rating: 4.8,
    date: "2 days ago",
    service: "Plumbing",
    review:
      "I recently hired a plumber through HomeFix to fix a leaky faucet, and I couldn't be happier with the results! The service was quick, affordable, and professional.",
  },
  {
    name: "James Anderson",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 4.5,
    date: "5 days ago",
    service: "Carpentry",
    review:
      "I needed custom shelves for my living room and found an excellent carpenter through HomeFix. The attention to detail was impressive and the final result looks amazing.",
  },
  {
    name: "Sophia Martinez",
    image: "https://i.pravatar.cc/150?img=44",
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
    name: "Ava Thompson",
    image: "https://i.pravatar.cc/150?img=43",
    rating: 4.4,
    date: "2 weeks ago",
    service: "Home Repair",
    review:
      "HomeFix made it easy to find a reliable professional. Communication was good and the service was completed exactly as expected.",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="rating">
      <span className="stars">★★★★★</span>
      <span className="rating-number">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="trust-safety" className="reviews-section">

      {/* Header */}
      <div className="reviews-top">

        <div>
          <div className="reviews-brand">
  <span className="reviews-icon">✓</span>

  <div className="reviews-brand-text">
    <strong>Trust & Safety</strong>
    <span>Verified & reliable professionals</span>
  </div>
</div>

          <h2>What Our Customers Say</h2>

          <p>
            Real feedback from homeowners who booked professionals
            through HomeFix.
          </p>
        </div>

        <div className="overall-rating">
          <div className="overall-number">4.6</div>

          <div>
            <div className="overall-stars">★★★★★</div>
            <span>128 customer reviews</span>
          </div>
        </div>

      

      </div>

      {/* Reviews */}
      <div className="reviews-grid">

        {/* Summary card */}
        <div className="review-summary">

          <div className="summary-icon">✦</div>

          <h3>Trusted by Homeowners</h3>

          <p>
            HomeFix connects homeowners with reliable professionals
            for everyday home services.
          </p>

          <div className="summary-rating">
            <strong>4.6</strong>
            <span>★★★★★</span>
          </div>

          <small>Based on 128 reviews</small>

        </div>

        {/* Review cards */}
        {reviews.map((review) => (
          <div className="review-card" key={review.name}>

            <div className="review-user">

              <img
                src={review.image}
                alt={review.name}
              />

              <div>
                <h3>{review.name}</h3>

                <span className="review-date">
                  {review.date}
                </span>
              </div>

            </div>

            <Stars rating={review.rating} />

            <span className="service-tag">
              {review.service}
            </span>

            <p>{review.review}</p>

          </div>
        ))}

      </div>

    </section>
  );
}