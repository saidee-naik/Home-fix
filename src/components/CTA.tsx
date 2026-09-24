import Link from "next/link";

export default function CTA() {
  return (
    <section className="cta-section">

      <div className="container">

        <div className="cta-box">

          <div className="cta-content">

            <span className="section-label">
              GET STARTED
            </span>

            <h2>
              Need a professional
              <br />
              for your home?
            </h2>

            <p>
              Find trusted local professionals in Goa
              and get your project started today.
            </p>

          </div>

          <Link
            href="/providers"
            className="cta-button"
          >
            Find a Professional
            <span>→</span>
          </Link>

        </div>

      </div>

    </section>
  );
}