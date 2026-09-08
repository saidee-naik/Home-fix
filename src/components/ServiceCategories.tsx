import ServiceCard from "./ServiceCard";

const services = [
  {
    icon: "🔧",
    name: "Plumbing",
    professionals: "84",
    description: "Pipes, leaks, taps & repairs",
  },
  {
    icon: "⚡",
    name: "Electrical",
    professionals: "62",
    description: "Wiring, repairs & installations",
  },
  {
    icon: "✨",
    name: "Cleaning",
    professionals: "115",
    description: "Home, deep & regular cleaning",
  },
  {
    icon: "🎨",
    name: "Painting",
    professionals: "45",
    description: "Interior & exterior painting",
  },
  {
    icon: "❄️",
    name: "HVAC",
    professionals: "39",
    description: "AC installation & servicing",
  },
  {
    icon: "🔨",
    name: "Carpentry",
    professionals: "51",
    description: "Furniture, doors & woodwork",
  },
];

export default function ServiceCategories() {
  return (
    <section
      className="services-section"
      id="services"
    >

      <div className="container">

        <div className="services-header">

          <div>

            <span className="section-label">
              EXPLORE SERVICES
            </span>

            <h2>
              Popular Service Categories
            </h2>

            <p>
              Find trusted professionals for all your home service needs.
            </p>

          </div>

          <button className="view-all-button">
            View All Services
            <span>→</span>
          </button>

        </div>

        <div className="services-grid">

          {services.map((service) => (
            <ServiceCard
              key={service.name}
              icon={service.icon}
              name={service.name}
              professionals={service.professionals}
              description={service.description}
            />
          ))}

        </div>

      </div>

    </section>
  );
}