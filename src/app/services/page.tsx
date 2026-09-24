"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProviderCard from "../../components/ProviderCard";
import ServiceFilters from "../../components/ServiceFilters";
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

const providers: Provider[] = [
  {
    id: 1,
    name: "Rajesh Naik",
    category: "Plumbing",
    title: "Plumbing Specialist",
    experience: 12,
    location: "Margao, Goa",
    price: "₹300 – ₹1,500",
    image: "/providers/rajesh-naik.jpg",
  },
  {
    id: 2,
    name: "Sujit Samudre",
    category: "Electrical",
    title: "Professional Electrician",
    experience: 8,
    location: "Margao, Goa",
    price: "₹250 – ₹1,200",
    image: "/providers/sujit-samudre.jpg",
  },
  {
    id: 3,
    name: "Suresh Yadhav",
    category: "HVAC",
    title: "HVAC & AC Technician",
    experience: 15,
    location: "Margao, Goa",
    price: "₹400 – ₹2,500",
    image: "/providers/suresh-yadhav.jpg",
  },
  {
    id: 4,
    name: "Prathamesh Devari",
    category: "Cleaning",
    title: "Commercial Cleaning Expert",
    experience: 5,
    location: "Margao, Goa",
    price: "₹500 – ₹2,000",
    image: "/providers/prathamesh-devari.jpg",
  },
];

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialService = searchParams.get("service") || "";
  const initialLocation = searchParams.get("location") || "Margao, Goa";

  const [search, setSearch] = useState(initialService);
  const [location, setLocation] = useState(initialLocation);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        searchText === "" ||
        provider.name.toLowerCase().includes(searchText) ||
        provider.category.toLowerCase().includes(searchText) ||
        provider.title.toLowerCase().includes(searchText);

      const matchesCategory =
  selectedCategories.length === 0 ||
  selectedCategories.includes(provider.category);

const locationText = location.trim().toLowerCase();

const matchesLocation =
  locationText === "" ||
  provider.location.toLowerCase().includes(locationText);



      const matchesExperience =
        selectedExperience.length === 0 ||
        selectedExperience.some((range) => {
          if (range === "1-3") {
            return provider.experience >= 1 && provider.experience <= 3;
          }

          if (range === "3-5") {
            return provider.experience > 3 && provider.experience <= 5;
          }

          if (range === "5-10") {
            return provider.experience > 5 && provider.experience <= 10;
          }

          if (range === "10+") {
            return provider.experience > 10;
          }

          return true;
        });

     return (
  matchesSearch &&
  matchesCategory &&
  matchesLocation &&
  matchesExperience
);
    });
  }, [search, selectedCategories, selectedExperience]);

  function toggleCategory(category: string) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  }

  function toggleExperience(range: string) {
    setSelectedExperience((current) =>
      current.includes(range)
        ? current.filter((item) => item !== range)
        : [...current, range]
    );
  }

  function clearFilters() {
    setSelectedCategories([]);
    setSelectedExperience([]);
    setSearch("");
  }

  return (
    <>
      <Navbar />

      <main className="services-page">
        <section className="results-search-section">
          <div className="container">
            <div className="results-search">
              <div className="results-search-input">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="What service do you need? e.g. Plumbing"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />
              </div>

             <div className="results-location">
  <span>⌖</span>

  <input
    type="text"
    value={location}
    onChange={(event) => setLocation(event.target.value)}
    placeholder="Location"
  />
</div>

             <button
  type="button"
  className="results-search-button"
  onClick={() => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("service", search.trim().toLowerCase());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    router.push(`/services?${params.toString()}`);
  }}
>
  Search
</button>
            </div>
          </div>
        </section>

        <section className="results-section">
          <div className="container">
            <div className="results-layout">

              <ServiceFilters
                selectedCategories={selectedCategories}
                selectedExperience={selectedExperience}
                onCategoryChange={toggleCategory}
                onExperienceChange={toggleExperience}
                onClear={clearFilters}
              />

              <div className="providers-area">

                <div className="results-heading">
                  <div>
                    <span className="section-label">
                      HOMEFIX PROFESSIONALS
                    </span>

                    <h1>
                      Find trusted service providers
                    </h1>

                    <p>
                      Showing {filteredProviders.length} matching{" "}
                      {filteredProviders.length === 1
                        ? "provider"
                        : "providers"}
                    </p>
                  </div>

                  <Link
                    href="/"
                    className="back-home-button"
                  >
                    ← Home
                  </Link>
                </div>

                {filteredProviders.length > 0 ? (
                  <div className="providers-grid">
                    {filteredProviders.map((provider) => (
                      <ProviderCard
                        key={provider.id}
                        provider={provider}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <div className="no-results-icon">
                      🔍
                    </div>

                    <h2>No providers found</h2>

                    <p>
                      Try changing your service or experience
                      filters.
                    </p>

                    <button
                      type="button"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}