interface ServiceCardProps {
  icon: string;
  name: string;
  professionals: string;
  description: string;
}

export default function ServiceCard({
  icon,
  name,
  professionals,
  description,
}: ServiceCardProps) {
  return (
    <div className="service-card">

      <div className="service-card-top">

        <div className="service-icon">
          {icon}
        </div>

        <span className="service-arrow">
          →
        </span>

      </div>

      <div className="service-card-content">

        <h3>
          {name}
        </h3>

        <p className="service-description">
          {description}
        </p>

        <p className="professional-count">
          {professionals} professionals
        </p>

      </div>

    </div>
  );
}