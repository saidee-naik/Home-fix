export default function RegisterPage() {
  return (
    <main className="register-page">

      <div className="register-container">

        <div className="register-header">
          <span className="section-label">GET STARTED</span>

          <h1>Create Your HomeFix Account</h1>

          <p>
            Register with HomeFix and find trusted professionals for your
            home service needs.
          </p>
        </div>

        <form className="register-form">

          <div className="form-group">
            <label htmlFor="name">Full Name</label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
            />
          </div>

          <button type="submit" className="register-submit">
            Create Account
          </button>

        </form>

      </div>

    </main>
  );
}