export default function ProvidersPage() {
  return (
    <main className="providers-page">

      <div className="providers-container">

        <div className="error-icon">
          ⚠
        </div>

        <span className="section-label">
          HOMEFIX PROVIDERS
        </span>

        <h1>
          Unable to Load Professionals
        </h1>

        <p>
          We couldn't load the professional listings right now.
          Our provider database is not connected yet.
        </p>

        <p className="error-detail">
          Please try again later. Once the database is connected,
          trusted professionals in your area will appear here.
        </p>

        <a href="/" className="back-home-button">
          ← Back to Home
        </a>

      </div>

    </main>
  );
}