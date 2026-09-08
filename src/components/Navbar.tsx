export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-content">

        <a href="#" className="logo">
          <div className="logo-box">
            🔧
          </div>

          <span>HomeFix</span>
        </a>

        <nav className="nav-links">
          <a href="#services" className="active">
            Find Services
          </a>

          <a href="#how-it-works">
            How It Works
          </a>

          <a href="#trust">
            Trust & Safety
          </a>
        </nav>

        <div className="nav-right">
          <span>Are you a Provider?</span>

          <button>
            Register
          </button>
        </div>

      </div>
    </header>
  );
}