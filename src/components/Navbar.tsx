import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-content">

        {/* Logo */}
        <Link href="/" className="logo">
          <div className="logo-box">
            🔧
          </div>

          <span>HomeFix</span>
        </Link>

        {/* Navigation */}
        <nav className="nav-links">

          <Link href="#services" className="active">
            Find Services
          </Link>

          <Link href="#how-it-works">
            How It Works
          </Link>

          <Link href="#trusted-by-homeowners">
            Trust & Safety
          </Link>

        </nav>

        {/* Right side */}
        <div className="nav-right">

          <Link href="/provider" className="provider-link">
            Are you a Provider?
          </Link>

          <Link href="/register" className="register-btn">
            Register
          </Link>

        </div>

      </div>
    </header>
  );
}