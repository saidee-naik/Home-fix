"use client";

import { useState } from "react";

import ProviderProfileModal from "./ProviderProfileModal";

type Provider = {
  id: string | number;
  name: string;
  category: string;
  title: string;
  experience: number;
  location: string;
  price: string;
  imageUrl: string;
};

type ProviderCardProps = {
  provider: Provider;
};

export default function ProviderCard({
  provider,
}: ProviderCardProps) {
  const [showProfile, setShowProfile] =
    useState(false);

  const [imageError, setImageError] =
    useState(false);

  const hasValidImage =
    provider.imageUrl && !imageError;

  return (
    <>
      <div className="provider-card">

        <div className="provider-image">
          {hasValidImage ? (
            <img
              src={provider.imageUrl}
              alt={provider.name}
              className="provider-photo"
              onError={() => {
                setImageError(true);
              }}
            />
          ) : (
            <div className="provider-placeholder">
              👤
            </div>
          )}
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

            <span>
              📍 {provider.location}
            </span>

            <span>
              ⭐ {provider.experience}+ years
            </span>

          </div>

          <div className="provider-bottom">

            <strong>
              {provider.price}
            </strong>

            <button
              type="button"
              className="provider-details-button"
              onClick={() =>
                setShowProfile(true)
              }
            >
              View Details →
            </button>

          </div>

        </div>

      </div>

      {showProfile && (
        <ProviderProfileModal
          providerId={String(provider.id)}
          onClose={() =>
            setShowProfile(false)
          }
        />
      )}
    </>
  );
  
}