"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  FormEvent,
  KeyboardEvent,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation"; // use "next/router" if on the Pages Router

const services = [
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

/** Case-insensitive, trimmed exact-match lookup. */
function findExactMatch(items: string[], value: string) {
  return items.find(
    (item) => item.toLowerCase() === value.trim().toLowerCase()
  );
}

/* =========================================================
   Reusable validated combobox (service + location fields)
========================================================= */

type ComboBoxProps = {
  /** Unique prefix used to wire up ARIA ids */
  id: string;
  items: string[];
  value: string;
  onChange: (value: string) => void;
  error: string;
  onError: (message: string) => void;
  /** Error shown when a non-empty value matches nothing */
  invalidMessage: string;
  /** Message shown inside the list when filtering finds nothing */
  notFoundMessage: string;
  placeholder: string;
  label: string;
  wrapperClassName: string;
  containerClassName: string;
  listClassName?: string;
  inputRef?: { current: HTMLInputElement | null };
  icon: ReactNode;
  trailingIcon?: ReactNode;
  itemPrefix?: string;
  /** Runs after a suggestion is picked (e.g. focus the next field) */
  onSelected?: () => void;
};

function ComboBox({
  id,
  items,
  value,
  onChange,
  error,
  onError,
  invalidMessage,
  notFoundMessage,
  placeholder,
  label,
  wrapperClassName,
  containerClassName,
  listClassName,
  inputRef,
  icon,
  trailingIcon,
  itemPrefix,
  onSelected,
}: ComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement | null>(null);

  /* ⭐ CHANGED: prefix matching — only items that START WITH the
     typed text are shown (empty query shows the full list). */
  const query = value.trim().toLowerCase();

  const filteredItems = items.filter((item) =>
    item.toLowerCase().startsWith(query)
  );

  const closeList = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);

  const selectItem = (item: string) => {
    onChange(item);
    onError("");
    closeList();
    onSelected?.();
  };

  /**
   * Runs whenever the user "leaves" the field
   * (click outside, Tab, or Enter):
   *  - valid value   -> normalise casing, clear error
   *  - invalid value -> show error
   *  - empty value   -> leave the error state alone (submit handles it)
   */
  const commit = useCallback(() => {
    if (value.trim()) {
      const match = findExactMatch(items, value);
      if (match) {
        if (match !== value) onChange(match);
        onError("");
      } else {
        onError(invalidMessage);
      }
    }
    closeList();
  }, [value, items, onChange, onError, invalidMessage, closeList]);

  /* Close + validate when clicking anywhere outside this field. */
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        commit();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () =>
      document.removeEventListener("mousedown", handleMouseDown);
  }, [commit]);

  /* Keep the keyboard-highlighted option scrolled into view. */
  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      activeItemRef.current?.scrollIntoView({ block: "nearest" });
    }
  }, [isOpen, activeIndex]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      // Arrow keys re-open a closed list
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((prev) =>
          filteredItems.length
            ? (prev + 1) % filteredItems.length
            : -1
        );
        break;

      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((prev) =>
          filteredItems.length
            ? prev <= 0
              ? filteredItems.length - 1
              : prev - 1
            : -1
        );
        break;

      case "Enter":
        // Highlighted option? Pick it instead of submitting.
        if (activeIndex >= 0 && filteredItems[activeIndex]) {
          event.preventDefault();
          selectItem(filteredItems[activeIndex]);
        } else {
          // Otherwise commit this field, then let the form submit.
          commit();
        }
        break;

      case "Escape":
        event.preventDefault();
        closeList();
        break;

      case "Tab":
        commit();
        break;

      default:
        break;
    }
  };

  return (
    <div className={wrapperClassName} ref={wrapperRef}>
      <div className={containerClassName}>
        {icon}

        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-label={label}
          aria-expanded={isOpen}
          aria-controls={`${id}-listbox`}
          aria-autocomplete="list"
          aria-activedescendant={
            isOpen && activeIndex >= 0
              ? `${id}-option-${activeIndex}`
              : undefined
          }
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(event) => {
            onChange(event.target.value);
            onError("");
            setActiveIndex(-1);
            setIsOpen(true);
          }}
          onFocus={() => {
            // Don't auto-open while an error is showing
            // (e.g. right after a failed submit).
            if (!error) {
              setIsOpen(true);
              setActiveIndex(-1);
            }
          }}
          onClick={() => {
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
        />

        {trailingIcon}
      </div>

      {isOpen && (
        <div
          className={["suggestion-list", listClassName]
            .filter(Boolean)
            .join(" ")}
          role="listbox"
          id={`${id}-listbox`}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <button
                type="button"
                key={item}
                role="option"
                id={`${id}-option-${index}`}
                aria-selected={index === activeIndex}
                ref={index === activeIndex ? activeItemRef : undefined}
                className={
                  index === activeIndex
                    ? "suggestion-item active"
                    : "suggestion-item"
                }
                // Keep focus on the input so clicking an option
                // never races with blur/validation.
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectItem(item)}
              >
                {itemPrefix ? `${itemPrefix} ${item}` : item}
              </button>
            ))
          ) : (
            <div className="no-suggestion" role="status">
              {notFoundMessage}
            </div>
          )}
        </div>
      )}

      {/* Hidden while the list is open so the two never overlap. */}
      {error && !isOpen && (
        <div className="search-error" role="alert" id={`${id}-error`}>
          {error}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const router = useRouter();

  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  const [serviceError, setServiceError] = useState("");
  const [locationError, setLocationError] = useState("");

  const serviceInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedService = findExactMatch(services, service);
    const selectedLocation = findExactMatch(goaLocations, location);

    let fieldToFocus: { current: HTMLInputElement | null } | null = null;

    if (!selectedService) {
      setServiceError(
        service.trim()
          ? "Please select a service provided by HomeFix."
          : "Please select a service to continue."
      );
      fieldToFocus = serviceInputRef;
    } else {
      setServiceError("");
    }

    if (!selectedLocation) {
      setLocationError(
        location.trim()
          ? "Please select a valid location in Goa."
          : "Please select a location to continue."
      );
      if (!fieldToFocus) fieldToFocus = locationInputRef;
    } else {
      setLocationError("");
    }

    if (fieldToFocus) {
      // Focus on the next frame (after the error has rendered)
      // so the suggestion list doesn't open over the error.
      requestAnimationFrame(() => {
        fieldToFocus?.current?.focus();
      });
      return;
    }

    router.push(
      `/services?service=${encodeURIComponent(selectedService)}` +
        `&location=${encodeURIComponent(selectedLocation)}`
    );
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          TRUSTED HOME SERVICES IN GOA
        </div>

        <h1>
          Find Trusted Local
          <br />
          Professionals For Your Home
        </h1>

        <p>
          Verified professionals, background-checked, and licensed
          for any home service project.
        </p>

        {/* SEARCH FORM */}
        <form className="search-box" onSubmit={handleSearch} noValidate>
          {/* SERVICE */}
          <ComboBox
            id="service-search"
            label="Service"
            items={services}
            value={service}
            onChange={setService}
            error={serviceError}
            onError={setServiceError}
            invalidMessage="Please select a service provided by HomeFix."
            notFoundMessage="Service not available"
            placeholder="What service do you need? (e.g. Plumbing)"
            wrapperClassName="search-service-wrapper"
            containerClassName="search-service"
            icon={<span className="search-icon">⌕</span>}
            inputRef={serviceInputRef}
            onSelected={() => locationInputRef.current?.focus()}
          />

          {/* LOCATION */}
          <ComboBox
            id="location-search"
            label="Location in Goa"
            items={goaLocations}
            value={location}
            onChange={setLocation}
            error={locationError}
            onError={setLocationError}
            invalidMessage="Please select a valid location in Goa."
            notFoundMessage="No matching Goa location"
            placeholder="Select location in Goa"
            wrapperClassName="search-location-wrapper"
            containerClassName="search-location"
            listClassName="location-list"
            icon={<span className="location-icon">⌾</span>}
            trailingIcon={<span className="location-arrow">▾</span>}
            itemPrefix="⌾"
            inputRef={locationInputRef}
            onSelected={() => searchButtonRef.current?.focus()}
          />

          {/* SEARCH BUTTON */}
          <button
            type="submit"
            className="search-button"
            ref={searchButtonRef}
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}