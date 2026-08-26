import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("");
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/vendors/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name: companyName,
          email: email,
          password: password,
          phone: phone || null,
          location: location || null,
          materials: [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to create vendor profile");
      }

      setMessage("Vendor profile created successfully! 🎉");

      setCompanyName("");
      setEmail("");
      setPhone("");
      setLocation("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background auth-glow-left" />
      <div className="auth-background auth-glow-right" />

      <Link to="/" className="auth-logo">
        <span className="logo-mark">B</span>
        <span>
          BID<span>WISE</span>
        </span>
      </Link>

      <main className="auth-container">
        <div className="auth-card register-card">
          <p className="eyebrow">GET STARTED</p>

          <h1>Create your vendor profile</h1>

          <p className="auth-subtitle">
            Tell us about your business and start discovering smarter tender
            opportunities.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Company name</label>
              <input
                type="text"
                placeholder="Enter your company name"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="City, State"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>

            {message && (
              <p
                className={
                  isError ? "form-message error" : "form-message success"
                }
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="primary-button auth-submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Creating Profile..."
                : "Create Vendor Profile →"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </main>

      <p className="auth-footer">
        © 2026 BidWise · Smarter tenders. Better decisions.
      </p>
    </div>
  );
}

export default RegisterPage;