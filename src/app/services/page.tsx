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

// Services page content
function ServicesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get values from URL
  const initialService = searchParams.get("service") || "";
  const initialLocation = searchParams.get("location") || "";

  // Search and location
  const [search, setSearch] = useState(initialService);
  const [location, setLocation] = useState(initialLocation);

  // Filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialService ? [initialService] : []
  );

  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);

  // Providers
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Keep the page state synchronized with the URL
  useEffect(() => {
    setSearch(initialService);
    setLocation(initialLocation);

    setSelectedCategories(
      initialService ? [initialService] : []
    );
  }, [initialService, initialLocation]);

  // Fetch providers
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

        const response = await fetch(
          `/api/providers?${params.toString()}`,
          {
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `API request failed: ${response.status}`
          );
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.message || "Failed to fetch providers"
          );
        }

        const formattedProviders: Provider[] = (
          data.providers || []
        ).map((provider: any) => ({
          id: String(provider._id),
          name: provider.name,
          category: provider.category,
          title:
            provider.description ||
            `${provider.category} Specialist`,
          experience: Number(provider.experience || 0),
          location: provider.location,
          price: `₹${provider.priceMin} – ₹${provider.priceMax}`,
          imageUrl: provider.imageUrl || "",
        }));

        if (isMounted) {
          setProviders(formattedProviders);
        }
      } catch (error: any) {
        if (error.name === "AbortError") return;

        console.error(
          "Failed to fetch providers:",
          error
        );

        if (isMounted) {
          setProviders([]);
          setError(
            "Unable to load service providers."
          );
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

  // Filter providers
  const filteredProviders = useMemo(() => {
    const searchText = search.trim().toLowerCase();
    const locationText = location.trim().toLowerCase();

    return providers.filter((provider) => {
      // Search filter
      const matchesSearch =
        searchText === "" ||
        provider.name
          .toLowerCase()
          .includes(searchText) ||
        provider.category
          .toLowerCase()
          .includes(searchText) ||
        provider.title
          .toLowerCase()
          .includes(searchText);

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some(
          (category) =>
            provider.category.toLowerCase() ===
            category.toLowerCase()
        );

      // Location filter
      const matchesLocation =
        locationText === "" ||
        provider.location
          .toLowerCase()
          .includes(locationText);

      // Experience filter
      const matchesExperience =
        selectedExperience.length === 0 ||
        selectedExperience.some((range) => {
          if (range === "1-3 years") {
            return (
              provider.experience >= 1 &&
              provider.experience <= 3
            );
          }

          if (range === "3-5 years") {
            return (
              provider.experience > 3 &&
              provider.experience <= 5
            );
          }

          if (range === "5-10 years") {
            return (
              provider.experience > 5 &&
              provider.experience <= 10
            );
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

  // Category selection
  function toggleCategory(category: string) {
    const isSelected =
      selectedCategories.includes(category);

    // If clicking the currently selected category,
    // remove the category filter
    if (isSelected) {
      setSelectedCategories([]);
      setSearch("");

      const params = new URLSearchParams();

      if (location.trim()) {
        params.set(
          "location",
          location.trim()
        );
      }

      router.push(
        `/services?${params.toString()}`
      );

      return;
    }

    // Select only one service category
    setSelectedCategories([category]);
    setSearch(category);

    const params = new URLSearchParams();

    params.set("service", category);

    if (location.trim()) {
      params.set(
        "location",
        location.trim()
      );
    }

    // Change service without going back to Page 1
    router.push(
      `/services?${params.toString()}`
    );
  }

  // Experience selection
  function toggleExperience(range: string) {
    setSelectedExperience((current) =>
      current.includes(range)
        ? current.filter(
            (item) => item !== range
          )
        : [...current, range]
    );
  }

  // Clear filters
  function clearFilters() {
    setSelectedCategories([]);
    setSelectedExperience([]);
    setSearch("");

    const params = new URLSearchParams();

    if (location.trim()) {
      params.set(
        "location",
        location.trim()
      );
    }

    router.push(
      `/services${
        params.toString()
          ? `?${params.toString()}`
          : ""
      }`
    );
  }

  // Search button
  function handleSearch() {
    const service = search.trim();

    const params = new URLSearchParams();

    if (service) {
      params.set("service", service);

      // Automatically select matching category
      setSelectedCategories([service]);
    }

    if (location.trim()) {
      params.set(
        "location",
        location.trim()
      );
    }

    router.push(
      `/services${
        params.toString()
          ? `?${params.toString()}`
          : ""
      }`
    );
  }

  return (
    <>
      <Navbar />

      <main className="services-page">

        {/* ================= SEARCH ================= */}
        <section className="results-search-section">
          <div className="container">

            <div className="results-search">

              {/* Service Search */}
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

              {/* Location */}
              <div className="results-location">
                <span className="location-icon">
                  ⌖
                </span>

                <input
                  type="text"
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                  placeholder="Enter your location"
                  aria-label="Location"
                />
              </div>

              {/* Search Button */}
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

              {/* Filters */}
              <ServiceFilters
                selectedCategories={
                  selectedCategories
                }
                selectedExperience={
                  selectedExperience
                }
                onCategoryChange={
                  toggleCategory
                }
                onExperienceChange={
                  toggleExperience
                }
                onClear={
                  clearFilters
                }
              />

              {/* Providers */}
              <div className="providers-area">

                {/* Heading */}
                <div className="results-heading">

                  <div>
                    <span className="section-label">
                      HOMEFIX PROFESSIONALS
                    </span>

                    <h1>
                      Find trusted service
                      providers
                    </h1>

                    <p>
                      {loading
                        ? "Loading providers..."
                        : `Showing ${
                            filteredProviders.length
                          } matching ${
                            filteredProviders.length ===
                            1
                              ? "provider"
                              : "providers"
                          }`}
                    </p>
                  </div>

                  {/* Home Button */}
                  <Link
                    href="/"
                    className="back-home-button"
                  >
                    ← Home
                  </Link>

                </div>

                {/* Error */}
                {error && !loading && (
                  <div className="no-results">

                    <h2>
                      Something went wrong
                    </h2>

                    <p>
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        window.location.reload()
                      }
                    >
                      Try Again
                    </button>

                  </div>
                )}

                {/* Loading */}
                {loading && !error && (
                  <div className="no-results">

                    <h2>
                      Loading providers...
                    </h2>

                    <p>
                      Please wait while we find
                      available providers.
                    </p>

                  </div>
                )}

                {/* Provider Cards */}
                {!loading &&
                  !error &&
                  filteredProviders.length >
                    0 && (
                    <div className="providers-grid">

                      {filteredProviders.map(
                        (provider) => (
                          <ProviderCard
                            key={provider.id}
                            provider={provider}
                          />
                        )
                      )}

                    </div>
                  )}

                {/* No Providers */}
                {!loading &&
                  !error &&
                  filteredProviders.length ===
                    0 && (
                    <div className="no-results">

                      <div className="no-results-icon">
                        🔍
                      </div>

                      <h2>
                        No providers found
                      </h2>

                      <p>
                        Try changing your service,
                        location or filters.
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

// Export page with Suspense
export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div>
          Loading services...
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}