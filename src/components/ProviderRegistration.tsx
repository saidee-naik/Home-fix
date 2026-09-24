"use client";

import { FormEvent, useState } from "react";

const goaLocations = [
  "Panaji",
  "Margao",
  "Vasco da Gama",
  "Mapusa",
  "Ponda",
  "Porvorim",
  "Calangute",
  "Candolim",
  "Baga",
  "Anjuna",
  "Arpora",
  "Assagao",
  "Siolim",
  "Morjim",
  "Pernem",
  "Bicholim",
  "Sanquelim",
  "Valpoi",
  "Quepem",
  "Curchorem",
  "Cuncolim",
  "Navelim",
  "Colva",
  "Betalbatim",
  "Chinchinim",
  "Canacona",
  "Palolem",
];

const serviceCategories = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Painting",
  "HVAC",
  "Carpentry",
  "Pest Control",
  "Home Renovation",
  "Bathroom Services",
  "Locksmith",
  "Gardening",
  "Moving Services",
];

export default function ProviderRegistration() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(true);

    console.log("Provider registration submitted");
  };

  return (
    <main className="provider-page">

      {/* Hero Header */}
      <section className="provider-hero">

        <div className="container">

          <span className="provider-hero-label">
            JOIN HOMEFIX
          </span>

          <h1>
            Register as a Home Service Professional
          </h1>

          <p>
            Join HomeFix and reach local homeowners in Goa.
            Showcase your skills, get more projects, and grow your business.
          </p>

        </div>

      </section>


      {/* Registration Form */}
      <section className="provider-form-section">

        <div className="provider-form-container">

          <div className="provider-form-header">

            <h2>
              Provider Registration
            </h2>

            <p>
              Fill in your details to create your professional profile on HomeFix.
            </p>

          </div>


          {submitted && (
            <div className="provider-success">
              Registration form submitted successfully.
              Database connection will be added later.
            </div>
          )}


          <form
            className="provider-form"
            onSubmit={handleSubmit}
          >

            {/* Full Name */}
            <div className="provider-field">

              <label htmlFor="fullName">
                Full Name <span>*</span>
              </label>

              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Rahul Plumbing Services"
                required
              />

            </div>


            {/* Phone */}
            <div className="provider-field">

              <label htmlFor="phone">
                Phone Number <span>*</span>
              </label>

              <div className="input-with-icon">

                <span>⌕</span>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                />

              </div>

            </div>


            {/* Email */}
            <div className="provider-field">

              <label htmlFor="email">
                Email <span>*</span>
              </label>

              <div className="input-with-icon">

                <span>✉</span>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="rahul@example.com"
                  required
                />

              </div>

            </div>


            {/* Service Category */}
            <div className="provider-field">

              <label htmlFor="service">
                Service Category <span>*</span>
              </label>

              <select
                id="service"
                name="service"
                defaultValue=""
                required
              >

                <option value="" disabled>
                  Select a service
                </option>

                {serviceCategories.map((service) => (
                  <option
                    key={service}
                    value={service}
                  >
                    {service}
                  </option>
                ))}

              </select>

            </div>


            {/* Location */}
            <div className="provider-field">

              <label htmlFor="location">
                Location in Goa <span>*</span>
              </label>

              <div className="input-with-icon">

                <span>⌾</span>

                <select
                  id="location"
                  name="location"
                  defaultValue=""
                  required
                >

                  <option value="" disabled>
                    Select your location
                  </option>

                  {goaLocations.map((location) => (
                    <option
                      key={location}
                      value={location}
                    >
                      {location}
                    </option>
                  ))}

                </select>

              </div>

            </div>


            {/* Experience */}
            <div className="provider-field">

              <label htmlFor="experience">
                Years of Experience <span>*</span>
              </label>

              <input
                type="number"
                id="experience"
                name="experience"
                placeholder="5"
                min="0"
                max="60"
                required
              />

            </div>


            {/* Minimum Price */}
            <div className="provider-field">

              <label htmlFor="minPrice">
                Minimum Price (₹) <span>*</span>
              </label>

              <div className="input-with-icon">

                <span>₹</span>

                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  placeholder="300"
                  min="0"
                  required
                />

              </div>

            </div>


            {/* Maximum Price */}
            <div className="provider-field">

              <label htmlFor="maxPrice">
                Maximum Price (₹) <span>*</span>
              </label>

              <div className="input-with-icon">

                <span>₹</span>

                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  placeholder="1000"
                  min="0"
                  required
                />

              </div>

            </div>


            {/* Profile Image */}
            <div className="provider-field">

              <label htmlFor="profileImage">
                Profile Image <span>*</span>
              </label>

              <div className="profile-image-area">

                <label
                  htmlFor="profileImage"
                  className="image-upload-box"
                >

                  <div className="upload-icon">
                    ☁
                  </div>

                  <strong>
                    Click to upload an image
                  </strong>

                  <small>
                    PNG, JPG or WEBP (Max 5MB)
                  </small>

                </label>

                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  required
                  hidden
                />


                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile preview"
                    className="profile-preview"
                  />
                ) : (
                  <div className="profile-placeholder">
                    👤
                  </div>
                )}

              </div>

            </div>


            {/* Description */}
            <div className="provider-field">

              <label htmlFor="description">
                Professional Description <span>*</span>
              </label>

              <div className="description-wrapper">

                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe your professional services..."
                  maxLength={500}
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  required
                />

                <span className="character-count">
                  {description.length}/500
                </span>

              </div>

            </div>


            {/* Terms */}
            <div className="provider-terms">

              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
              />

              <label htmlFor="terms">
                I agree to the{" "}
                <a href="/terms">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy">
                  Privacy Policy
                </a>{" "}
                of HomeFix.
              </label>

            </div>


            {/* Submit */}
            <button
              type="submit"
              className="provider-submit"
            >
              Submit Registration
              <span>→</span>
            </button>


            {/* Review message */}
            <div className="provider-review">

              <span>
                ⓘ
              </span>

              Your profile will be reviewed by the HomeFix admin
              team before going live.

            </div>

          </form>

        </div>

      </section>

    </main>
  );
}