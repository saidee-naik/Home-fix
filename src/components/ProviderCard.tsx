import Link from "next/link";

type Provider = {
  id: number;
  name: string;
  category: string;
  title: string;
  experience: number;
  location: string;
  price: string;
  image: string;
};

type ProviderCardProps = {
  provider: Provider;
};

export default function ProviderCard({
  provider,
}: ProviderCardProps) {
  return (
    <div className="provider-card">

      <div className="provider-image">
        <div className="provider-placeholder">
          👤
        </div>
      </div>

      <div className="provider-content">

        <div className="provider-category">
          {provider.category}
        </div>

        <h3>{provider.name}</h3>

        <p className="provider-title">
          {provider.title}
        </p>

        <div className="provider-info">
          <span>📍 {provider.location}</span>
          <span>⭐ {provider.experience}+ years</span>
        </div>

        <div className="provider-bottom">

          <strong>
            {provider.price}
          </strong>

          <Link
            href={`/services/${provider.id}`}
            className="provider-details-button"
          >
            View Details →
          </Link>

        </div>

      </div>

    </div>
  );
}