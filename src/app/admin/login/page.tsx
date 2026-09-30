"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Admin login error:", error);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <main className={styles.loginPage}>
      <div className={styles.loginCard}>

        <div className={styles.logoBox}>
          🔧
        </div>

        <h1>HomeFix</h1>

        <p className={styles.subtitle}>
          Admin Portal
        </p>

        <div className={styles.welcome}>
          <h2>Welcome back</h2>

          <p>
            Sign in to manage providers and keep
            HomeFix safe and trusted.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className={styles.inputGroup}>
            <label htmlFor="email">
              Admin Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="admin@homefix.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">
              Password
            </label>

            <div className={styles.passwordBox}>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>
          </div>

          <div className={styles.formOptions}>

            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>

          </div>

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className={styles.loginButton}
          >
            Sign In
          </button>

        </form>

        <p className={styles.securityText}>
          🔒 Admin access is restricted to authorized
          HomeFix staff.
        </p>

      </div>
    </main>
  );
}