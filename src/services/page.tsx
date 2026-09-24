interface ServicesPageProps {
  searchParams: Promise<{
    service?: string;
    location?: string;
  }>;
}

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  const params = await searchParams;

  const service = params.service || "Home Services";
  const location = params.location || "Goa";

  return (
    <main className="services-page">

      <div className="services-container">

        <span className="section-label">
          HOMEFIX SERVICES
        </span>

        <h1>
          Find Professionals Near You
        </h1>

        <p className="services-subtitle">
          Showing results for{" "}
          <strong>{service}</strong>{" "}
          in{" "}
          <strong>{location}, Goa</strong>
        </p>

        <div className="search-result-box">

          <h2>
            Search Results
          </h2>

          <p>
            Professional listings for {service} in {location}
            will appear here.
          </p>

        </div>

      </div>

    </main>
  );
}