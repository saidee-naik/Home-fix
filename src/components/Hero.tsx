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

        {/* Search Form */}
        <form
          className="search-box"
          action="/services"
          method="GET"
        >

          {/* Service Search */}
          <div className="search-service">
            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              name="service"
              placeholder="What service do you need? (e.g. Plumbing)"
              required
            />
          </div>

          {/* Goa Location */}
          <div className="search-location">

            <span className="location-icon">
              ⌾
            </span>

            <select
              name="location"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select location in Goa
              </option>

              <option value="Panaji">Panaji</option>
              <option value="Margao">Margao</option>
              <option value="Vasco da Gama">Vasco da Gama</option>
              <option value="Mapusa">Mapusa</option>
              <option value="Ponda">Ponda</option>
              <option value="Porvorim">Porvorim</option>
              <option value="Calangute">Calangute</option>
              <option value="Candolim">Candolim</option>
              <option value="Baga">Baga</option>
              <option value="Anjuna">Anjuna</option>
              <option value="Arpora">Arpora</option>
              <option value="Assagao">Assagao</option>
              <option value="Siolim">Siolim</option>
              <option value="Morjim">Morjim</option>
              <option value="Pernem">Pernem</option>
              <option value="Bicholim">Bicholim</option>
              <option value="Sanquelim">Sanquelim</option>
              <option value="Valpoi">Valpoi</option>
              <option value="Quepem">Quepem</option>
              <option value="Curchorem">Curchorem</option>
              <option value="Cuncolim">Cuncolim</option>
              <option value="Navelim">Navelim</option>
              <option value="Colva">Colva</option>
              <option value="Betalbatim">Betalbatim</option>
              <option value="Chinchinim">Chinchinim</option>
              <option value="Canacona">Canacona</option>
              <option value="Palolem">Palolem</option>
            </select>

          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="search-button"
          >
            Search
          </button>

        </form>

        <div className="hero-trust">
          <span>✓ Verified Professionals</span>
          <span>✓ Local Experts</span>
          <span>✓ Direct Contact</span>
        </div>

      </div>

    </section>
  );
}