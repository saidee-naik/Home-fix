"use client";

import { useState } from "react";
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
  {
    icon: "🧹",
    name: "Pest Control",
    professionals: "38",
    description: "Termite, insects & pest removal",
  },
 
  
  {
    icon: "🔑",
    name: "Locksmith",
    professionals: "18",
    description: "Locks, keys & security services",
  },
  {
    icon: "🌳",
    name: "Gardening",
    professionals: "24",
    description: "Garden maintenance & landscaping",
  },
  {
    icon: "📦",
    name: "Moving Services",
    professionals: "21",
    description: "Packing, shifting & relocation",
  },
];

export default function ServiceCategories() {
  const [showAll, setShowAll] = useState(false);

  const visibleServices = showAll
    ? services
    : services.slice(0, 6);

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

          <button
            className="view-all-button"
            onClick={() => setShowAll(!showAll)}
            type="button"
          >
            {showAll ? "Show Less" : "View All Services"}

            <span>
              {showAll ? "↑" : "→"}
            </span>
          </button>

        </div>

        <div className="services-grid">

          {visibleServices.map((service) => (
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