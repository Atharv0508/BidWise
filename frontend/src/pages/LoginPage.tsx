import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/vendors/login?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      setIsError(false);
      setMessage(`Welcome back to BidWise, ${data.company_name}! 🎉`);

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
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
        <div className="auth-card">
          <p className="eyebrow">WELCOME BACK</p>

          <h1>Sign in to BidWise</h1>

          <p className="auth-subtitle">
            Access your tender intelligence workspace and discover new
            opportunities.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
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
              <div className="password-label">
                <label>Password</label>
                <button type="button">Forgot password?</button>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
              {isLoading ? "Signing In..." : "Sign In →"}
            </button>
          </form>

          <p className="auth-switch">
            New to BidWise?{" "}
            <Link to="/register">Create an account</Link>
          </p>
        </div>
      </main>

      <p className="auth-footer">
        © 2026 BidWise · Smarter tenders. Better decisions.
      </p>
    </div>
  );
}

export default LoginPage;