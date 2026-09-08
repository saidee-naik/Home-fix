export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">

            <div className="logo footer-logo">

              <div className="logo-box">
                🔧
              </div>

              <span>
                HomeFix
              </span>

            </div>

            <p>
              Connecting homeowners with verified local service
              professionals. Trust, safety, and transparency.
            </p>

          </div>

          {/* Services */}
          <div className="footer-column">

            <h3>
              Popular Services
            </h3>

            <a href="#">
              Plumbing
            </a>

            <a href="#">
              Electrical
            </a>

            <a href="#">
              Cleaning
            </a>

            <a href="#">
              HVAC & Heating
            </a>

          </div>

          {/* Company */}
          <div className="footer-column">

            <h3>
              Company
            </h3>

            <a href="#">
              About Us
            </a>

            <a href="#">
              Trust & Safety
            </a>

            <a href="#">
              Support
            </a>

            <a href="#">
              Careers
            </a>

          </div>

        </div>

        {/* Bottom */}

        <div className="footer-bottom">

          <span>
            © 2026 HomeFix Marketplace. All rights reserved.
          </span>

          <div>

            <a href="#">
              Privacy Policy
            </a>

            <span>
              {" • "}
            </span>

            <a href="#">
              Terms of Service
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}