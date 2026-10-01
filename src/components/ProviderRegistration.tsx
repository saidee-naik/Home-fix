"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

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
  const [profileImage, setProfileImage] =
    useState<string | null>(null);

  const [description, setDescription] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // Location search state
  const [locationSearch, setLocationSearch] =
    useState("");

  const [selectedLocation, setSelectedLocation] =
    useState("");

  const [showLocationDropdown, setShowLocationDropdown] =
    useState(false);

  const locationRef = useRef<HTMLDivElement | null>(
    null
  );

  // Close location dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(
          event.target as Node
        )
      ) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Filter Goa locations based on what the user types
  const filteredLocations = goaLocations.filter(
    (location) =>
      location
        .toLowerCase()
        .includes(locationSearch.toLowerCase())
  );

  // Handle profile image preview
  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Validate image size
    const maxFileSize = 5 * 1024 * 1024;

    if (file.size > maxFileSize) {
      setErrorMessage(
        "Image size must be less than 5MB."
      );

      event.target.value = "";

      return;
    }

    // Validate image type
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage(
        "Only PNG, JPG, and WEBP images are allowed."
      );

      event.target.value = "";

      return;
    }

    // Clear previous errors
    setErrorMessage("");

    // Create image preview
    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
  };

  // Handle location typing
  const handleLocationChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setLocationSearch(value);

    // Clear previously selected location
    setSelectedLocation("");

    setShowLocationDropdown(true);
  };

  // Handle location selection
  const handleLocationSelect = (
    location: string
  ) => {
    setSelectedLocation(location);
    setLocationSearch(location);
    setShowLocationDropdown(false);
  };

  // Submit provider registration
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Reset previous messages
    setSubmitted(false);
    setErrorMessage("");

    // Make sure a valid Goa location is selected
    if (!goaLocations.includes(selectedLocation)) {
      setErrorMessage(
        "Please select a location from the Goa location list."
      );

      setShowLocationDropdown(true);

      return;
    }

    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      // Get selected profile image
      const imageFile = formData.get(
        "profileImage"
      );

      let imageUrl = "";

      // Upload image to Cloudinary
      if (
        imageFile instanceof File &&
        imageFile.size > 0
      ) {
        const imageFormData = new FormData();

        imageFormData.append(
          "file",
          imageFile
        );

        const uploadResponse = await fetch(
          "/api/upload/image",
          {
            method: "POST",
            body: imageFormData,
          }
        );

        const uploadResult =
          await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(
            uploadResult.message ||
              "Image upload failed."
          );
        }

        imageUrl = uploadResult.imageUrl;
      }

      // Collect provider details
      const providerData = {
        name: String(
          formData.get("fullName") || ""
        ).trim(),

        phone: String(
          formData.get("phone") || ""
        ).trim(),

        email: String(
          formData.get("email") || ""
        ).trim(),

        category: String(
          formData.get("service") || ""
        ).trim(),

        // Use selected Goa location
        location: selectedLocation,

        experience: Number(
          formData.get("experience")
        ),

        priceMin: Number(
          formData.get("minPrice")
        ),

        priceMax: Number(
          formData.get("maxPrice")
        ),

        description: description.trim(),

        // Cloudinary image URL
        imageUrl: imageUrl,
      };

      // Send provider data to backend
      const response = await fetch(
        "/api/providers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(providerData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Provider registration failed."
        );
      }

      // Successful registration
      setSubmitted(true);

      // Reset form fields
      form.reset();

      // Reset controlled fields
      setDescription("");
      setProfileImage(null);

      // Reset location
      setLocationSearch("");
      setSelectedLocation("");
      setShowLocationDropdown(false);

      console.log(
        "Provider registered successfully:",
        result
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setErrorMessage(message);

      console.error(
        "Provider registration error:",
        error
      );
    } finally {
      setIsSubmitting(false);
    }
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
            Join HomeFix and reach local homeowners in
            Goa. Showcase your skills, get more projects,
            and grow your business.
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
              Fill in your details to create your
              professional profile on HomeFix.
            </p>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="provider-success">
              Registration submitted successfully.
              Your profile is now pending admin review.
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="provider-error">
              {errorMessage}
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
                  placeholder="Call Now"
                  pattern="[6-9][0-9]{9}"
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
                <option
                  value=""
                  disabled
                >
                  Select a service
                </option>

                {serviceCategories.map(
                  (service) => (
                    <option
                      key={service}
                      value={service}
                    >
                      {service}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Location */}
            <div className="provider-field">
              <label htmlFor="location">
                Location in Goa <span>*</span>
              </label>

              <div
                ref={locationRef}
                style={{
                  position: "relative",
                }}
              >
                <div className="input-with-icon">
                  <span>⌾</span>

                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={locationSearch}
                    onChange={
                      handleLocationChange
                    }
                    onFocus={() => {
                      setShowLocationDropdown(
                        true
                      );
                    }}
                    placeholder="Type or select your location"
                    autoComplete="off"
                    required
                  />

                  <span
                    style={{
                      marginLeft: "auto",
                      pointerEvents: "none",
                      fontSize: "16px",
                    }}
                  >
                    ▾
                  </span>
                </div>

                {showLocationDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      zIndex: 100,
                      background: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "0 0 8px 8px",
                      maxHeight: "220px",
                      overflowY: "auto",
                      boxShadow:
                        "0 8px 20px rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    {filteredLocations.length >
                    0 ? (
                      filteredLocations.map(
                        (location) => (
                          <button
                            key={location}
                            type="button"
                            onClick={() =>
                              handleLocationSelect(
                                location
                              )
                            }
                            style={{
                              display: "block",
                              width: "100%",
                              padding:
                                "11px 14px",
                              border: "none",
                              background:
                                selectedLocation ===
                                location
                                  ? "#f0fdf4"
                                  : "#ffffff",
                              color: "#334155",
                              textAlign: "left",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                            onMouseEnter={(
                              event
                            ) => {
                              event.currentTarget.style.background =
                                "#f1f5f9";
                            }}
                            onMouseLeave={(
                              event
                            ) => {
                              event.currentTarget.style.background =
                                selectedLocation ===
                                location
                                  ? "#f0fdf4"
                                  : "#ffffff";
                            }}
                          >
                            {location}
                          </button>
                        )
                      )
                    ) : (
                      <div
                        style={{
                          padding: "12px 14px",
                          color: "#64748b",
                          fontSize: "14px",
                        }}
                      >
                        No Goa location found.
                      </div>
                    )}
                  </div>
                )}
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
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Profile Image */}
            <div className="provider-field">
              <label htmlFor="profileImage">
                Profile Image
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

              <small>
                Your image will be securely uploaded and
                stored.
              </small>
            </div>

            {/* Description */}
            <div className="provider-field">
              <label htmlFor="description">
                Professional Description{" "}
                <span>*</span>
              </label>

              <div className="description-wrapper">
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe your professional services..."
                  maxLength={500}
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
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
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : "Register"}

              {!isSubmitting && (
                <span>→</span>
              )}
            </button>

            {/* Review Message */}
            <div className="provider-review">
              <span>ⓘ</span>

              Your profile will be reviewed by the
              HomeFix admin team before going live.
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}