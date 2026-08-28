import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TendersPage.css";

function TendersPage() {
  const navigate = useNavigate();

  const [savedTenderTitles, setSavedTenderTitles] = useState<string[]>(() => {
    const storedTenders = localStorage.getItem("savedTenders");

    if (!storedTenders) {
      return [];
    }

    try {
      const parsedTenders = JSON.parse(storedTenders);
      return Array.isArray(parsedTenders) ? parsedTenders : [];
    } catch {
      return [];
    }
  });

  const handleSaveTender = (title: string) => {
    const updatedSavedTenders = savedTenderTitles.includes(title)
      ? savedTenderTitles.filter((savedTitle) => savedTitle !== title)
      : [...savedTenderTitles, title];

    setSavedTenderTitles(updatedSavedTenders);

    localStorage.setItem(
      "savedTenders",
      JSON.stringify(updatedSavedTenders)
    );
  };

  const tenders = [
    {
      title: "Smart City Infrastructure Development",
      organization: "Urban Development Authority",
      location: "Mumbai, Maharashtra",
      category: "Infrastructure",
      value: "₹4.2 Cr",
      deadline: "2 days left",
      match: 92,
      status: "High Match",
    },
    {
      title: "Supply of Industrial Electrical Equipment",
      organization: "State Electricity Board",
      location: "Pune, Maharashtra",
      category: "Electrical",
      value: "₹1.8 Cr",
      deadline: "5 days left",
      match: 86,
      status: "Good Match",
    },
    {
      title: "IT Infrastructure Modernization Project",
      organization: "National Technology Department",
      location: "Bengaluru, Karnataka",
      category: "Technology",
      value: "₹6.5 Cr",
      deadline: "7 days left",
      match: 78,
      status: "Potential",
    },
    {
      title: "Government Office Renovation and Maintenance",
      organization: "Public Works Department",
      location: "New Delhi",
      category: "Construction",
      value: "₹3.1 Cr",
      deadline: "10 days left",
      match: 73,
      status: "Potential",
    },
  ];

  return (
    <div className="tenders-page">
      {/* SIDEBAR */}
      <aside className="tenders-sidebar">
        <Link to="/" className="tenders-logo">
          <span className="tenders-logo-mark">B</span>

          <span>
            BID<span>WISE</span>
          </span>
        </Link>

        <nav className="tenders-sidebar-nav">
          <p className="tenders-nav-label">WORKSPACE</p>

          <button
            className="tenders-sidebar-item"
            onClick={() => navigate("/dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button className="tenders-sidebar-item active">
            <span>◈</span>
            Opportunities
          </button>

          <button
            className="tenders-sidebar-item"
            onClick={() => navigate("/saved-tenders")}
          >
            <span>☆</span>
            Saved Tenders
          </button>

          <button
            className="tenders-sidebar-item"
            onClick={() => navigate("/analytics")}
          >
            <span>▣</span>
            Analytics
          </button>

          <p className="tenders-nav-label tenders-second-label">
            MANAGEMENT
          </p>

          <button
            className="tenders-sidebar-item"
            onClick={() => navigate("/vendors")}
          >
            <span>◉</span>
            Vendors
          </button>

          <button
            className="tenders-sidebar-item"
            onClick={() => navigate("/notifications")}
          >
            <span>◌</span>
            Notifications
            <span className="tenders-notification-dot">3</span>
          </button>

          <button
            className="tenders-sidebar-item"
            onClick={() => navigate("/payments")}
          >
            <span>₹</span>
            Payments
          </button>

          <button
            className="tenders-sidebar-item"
            onClick={() => navigate("/settings")}
          >
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="tenders-sidebar-upgrade">
          <div className="tenders-upgrade-icon">✦</div>

          <div>
            <strong>BidWise AI</strong>
            <p>Smarter tender decisions.</p>
          </div>
        </div>

        <Link to="/" className="tenders-sidebar-back">
          ← Back to website
        </Link>
      </aside>

      {/* MAIN CONTENT */}
      <main className="tenders-main">
        <div className="tenders-glow tenders-glow-one" />
        <div className="tenders-glow tenders-glow-two" />

        {/* TOP BAR */}
        <header className="tenders-topbar">
          <div className="tenders-mobile-title">Opportunities</div>

          <div className="tenders-topbar-actions">
            <button className="tenders-icon-button">⌕</button>

            <button className="tenders-icon-button tenders-notification-button">
              ♢
              <span />
            </button>

            <div className="tenders-user-profile">
              <div className="tenders-user-avatar">A</div>

              <div>
                <strong>Atharv</strong>
                <span>Vendor Account</span>
              </div>

              <span className="tenders-profile-arrow">⌄</span>
            </div>
          </div>
        </header>

        <div className="tenders-content">
          {/* PAGE HEADER */}
          <section className="tenders-header">
            <div>
              <p className="tenders-eyebrow">
                <span className="tenders-status-dot" />
                DISCOVER OPPORTUNITIES
              </p>

              <h1>
                Find your next <span>winning bid.</span>
              </h1>

              <p>
                Explore tender opportunities intelligently matched to your
                business profile and capabilities.
              </p>
            </div>

            <div className="tenders-header-actions">
              <button className="tenders-filter-button">
                ⚙ Filters
              </button>

              <button className="tenders-primary-button">
                ✦ AI Recommendations
              </button>
            </div>
          </section>

          {/* SEARCH AND FILTERS */}
          <section className="tenders-search-panel">
            <div className="tenders-search-box">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search tenders, organizations, or categories..."
              />
            </div>

            <div className="tenders-filter-row">
              <button>All Categories⌄</button>
              <button>All Locations⌄</button>
              <button>Any Value⌄</button>
              <button>Match Score⌄</button>
              <button>Deadline⌄</button>
            </div>
          </section>

          {/* RESULTS SUMMARY */}
          <section className="tenders-results-header">
            <div>
              <h2>Recommended for you</h2>

              <p>
                <span>24 opportunities</span> matched to your business profile.
              </p>
            </div>

            <button className="tenders-sort-button">
              Sort by: Best Match ↓
            </button>
          </section>

          {/* TENDER LIST */}
          <section className="tenders-list">
            {tenders.map((tender) => (
              <article className="tender-card" key={tender.title}>
                <div className="tender-card-top">
                  <div className="tender-icon">◈</div>

                  <div className="tender-info">
                    <div className="tender-title-row">
                      <h3>{tender.title}</h3>

                      <span className="tender-status">
                        {tender.status}
                      </span>
                    </div>

                    <p>{tender.organization}</p>

                    <div className="tender-meta">
                      <span>⌖ {tender.location}</span>
                      <span>•</span>
                      <span>{tender.category}</span>
                    </div>
                  </div>

                  <div className="tender-match">
                    <span>AI MATCH</span>
                    <strong>{tender.match}%</strong>
                  </div>
                </div>

                <div className="tender-card-bottom">
                  <div className="tender-details">
                    <div>
                      <span>ESTIMATED VALUE</span>
                      <strong>{tender.value}</strong>
                    </div>

                    <div>
                      <span>DEADLINE</span>
                      <strong>{tender.deadline}</strong>
                    </div>
                  </div>

                  <div className="tender-actions">
                    <button
                      className="save-tender-button"
                      onClick={() => handleSaveTender(tender.title)}
                    >
                      {savedTenderTitles.includes(tender.title)
                        ? "★ Saved"
                        : "☆ Save"}
                    </button>

                    <button
                      className="view-tender-button"
                      onClick={() =>
                        navigate(`/tenders/${encodeURIComponent(tender.title)}`)
                      }
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

export default TendersPage;