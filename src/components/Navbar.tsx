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

          <Link href="#trust">
            Trust & Safety
          </Link>
        </nav>

        {/* Right side */}
        <div className="nav-right">
          <span className="provider-link">
            Are you a Provider?
          </span>

          <Link href="/are-you-a-provider" className="register-btn">
            Register
          </Link>
        </div>

      </div>
    </header>
  );
}