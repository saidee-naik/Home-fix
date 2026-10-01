"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProviderCard from "../../components/ProviderCard";
import ServiceFilters from "../../components/ServiceFilters";

type Provider = {
  id: string;
  name: string;
  category: string;
  title: string;
  experience: number;
  location: string;
  price: string;
  imageUrl: string;
};

// 1. Extract the inner page implementation
function ServicesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialService = searchParams.get("service") || "";
  const initialLocation = searchParams.get("location") || "";

  const [search, setSearch] = useState(initialService);
  const [location, setLocation] = useState(initialLocation);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);

  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchProviders() {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (initialLocation.trim()) {
          params.set("location", initialLocation.trim());
        }

        params.set("limit", "50");

        const response = await fetch(`/api/providers?${params.toString()}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch providers");
        }

        const formattedProviders: Provider[] = (data.providers || []).map(
          (provider: any) => ({
            id: String(provider._id),
            name: provider.name,
            category: provider.category,
            title:
              provider.description || `${provider.category} Specialist`,
            experience: Number(provider.experience || 0),
            location: provider.location,
            price: `₹${provider.priceMin} – ₹${provider.priceMax}`,
            imageUrl: provider.imageUrl || "",
          })
        );

        if (isMounted) {
          setProviders(formattedProviders);
        }
      } catch (error: any) {
        if (error.name === "AbortError") return;
        console.error("Failed to fetch providers:", error);

        if (isMounted) {
          setProviders([]);
          setError("Unable to load service providers.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProviders();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [initialLocation]);

  const filteredProviders = useMemo(() => {
    const searchText = search.trim().toLowerCase();
    const locationText = location.trim().toLowerCase();

    return providers.filter((provider) => {
      const matchesSearch =
        searchText === "" ||
        provider.name.toLowerCase().includes(searchText) ||
        provider.category.toLowerCase().includes(searchText) ||
        provider.title.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some(
          (category) =>
            provider.category.toLowerCase() === category.toLowerCase()
        );

      const matchesLocation =
        locationText === "" ||
        provider.location.toLowerCase().includes(locationText);

      const matchesExperience =
        selectedExperience.length === 0 ||
        selectedExperience.some((range) => {
          if (range === "1-3 years") {
            return provider.experience >= 1 && provider.experience <= 3;
          }
          if (range === "3-5 years") {
            return provider.experience > 3 && provider.experience <= 5;
          }
          if (range === "5-10 years") {
            return provider.experience > 5 && provider.experience <= 10;
          }
          if (range === "10+ years") {
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
  }, [
    providers,
    search,
    location,
    selectedCategories,
    selectedExperience,
  ]);

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

  function handleSearch() {
    const params = new URLSearchParams();

    if (search.trim()) params.set("service", search.trim());
    if (location.trim()) params.set("location", location.trim());

    router.push(`/services?${params.toString()}`);
  }

  return (
    <>
      <Navbar />

      <main className="services-page">
        {/* ================= SEARCH ================= */}
        <section className="results-search-section">
          <div className="container">
            <div className="results-search">
              <div className="results-search-input">
                <span>⌕</span>
                <input
                  type="text"
                  placeholder="What service do you need? e.g. Plumbing"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
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
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </section>

        {/* ================= RESULTS ================= */}
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
                    <h1>Find trusted service providers</h1>
                    <p>
                      {loading
                        ? "Loading providers..."
                        : `Showing ${filteredProviders.length} matching ${
                            filteredProviders.length === 1
                              ? "provider"
                              : "providers"
                          }`}
                    </p>
                  </div>

                  <Link href="/" className="back-home-button">
                    ← Home
                  </Link>
                </div>

                {error && !loading && (
                  <div className="no-results">
                    <h2>Something went wrong</h2>
                    <p>{error}</p>
                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {loading && !error && (
                  <div className="no-results">
                    <h2>Loading providers...</h2>
                    <p>Please wait while we find available providers.</p>
                  </div>
                )}

                {!loading &&
                  !error &&
                  filteredProviders.length > 0 && (
                    <div className="providers-grid">
                      {filteredProviders.map((provider) => (
                        <ProviderCard key={provider.id} provider={provider} />
                      ))}
                    </div>
                  )}

                {!loading &&
                  !error &&
                  filteredProviders.length === 0 && (
                    <div className="no-results">
                      <div className="no-results-icon">🔍</div>
                      <h2>No providers found</h2>
                      <p>
                        Try changing your service, location or filters.
                      </p>
                      <button type="button" onClick={clearFilters}>
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

// 2. Export default page wrapped in Suspense
export default function ServicesPage() {
  return (
    <Suspense fallback={<div>Loading services...</div>}>
      <ServicesContent />
    </Suspense>
  );
}