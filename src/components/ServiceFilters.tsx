"use client";

type ServiceFiltersProps = {
  selectedCategories: string[];
  selectedExperience: string[];
  onCategoryChange: (category: string) => void;
  onExperienceChange: (experience: string) => void;
  onClear?: () => void;
};

const categories = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Painting",
  "HVAC",
  "Carpentry",
];

const experienceOptions = [
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

export default function ServiceFilters({
  selectedCategories,
  selectedExperience,
  onCategoryChange,
  onExperienceChange,
  onClear,
}: ServiceFiltersProps) {
  return (
    <aside className="service-filters">
      <div className="filters-header">
        <h3>Filters</h3>

        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="clear-filters"
          >
            Clear
          </button>
        )}
      </div>

      <div className="filter-section">
        <h4>Service Category</h4>

        {categories.map((category) => (
          <label
            key={category}
            className="filter-option"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onCategoryChange(category)}
            />

            <span>{category}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Experience</h4>

        {experienceOptions.map((experience) => (
          <label
            key={experience}
            className="filter-option"
          >
            <input
              type="checkbox"
              checked={selectedExperience.includes(experience)}
              onChange={() => onExperienceChange(experience)}
            />

            <span>{experience}</span>
          </label>
        ))}
      </div>
    </aside>
  );
}