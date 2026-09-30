"use client";

import { useEffect, useState } from "react";

type ProviderDetails = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  category: string;
  location: string;
  experience: number;
  priceMin: number;
  priceMax: number;
  imageUrl?: string;
  description?: string;
  status?: string;
};

type ProviderProfileModalProps = {
  providerId: string;
  onClose: () => void;
};

export default function ProviderProfileModal({
  providerId,
  onClose,
}: ProviderProfileModalProps) {
  const [provider, setProvider] =
    useState<ProviderDetails | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function fetchProvider() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/providers/${providerId}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load provider: ${response.status}`
          );
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.message ||
              "Failed to load provider"
          );
        }

        setProvider(data.provider);
      } catch (err) {
        console.error(
          "Provider profile error:",
          err
        );

        setError(
          "Unable to load provider details."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProvider();
  }, [providerId]);

  // Close when Escape is pressed
  useEffect(() => {
    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [onClose]);

  function handleOverlayClick(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    if (
      event.target === event.currentTarget
    ) {
      onClose();
    }
  }

  return (
    <div
      className="provider-profile-overlay"
      onClick={handleOverlayClick}
    >
      <div className="provider-profile-modal">

        {/* CLOSE */}

        <button
          type="button"
          className="provider-profile-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {/* LOADING */}

        {loading && (
          <div className="provider-profile-state">
            <h2>Loading provider...</h2>

            <p>
              Please wait while we load
              the profile.
            </p>
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="provider-profile-state">
            <h2>Something went wrong</h2>

            <p>{error}</p>

            <button
              type="button"
              className="provider-profile-action"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}

        {/* PROFILE */}

        {!loading &&
          !error &&
          provider && (
            <div className="provider-profile-layout">

              {/* LEFT */}

              <div className="provider-profile-left">

                <span className="provider-profile-label">
                  PROVIDER PROFILE
                </span>

                <div className="provider-profile-image">

                  {provider.imageUrl ? (
                    <img
                      src={provider.imageUrl}
                      alt={provider.name}
                    />
                  ) : (
                    <div className="provider-profile-placeholder">
                      👤
                    </div>
                  )}

                </div>

                <h2>
                  {provider.name}
                </h2>

                <p className="provider-profile-role">
                  {provider.category} Specialist
                </p>

                <div className="provider-profile-divider" />

                <div className="provider-profile-info">

                  <p>
                    💼 {provider.experience} Years
                    Experience
                  </p>

                  <p>
                    📍 {provider.location}
                  </p>

                  <p className="provider-available">
                    ● Available Now
                  </p>

                </div>

              </div>

              {/* RIGHT */}

              <div className="provider-profile-right">

                <section>
                  <h3>
                    ABOUT{" "}
                    {provider.name.toUpperCase()}
                  </h3>

                  <p>
                    {provider.description ||
                      `Professional ${provider.category.toLowerCase()} services with reliable and quality workmanship.`}
                  </p>
                </section>

                <section>
                  <h3>
                    SERVICES OFFERED
                  </h3>

                  <ul>
                    <li>
                      {provider.category} installation
                    </li>

                    <li>
                      {provider.category} repair
                    </li>

                    <li>
                      {provider.category} maintenance
                    </li>

                    <li>
                      Professional service support
                    </li>
                  </ul>
                </section>

                <section>
                  <h3>
                    ESTIMATED SERVICE COST
                  </h3>

                  <strong className="provider-profile-price">
                    ₹{provider.priceMin} – ₹
                    {provider.priceMax}
                  </strong>

                  <p className="provider-profile-note">
                    Final price may vary depending
                    on job complexity.
                  </p>
                </section>

                {/* CONTACT */}

                <section className="provider-contact-box">

                  <div className="provider-contact-header">

                    <strong>
                      Direct Contact
                    </strong>

                    <span>
                      Response time: Contact provider
                    </span>

                  </div>

                  <a
                    href={`tel:${provider.phone}`}
                    className="provider-contact-button"
                  >
                    📞 {provider.phone}
                  </a>

                </section>

              </div>

            </div>
          )}

      </div>
    </div>
  );
}