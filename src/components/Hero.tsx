export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <div className="hero-badge">
          TRUSTED HOME SERVICES IN GOA
        </div>

        <h1>
          Find Trusted Local
          <br />
          Professionals For Your Home
        </h1>

        <p>
          Verified professionals, background-checked, and licensed
          for any home service project.
        </p>

        <div className="search-box">

          <div className="search-service">
            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="What service do you need? (e.g. Plumbing)"
            />
          </div>

          <div className="search-location">
            <span>
              ⌾
            </span>

            <span>
              Margao, GOA
            </span>
          </div>

          <button className="search-button">
            Search
          </button>

        </div>

        <div className="hero-trust">
          <span>✓ Verified Professionals</span>
          <span>✓ Local Experts</span>
          <span>✓ Direct Contact</span>
        </div>

      </div>

    </section>
  );
}