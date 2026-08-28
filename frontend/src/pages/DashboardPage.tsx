import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();

  const [performanceFilter, setPerformanceFilter] = useState("Month");

  const performanceData: Record<
    string,
    { won: number; notWon: number; total: number; winRate: number }
  > = {
    Week: {
      won: 4,
      notWon: 2,
      total: 6,
      winRate: 67,
    },
    Month: {
      won: 12,
      notWon: 8,
      total: 20,
      winRate: 60,
    },
    "3 Months": {
      won: 28,
      notWon: 19,
      total: 47,
      winRate: 60,
    },
    "6 Months": {
      won: 51,
      notWon: 34,
      total: 85,
      winRate: 60,
    },
  };

  const currentPerformance = performanceData[performanceFilter];

  const opportunities = [
    {
      title: "Smart City Infrastructure Development",
      organization: "Urban Development Authority",
      location: "Mumbai, Maharashtra",
      deadline: "2 days left",
      value: "₹4.2 Cr",
      match: 92,
      status: "High Match",
    },
    {
      title: "Supply of Industrial Electrical Equipment",
      organization: "State Electricity Board",
      location: "Pune, Maharashtra",
      deadline: "5 days left",
      value: "₹1.8 Cr",
      match: 86,
      status: "Good Match",
    },
    {
      title: "IT Infrastructure Modernization Project",
      organization: "National Technology Department",
      location: "Bengaluru, Karnataka",
      deadline: "7 days left",
      value: "₹6.5 Cr",
      match: 78,
      status: "Potential",
    },
  ];

  return (
    <div className="dashboard-page">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <Link to="/" className="dashboard-logo">
          <span className="logo-mark">B</span>
          <span>
            BID<span>WISE</span>
          </span>
        </Link>

        <nav className="sidebar-nav">
          <p className="nav-label">WORKSPACE</p>

          <button
            className="sidebar-item active"
            onClick={() => navigate("/dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="sidebar-item"
            onClick={() => navigate("/tenders")}
          >
            <span>◈</span>
            Opportunities
          </button>

          <button
            className="sidebar-item"
            onClick={() => navigate("/saved-tenders")}
          >
            <span>☆</span>
            Saved Tenders
          </button>

          {/* ANALYTICS */}
          <button
            className="sidebar-item"
            onClick={() => navigate("/analytics")}
          >
            <span>▣</span>
            Analytics
          </button>

          <button
            className="sidebar-item"
            onClick={() => navigate("/payments")}
          >
            <span>₹</span>
            Payments
          </button>

          <p className="nav-label second-label">MANAGEMENT</p>

          <button
            className="sidebar-item"
            onClick={() => navigate("/vendors")}
          >
            <span>◉</span>
            Vendors
          </button>

          <button
            className="sidebar-item"
            onClick={() => navigate("/notifications")}
          >
            <span>◌</span>
            Notifications
            <span className="notification-dot">3</span>
          </button>

          <button
            className="sidebar-item"
            onClick={() => navigate("/settings")}
          >
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="sidebar-upgrade">
          <div className="upgrade-icon">✦</div>

          <div>
            <strong>BidWise AI</strong>
            <p>Smarter tender decisions.</p>
          </div>
        </div>

        <Link to="/" className="sidebar-back">
          ← Back to website
        </Link>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        <div className="dashboard-glow glow-one" />
        <div className="dashboard-glow glow-two" />

        {/* TOP BAR */}
        <header className="dashboard-topbar">
          <div className="mobile-title">
            <span>Dashboard</span>
          </div>

          <div className="topbar-actions">
            <button className="icon-button">⌕</button>

            <button className="icon-button notification-button">
              ♢
              <span />
            </button>

            <div className="user-profile">
              <div className="user-avatar">A</div>

              <div>
                <strong>Atharv</strong>
                <span>Vendor Account</span>
              </div>

              <span className="profile-arrow">⌄</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* WELCOME HEADER */}
          <section className="welcome-section">
            <div>
              <p className="dashboard-eyebrow">
                <span className="status-dot" />
                BIDWISE INTELLIGENCE
              </p>

              <h1>
                Welcome back, <span>Atharv.</span>
              </h1>

              <p>
                Here is what is happening with your tender opportunities today.
              </p>
            </div>
          </section>

          {/* QUICK STATISTICS */}
          <section className="statistics-grid">
            <div className="stat-card purple-card">
              <div className="stat-card-top">
                <span className="stat-icon">◈</span>
                <span className="stat-trend positive">+12%</span>
              </div>

              <h3>24</h3>
              <p>Active Opportunities</p>

              <div className="mini-bars">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="stat-card pink-card">
              <div className="stat-card-top">
                <span className="stat-icon">☆</span>
                <span className="stat-trend positive">+8%</span>
              </div>

              <h3>12</h3>
              <p>Saved Tenders</p>

              <div className="mini-line">
                <svg viewBox="0 0 300 80" preserveAspectRatio="none">
                  <path
                    d="M0,65 C35,55 40,40 75,50 S110,70 140,45 S190,20 215,35 S260,50 300,10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </div>
            </div>

            <div className="stat-card orange-card">
              <div className="stat-card-top">
                <span className="stat-icon">◉</span>
                <span className="stat-trend">This week</span>
              </div>

              <h3>₹18.4 Cr</h3>
              <p>Total Opportunity Value</p>

              <div className="progress-track">
                <span />
              </div>
            </div>

            <div className="stat-card blue-card">
              <div className="stat-card-top">
                <span className="stat-icon">✓</span>
                <span className="stat-trend positive">+5%</span>
              </div>

              <h3>87%</h3>
              <p>Average Match Score</p>

              <div className="score-circle">
                <div />
              </div>
            </div>
          </section>

          {/* OVERVIEW */}
          <section className="overview-grid">
            <div className="dashboard-panel opportunity-overview">
              <div className="panel-header">
                <div>
                  <p className="panel-eyebrow">OVERVIEW</p>
                  <h2>Tender opportunity pipeline</h2>
                </div>

                <button
                  className="panel-action"
                  onClick={() => navigate("/analytics")}
                >
                  View Analytics →
                </button>
              </div>

              <div className="pipeline-content">
                <div className="pipeline-chart">
                  <div className="pipeline-bar">
                    <span className="pipeline-label">New Opportunities</span>
                    <div className="pipeline-track">
                      <div className="pipeline-fill new-fill">
                        <strong>42</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pipeline-bar">
                    <span className="pipeline-label">Under Analysis</span>
                    <div className="pipeline-track">
                      <div className="pipeline-fill analysis-fill">
                        <strong>18</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pipeline-bar">
                    <span className="pipeline-label">Shortlisted</span>
                    <div className="pipeline-track">
                      <div className="pipeline-fill shortlist-fill">
                        <strong>9</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pipeline-bar">
                    <span className="pipeline-label">Ready to Bid</span>
                    <div className="pipeline-track">
                      <div className="pipeline-fill ready-fill">
                        <strong>5</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overview-summary">
                  <div className="summary-score">
                    <div className="summary-ring">
                      <div>
                        <strong>76%</strong>
                        <span>Match Rate</span>
                      </div>
                    </div>
                  </div>

                  <p>
                    Your opportunity match rate has improved by{" "}
                    <strong>12%</strong> this month.
                  </p>
                </div>
              </div>
            </div>

            {/* TENDER PERFORMANCE */}
            <div className="dashboard-panel tender-performance">
              <div className="panel-header performance-header">
                <div>
                  <p className="panel-eyebrow">BIDDING PERFORMANCE</p>
                  <h2>Your tender results</h2>
                </div>

                <select
                  className="performance-filter"
                  value={performanceFilter}
                  onChange={(event) =>
                    setPerformanceFilter(event.target.value)
                  }
                >
                  <option value="Week">This Week</option>
                  <option value="Month">This Month</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                </select>
              </div>

              <div className="performance-score">
                <div className="performance-circle">
                  <div>
                    <strong>{currentPerformance.winRate}%</strong>
                    <span>Win Rate</span>
                  </div>
                </div>

                <div className="performance-summary">
                  <div>
                    <span className="performance-label won-dot" />
                    <div>
                      <small>Tenders Won</small>
                      <strong>{currentPerformance.won}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="performance-label lost-dot" />
                    <div>
                      <small>Not Won</small>
                      <strong>{currentPerformance.notWon}</strong>
                    </div>
                  </div>

                  <div>
                    <small>Total Bids</small>
                    <strong>{currentPerformance.total}</strong>
                  </div>
                </div>
              </div>

              <div className="performance-footer">
                <span>
                  Performance for{" "}
                  <strong>{performanceFilter.toLowerCase()}</strong>
                </span>

                <button
                  className="panel-action"
                  onClick={() => navigate("/analytics")}
                >
                  Detailed Analytics →
                </button>
              </div>
            </div>
          </section>

          {/* RECENT OPPORTUNITIES */}
          <section className="recent-section">
            <div className="section-heading">
              <div>
                <p className="panel-eyebrow">LATEST MATCHES</p>
                <h2>Recent opportunities</h2>
              </div>
            </div>

            <div className="opportunities-list">
              {opportunities.map((opportunity) => (
                <div className="opportunity-card" key={opportunity.title}>
                  <div className="opportunity-main">
                    <div className="opportunity-icon">◈</div>

                    <div>
                      <h3>{opportunity.title}</h3>

                      <div className="opportunity-meta">
                        <span>{opportunity.organization}</span>
                        <span>•</span>
                        <span>{opportunity.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="opportunity-details">
                    <div>
                      <span>VALUE</span>
                      <strong>{opportunity.value}</strong>
                    </div>

                    <div>
                      <span>DEADLINE</span>
                      <strong>{opportunity.deadline}</strong>
                    </div>

                    <div className="match-score">
                      <span>{opportunity.status}</span>
                      <strong>{opportunity.match}%</strong>
                    </div>

                    <button
                      className="view-button"
                      onClick={() =>
                        navigate(
                          `/tenders/${encodeURIComponent(opportunity.title)}`
                        )
                      }
                    >
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;