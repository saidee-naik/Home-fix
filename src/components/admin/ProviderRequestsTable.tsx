"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "@/app/admin/dashboard/dashboard.module.css";

type Provider = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  category: string;
  location: string;
  experience: number;
  priceMin: number;
  priceMax: number;
  imageUrl: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

type SortOption =
  | "newest"
  | "oldest"
  | "name_asc"
  | "name_desc";

export default function ProviderRequestsTable() {
  const router = useRouter();

  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const [sort, setSort] = useState<SortOption>("newest");

  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const [totalPages, setTotalPages] = useState(1);
  const [totalProviders, setTotalProviders] = useState(0);

  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // View provider state
  const [selectedProvider, setSelectedProvider] =
    useState<Provider | null>(null);

  const [viewLoading, setViewLoading] = useState(false);

  // Add provider state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const [newProvider, setNewProvider] = useState({
    name: "",
    phone: "",
    email: "",
    category: "Plumbing",
    location: "",
    experience: "",
    priceMin: "",
    priceMax: "",
    imageUrl: "",
    description: "",
  });

  const fetchProviders = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (status !== "all") {
        params.set("status", status);
      }

      if (category !== "all") {
        params.set("category", category);
      }

      if (search.trim()) {
        params.set("search", search.trim());
      }

      params.set("sort", sort);
      params.set("page", page.toString());
      params.set("limit", limit.toString());

      const response = await fetch(
        `/api/admin/providers?${params.toString()}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch providers"
        );
      }

      setProviders(data.providers || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalProviders(data.pagination?.totalProviders || 0);
    } catch (error) {
      console.error("Provider fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [status, category, search, sort, page]);

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleSort = () => {
    setPage(1);

    if (sort === "newest") {
      setSort("oldest");
    } else if (sort === "oldest") {
      setSort("name_asc");
    } else if (sort === "name_asc") {
      setSort("name_desc");
    } else {
      setSort("newest");
    }
  };

  const updateProviderStatus = async (
    id: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      setActionLoading(id);

      const response = await fetch(
        `/api/admin/providers/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update provider"
        );
      }

      window.location.reload();
    } catch (error) {
      console.error("Provider status update error:", error);
      alert("Failed to update provider status.");
    } finally {
      setActionLoading(null);
    }
  };

  // View provider details
  const handleViewProvider = async (id: string) => {
    try {
      setViewLoading(true);

      const response = await fetch(
        `/api/admin/providers/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch provider details"
        );
      }

      setSelectedProvider(data.provider);
    } catch (error) {
      console.error("Provider details error:", error);
      alert("Failed to load provider details.");
    } finally {
      setViewLoading(false);
    }
  };

  const closeProviderModal = () => {
    setSelectedProvider(null);
  };

  const handleAddProvider = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setAddError("");

    if (Number(newProvider.priceMin) > Number(newProvider.priceMax)) {
      setAddError("Minimum price cannot be greater than maximum price.");
      return;
    }

    try {
      setAddLoading(true);

      const response = await fetch("/api/admin/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: newProvider.name.trim(),
          phone: newProvider.phone.trim(),
          email: newProvider.email.trim(),
          category: newProvider.category,
          location: newProvider.location.trim(),
          experience: Number(newProvider.experience),
          priceMin: Number(newProvider.priceMin),
          priceMax: Number(newProvider.priceMax),
          imageUrl: newProvider.imageUrl.trim(),
          description: newProvider.description.trim(),
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        setAddError(data.message || "Failed to add provider.");
        return;
      }

      setShowAddModal(false);
      setNewProvider({
        name: "",
        phone: "",
        email: "",
        category: "Plumbing",
        location: "",
        experience: "",
        priceMin: "",
        priceMax: "",
        imageUrl: "",
        description: "",
      });

      await fetchProviders();
    } catch (error) {
      console.error("Add provider error:", error);
      setAddError("Something went wrong. Please try again.");
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteProvider = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(id);

      const response = await fetch(`/api/admin/providers/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete provider");
      }

      window.location.reload();
    } catch (error) {
      console.error("Provider delete error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete provider."
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  const getStatusLabel = (providerStatus: Provider["status"]) => {
    if (providerStatus === "pending") return "Pending";
    if (providerStatus === "approved") return "Approved";
    return "Rejected";
  };

  const getSortLabel = () => {
    switch (sort) {
      case "oldest":
        return "Oldest";
      case "name_asc":
        return "Name A-Z";
      case "name_desc":
        return "Name Z-A";
      case "newest":
      default:
        return "Newest";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTimeAgo = (date: string) => {
    const createdDate = new Date(date);
    const now = new Date();

    const difference =
      now.getTime() - createdDate.getTime();

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    const hours = Math.floor(minutes / 60);

    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }

    return "Just now";
  };

  return (
    <>
      <section className={styles.requestsCard}>

        <div className={styles.requestsHeader}>

          <div>
            <h2>Recent Provider Requests</h2>

            <p>
              Review and manage new provider registrations.
            </p>
          </div>

          <div className={styles.requestActions}>

            <button
              className={styles.addButton}
              onClick={() => {
                setAddError("");
                setShowAddModal(true);
              }}
            >
              + Add Provider
            </button>

            <button
              className={styles.viewAllButton}
              onClick={() => {
                setStatus("all");
                setCategory("all");
                setSearch("");
                setPage(1);
              }}
            >
              View All →
            </button>

          </div>

        </div>

        <div className={styles.tableControls}>

          <select
            value={status}
            onChange={(e) =>
              handleStatusChange(e.target.value)
            }
          >
            <option value="all">
              All Status
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="approved">
              Approved
            </option>

            <option value="rejected">
              Rejected
            </option>
          </select>

          <select
            value={category}
            onChange={(e) =>
              handleCategoryChange(e.target.value)
            }
          >
            <option value="all">
              All Categories
            </option>

            <option value="Plumbing">
              Plumbing
            </option>

            <option value="Electrical">
              Electrical
            </option>

            <option value="Carpentry">
              Carpentry
            </option>

            <option value="Cleaning">
              Cleaning
            </option>

            <option value="HVAC">
              HVAC
            </option>

            <option value="Painting">
              Painting
            </option>
          </select>

          <input
            type="text"
            placeholder="Search by name, email, or location..."
            value={search}
            onChange={handleSearchChange}
          />

          <button onClick={handleSort}>
            ⇅ Sort: {getSortLabel()}
          </button>

        </div>

        <div className={styles.tableWrapper}>

          <table>

            <thead>
              <tr>
                <th>Provider</th>
                <th>Category</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Applied On</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan={7}>
                    Loading providers...
                  </td>
                </tr>

              ) : providers.length === 0 ? (

                <tr>
                  <td colSpan={7}>
                    No providers found.
                  </td>
                </tr>

              ) : (

                providers.map((provider) => (

                  <tr key={provider._id}>

                    <td>
                      <div className={styles.providerCell}>

                        <img
                          src={
                            provider.imageUrl ||
                            "/images/providers/provider-1.jpg"
                          }
                          alt={provider.name}
                        />

                        <div>
                          <strong>
                            {provider.name}
                          </strong>

                          <span>
                            {provider.experience} years experience
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span
                        className={`${styles.categoryBadge} ${
                          styles[
                            provider.category.toLowerCase()
                          ]
                        }`}
                      >
                        {provider.category}
                      </span>
                    </td>

                    <td>
                      📍 {provider.location}
                    </td>

                    <td>
                      <div className={styles.contactCell}>
                        <span>
                          ☎ {provider.phone}
                        </span>

                        <span>
                          ✉ {provider.email}
                        </span>
                      </div>
                    </td>

                    <td>
                      <strong>
                        {formatDate(provider.createdAt)}
                      </strong>

                      <span className={styles.time}>
                        {getTimeAgo(provider.createdAt)}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          provider.status === "pending"
                            ? styles.pending
                            : provider.status === "approved"
                            ? styles.approved
                            : styles.rejected
                        }`}
                      >
                        {getStatusLabel(provider.status)}
                      </span>
                    </td>

                    <td>
                      <div className={styles.actions}>

                        <button
                          onClick={() =>
                            handleViewProvider(provider._id)
                          }
                          disabled={
                            viewLoading
                          }
                        >
                          {viewLoading ? "Loading..." : "View"}
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteProvider(
                              provider._id,
                              provider.name
                            )
                          }
                          disabled={deleteLoading === provider._id}
                          style={{
                            border: "1px solid #dc2626",
                            background: "#ffffff",
                            color: "#dc2626",
                            padding: "6px 10px",
                            borderRadius: "6px",
                            cursor:
                              deleteLoading === provider._id
                                ? "not-allowed"
                                : "pointer",
                            fontWeight: 600,
                            opacity:
                              deleteLoading === provider._id ? 0.6 : 1,
                          }}
                        >
                          {deleteLoading === provider._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                        {provider.status === "pending" && (
                          <>
                            <button
                              className={styles.approve}
                              disabled={
                                actionLoading === provider._id
                              }
                              onClick={() =>
                                updateProviderStatus(
                                  provider._id,
                                  "approved"
                                )
                              }
                            >
                              ✓
                            </button>

                            <button
                              className={styles.reject}
                              disabled={
                                actionLoading === provider._id
                              }
                              onClick={() =>
                                updateProviderStatus(
                                  provider._id,
                                  "rejected"
                                )
                              }
                            >
                              ×
                            </button>
                          </>
                        )}

                      </div>
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        <div className={styles.tableFooter}>

          <span>
            {totalProviders === 0
              ? "No providers found"
              : `Showing ${
                  (page - 1) * limit + 1
                } to ${
                  Math.min(
                    page * limit,
                    totalProviders
                  )
                } of ${totalProviders} providers`}
          </span>

          <div>

            <button
              disabled={page === 1}
              onClick={() =>
                setPage((current) =>
                  Math.max(current - 1, 1)
                )
              }
            >
              ‹
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((pageNumber) => (

              <button
                key={pageNumber}
                className={
                  pageNumber === page
                    ? styles.pageActive
                    : ""
                }
                onClick={() =>
                  setPage(pageNumber)
                }
              >
                {pageNumber}
              </button>

            ))}

            <button
              disabled={page === totalPages}
              onClick={() =>
                setPage((current) =>
                  Math.min(
                    current + 1,
                    totalPages
                  )
                )
              }
            >
              ›
            </button>

          </div>

        </div>

      </section>

      {/* Provider Details Modal */}

      {selectedProvider && (
        <div
          onClick={closeProviderModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#ffffff",
              borderRadius: "16px",
              padding: "28px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    color: "#0f2d52",
                  }}
                >
                  Provider Details
                </h2>

                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#64748b",
                  }}
                >
                  Complete provider information
                </p>
              </div>

              <button
                onClick={closeProviderModal}
                style={{
                  border: "none",
                  background: "#f1f5f9",
                  borderRadius: "8px",
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px",
                background: "#f8fafc",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            >
              <img
                src={
                  selectedProvider.imageUrl ||
                  "/images/providers/provider-1.jpg"
                }
                alt={selectedProvider.name}
                style={{
                  width: "72px",
                  height: "72px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />

              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    color: "#0f2d52",
                  }}
                >
                  {selectedProvider.name}
                </h3>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#64748b",
                  }}
                >
                  {selectedProvider.category}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: "16px",
              }}
            >
              <div>
                <small style={{ color: "#64748b" }}>
                  Phone
                </small>

                <p style={{ margin: "4px 0" }}>
                  {selectedProvider.phone}
                </p>
              </div>

              <div>
                <small style={{ color: "#64748b" }}>
                  Email
                </small>

                <p style={{ margin: "4px 0" }}>
                  {selectedProvider.email}
                </p>
              </div>

              <div>
                <small style={{ color: "#64748b" }}>
                  Location
                </small>

                <p style={{ margin: "4px 0" }}>
                  {selectedProvider.location}
                </p>
              </div>

              <div>
                <small style={{ color: "#64748b" }}>
                  Experience
                </small>

                <p style={{ margin: "4px 0" }}>
                  {selectedProvider.experience} years
                </p>
              </div>

              <div>
                <small style={{ color: "#64748b" }}>
                  Minimum Price
                </small>

                <p style={{ margin: "4px 0" }}>
                  ₹{selectedProvider.priceMin}
                </p>
              </div>

              <div>
                <small style={{ color: "#64748b" }}>
                  Maximum Price
                </small>

                <p style={{ margin: "4px 0" }}>
                  ₹{selectedProvider.priceMax}
                </p>
              </div>

              <div>
                <small style={{ color: "#64748b" }}>
                  Status
                </small>

                <p
                  style={{
                    margin: "4px 0",
                    fontWeight: 600,
                  }}
                >
                  {getStatusLabel(
                    selectedProvider.status
                  )}
                </p>
              </div>

              <div>
                <small style={{ color: "#64748b" }}>
                  Applied On
                </small>

                <p style={{ margin: "4px 0" }}>
                  {formatDate(
                    selectedProvider.createdAt
                  )}
                </p>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                paddingTop: "20px",
                borderTop: "1px solid #e2e8f0",
              }}
            >
              <small style={{ color: "#64748b" }}>
                Description
              </small>

              <p
                style={{
                  margin: "6px 0 0",
                  lineHeight: 1.6,
                  color: "#334155",
                }}
              >
                {selectedProvider.description ||
                  "No description provided."}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "24px",
              }}
            >
              {selectedProvider.status === "pending" && (
                <>
                  <button
                    onClick={async () => {
                      await updateProviderStatus(
                        selectedProvider._id,
                        "approved"
                      );

                      setSelectedProvider(null);
                    }}
                    style={{
                      border: "none",
                      background: "#16a34a",
                      color: "#ffffff",
                      padding: "10px 18px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Approve
                  </button>

                  <button
                    onClick={async () => {
                      await updateProviderStatus(
                        selectedProvider._id,
                        "rejected"
                      );

                      setSelectedProvider(null);
                    }}
                    style={{
                      border: "none",
                      background: "#dc2626",
                      color: "#ffffff",
                      padding: "10px 18px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Reject
                  </button>
                </>
              )}

              <button
                onClick={closeProviderModal}
                style={{
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                  color: "#334155",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}


      {/* Add Provider Modal */}
      {showAddModal && (
        <div
          onClick={() => {
            if (!addLoading) setShowAddModal(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "650px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#ffffff",
              borderRadius: "16px",
              padding: "28px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: "24px", color: "#0f2d52" }}>
                  Add Provider
                </h2>
                <p style={{ margin: "6px 0 0", color: "#64748b" }}>
                  Add a new service provider to HomeFix.
                </p>
              </div>

              <button
                type="button"
                disabled={addLoading}
                onClick={() => setShowAddModal(false)}
                style={{
                  border: "none",
                  background: "#f1f5f9",
                  borderRadius: "8px",
                  width: "36px",
                  height: "36px",
                  cursor: addLoading ? "not-allowed" : "pointer",
                  fontSize: "20px",
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddProvider}>
              {addError && (
                <div
                  style={{
                    background: "#fef2f2",
                    color: "#dc2626",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    fontSize: "14px",
                  }}
                >
                  {addError}
                </div>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "16px",
                }}
              >
                {[
                  ["name", "Provider Name", "text", "Enter provider name"],
                  ["phone", "Phone", "text", "Enter phone number"],
                  ["email", "Email", "email", "Enter email"],
                  ["location", "Location", "text", "Enter location"],
                  ["experience", "Experience (years)", "number", "e.g. 5"],
                  ["priceMin", "Minimum Price", "number", "e.g. 500"],
                  ["priceMax", "Maximum Price", "number", "e.g. 2000"],
                ].map(([key, label, type, placeholder]) => (
                  <div key={key}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#334155",
                      }}
                    >
                      {label} *
                    </label>
                    <input
                      type={type}
                      required
                      min={type === "number" ? "0" : undefined}
                      value={newProvider[key as keyof typeof newProvider]}
                      onChange={(e) =>
                        setNewProvider({
                          ...newProvider,
                          [key]: e.target.value,
                        })
                      }
                      placeholder={placeholder}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "11px",
                        marginTop: "6px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#334155",
                    }}
                  >
                    Category *
                  </label>
                  <select
                    required
                    value={newProvider.category}
                    onChange={(e) =>
                      setNewProvider({
                        ...newProvider,
                        category: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "11px",
                      marginTop: "6px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      background: "#ffffff",
                    }}
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Painting">Painting</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#334155",
                  }}
                >
                  Image URL
                </label>
                <input
                  type="text"
                  value={newProvider.imageUrl}
                  onChange={(e) =>
                    setNewProvider({
                      ...newProvider,
                      imageUrl: e.target.value,
                    })
                  }
                  placeholder="Optional image URL"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "11px",
                    marginTop: "6px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                  }}
                />
              </div>

              <div style={{ marginTop: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#334155",
                  }}
                >
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newProvider.description}
                  onChange={(e) =>
                    setNewProvider({
                      ...newProvider,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter provider description"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "11px",
                    marginTop: "6px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    resize: "vertical",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "24px",
                }}
              >
                <button
                  type="button"
                  disabled={addLoading}
                  onClick={() => setShowAddModal(false)}
                  style={{
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    color: "#334155",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: addLoading ? "not-allowed" : "pointer",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={addLoading}
                  style={{
                    border: "none",
                    background: "#0f2d52",
                    color: "#ffffff",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: addLoading ? "not-allowed" : "pointer",
                    fontWeight: 600,
                    opacity: addLoading ? 0.7 : 1,
                  }}
                >
                  {addLoading ? "Adding..." : "Add Provider"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}