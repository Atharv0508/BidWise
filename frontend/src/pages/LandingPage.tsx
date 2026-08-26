import { Link } from "react-router-dom";
import "../App.css";

function LandingPage() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <a href="#home" className="logo">
          <span className="logo-mark">B</span>
          <span>
            BID<span>WISE</span>
          </span>
        </a>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#platform">Platform</a>
          <a href="#architecture">Architecture</a>
        </div>

        <div className="nav-actions">
            <Link to="/login" className="sign-in">
                Sign In
            </Link>

            <Link to="/register" className="primary-button">
                Get Started →
            </Link>
        </div>
      </nav>

      {/* Hero */}
      <main id="home">
        <section className="hero">
          <div className="hero-glow glow-left" />
          <div className="hero-glow glow-right" />

          <div className="hero-content">
            <div className="badge">
              <span className="status-dot" />
              AI-Powered Tender Intelligence Platform
            </div>

            <h1>
              Smarter tenders.
              <br />
              <span>Better decisions.</span>
            </h1>

            <p className="hero-description">
              BidWise helps businesses discover opportunities, analyze tender
              requirements, manage vendors, and make faster, more informed
              bidding decisions.
            </p>

            <div className="hero-buttons">
                <Link to="/register" className="primary-button large">
                    Explore BidWise →
                </Link>

                <a href="#platform" className="secondary-button large">
                    Learn More
                </a>
            </div>

            <div className="stats">
              <div className="stat">
                <strong>AI-Powered</strong>
                <span>Intelligent analysis</span>
              </div>

              <div className="stat">
                <strong>FastAPI</strong>
                <span>Scalable backend</span>
              </div>

              <div className="stat">
                <strong>MongoDB</strong>
                <span>Flexible data storage</span>
              </div>

              <div className="stat">
                <strong>React</strong>
                <span>Modern user experience</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section id="platform" className="preview-section">
          <div className="section-heading">
            <p className="eyebrow">THE BIDWISE PLATFORM</p>
            <h2>Everything you need to manage the tender journey.</h2>
            <p>
              From discovering opportunities to finding the right vendors,
              BidWise brings your workflow into one intelligent platform.
            </p>
          </div>

          <div className="dashboard-window">
            <div className="window-header">
              <div className="window-brand">
                <span className="mini-logo">B</span>
                BidWise Dashboard
              </div>

              <div className="window-search">⌕ Search tenders, vendors...</div>

              <div className="user-avatar">A</div>
            </div>

            <div className="dashboard-body">
              <aside className="sidebar">
                <span className="sidebar-active">⌂ Overview</span>
                <span>◈ Tenders</span>
                <span>♙ Vendors</span>
                <span>◫ Documents</span>
                <span>◌ Analytics</span>
              </aside>

              <div className="dashboard-content">
                <h3>Welcome back 👋</h3>
                <p className="dashboard-subtitle">
                  Here's what's happening with your opportunities.
                </p>

                <div className="dashboard-cards">
                  <div className="dashboard-card">
                    <span>Active Tenders</span>
                    <strong>24</strong>
                    <small>↑ 12% this month</small>
                  </div>

                  <div className="dashboard-card">
                    <span>Matched Vendors</span>
                    <strong>86</strong>
                    <small>↑ 8 new matches</small>
                  </div>

                  <div className="dashboard-card">
                    <span>Documents</span>
                    <strong>142</strong>
                    <small>Ready for analysis</small>
                  </div>
                </div>

                <div className="tender-list">
                  <div className="list-header">
                    <h4>Recent Opportunities</h4>
                    <button>View all →</button>
                  </div>

                  <div className="tender-item">
                    <div>
                      <strong>Infrastructure Development Project</strong>
                      <span>Open Tender • Maharashtra</span>
                    </div>
                    <span className="match-score">92% Match</span>
                  </div>

                  <div className="tender-item">
                    <div>
                      <strong>IT Services & Digital Transformation</strong>
                      <span>Open Tender • Government</span>
                    </div>
                    <span className="match-score">87% Match</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="features-section">
          <div className="feature-intro">
            <span className="number gradient-purple">01.</span>

            <div>
              <h2>
                Discover the right
                <br />
                <span>opportunities.</span>
              </h2>
              <p>
                Stop manually searching through countless portals. BidWise helps
                organize and surface opportunities that matter to your business.
              </p>
            </div>
          </div>

          <div className="feature-grid">
            <FeatureCard
              icon="⌕"
              title="Smart Tender Search"
              description="Search and filter tenders based on your requirements."
            />
            <FeatureCard
              icon="◉"
              title="Opportunity Matching"
              description="Identify tenders relevant to your business profile."
            />
            <FeatureCard
              icon="◷"
              title="Deadline Tracking"
              description="Stay ahead of important tender submission dates."
            />
          </div>

          <div className="feature-intro reverse">
            <span className="number gradient-blue">02.</span>

            <div>
              <h2>
                Analyze complex
                <br />
                <span>tender documents.</span>
              </h2>
              <p>
                Use intelligent analysis to understand tender requirements,
                specifications, eligibility criteria, and important conditions.
              </p>
            </div>
          </div>

          <div className="feature-grid">
            <FeatureCard
              icon="▤"
              title="Document Processing"
              description="Organize tender documents in one central workspace."
            />
            <FeatureCard
              icon="✓"
              title="Requirement Analysis"
              description="Identify important requirements and eligibility criteria."
            />
            <FeatureCard
              icon="◈"
              title="AI Assistance"
              description="Build toward AI-powered insights for faster decisions."
            />
          </div>

          <div className="feature-intro">
            <span className="number gradient-pink">03.</span>

            <div>
              <h2>
                Connect with the
                <br />
                <span>right vendors.</span>
              </h2>
              <p>
                Build and manage vendor profiles with materials, capabilities,
                specifications, and business information in one place.
              </p>
            </div>
          </div>

          <div className="feature-grid">
            <FeatureCard
              icon="♙"
              title="Vendor Profiles"
              description="Maintain detailed information about companies and suppliers."
            />
            <FeatureCard
              icon="⌘"
              title="Capability Matching"
              description="Find vendors based on materials and specifications."
            />
            <FeatureCard
              icon="◫"
              title="Centralized Data"
              description="Keep vendor and tender information organized securely."
            />
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className="architecture-section">
          <div className="architecture-card">
            <p className="eyebrow">BUILT FOR SCALE</p>
            <h2>Modern architecture. Built to grow.</h2>

            <p className="architecture-description">
              BidWise uses a clean, modular architecture that separates the
              user interface, backend services, data layer, and future AI
              capabilities.
            </p>

            <div className="architecture-flow">
              <div className="architecture-node">
                <span>Frontend</span>
                <strong>React + Vite</strong>
              </div>

              <div className="flow-arrow">→</div>

              <div className="architecture-node">
                <span>Backend</span>
                <strong>FastAPI</strong>
              </div>

              <div className="flow-arrow">→</div>

              <div className="architecture-node">
                <span>Database</span>
                <strong>MongoDB</strong>
              </div>

              <div className="flow-arrow">→</div>

              <div className="architecture-node ai-node">
                <span>Intelligence</span>
                <strong>AI Layer</strong>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-card">
            <p className="eyebrow">THE FUTURE OF TENDER MANAGEMENT</p>
            <h2>
              Make your next bid
              <br />
              <span>a smarter one.</span>
            </h2>

            <p>
              Discover opportunities, understand requirements, and connect with
              the right vendors using one powerful platform.
            </p>

            <Link to="/register" className="primary-button">
                Get Started →
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#home" className="logo">
              <span className="logo-mark">B</span>
              <span>
                BID<span>WISE</span>
              </span>
            </a>

            <p>
              Building a smarter way to discover, analyze, and manage tender
              opportunities.
            </p>
          </div>

          <div className="footer-column">
            <h4>Platform</h4>
            <a href="#features">Features</a>
            <a href="#platform">Dashboard</a>
            <a href="#architecture">Architecture</a>
          </div>

          <div className="footer-column">
            <h4>Product</h4>
            <a href="#features">Tender Discovery</a>
            <a href="#features">Vendor Management</a>
            <a href="#features">Document Analysis</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a href="#home">About BidWise</a>
            <a href="#home">Contact</a>
            <a href="#home">Privacy</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 BidWise. All rights reserved.</span>
          <span>Built with React, FastAPI & MongoDB</span>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default LandingPage;