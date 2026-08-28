import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SavedTendersPage.css";

function SavedTendersPage() {
  const navigate = useNavigate();

  const allTenders = [
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

  const savedTenders = allTenders.filter((tender) =>
    savedTenderTitles.includes(tender.title)
  );

  const handleRemoveTender = (title: string) => {
    const updatedSavedTenders = savedTenderTitles.filter(
      (savedTitle) => savedTitle !== title
    );

    setSavedTenderTitles(updatedSavedTenders);

    localStorage.setItem(
      "savedTenders",
      JSON.stringify(updatedSavedTenders)
    );
  };

  return (
    <div className="saved-tenders-page">
      {/* SIDEBAR */}
      <aside className="saved-sidebar">
        <Link to="/" className="saved-logo">
          <span className="saved-logo-mark">B</span>

          <span>
            BID<span>WISE</span>
          </span>
        </Link>

        <nav className="saved-sidebar-nav">
          <p className="saved-nav-label">WORKSPACE</p>

          <button
            className="saved-sidebar-item"
            onClick={() => navigate("/dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="saved-sidebar-item"
            onClick={() => navigate("/tenders")}
          >
            <span>◈</span>
            Opportunities
          </button>

          <button className="saved-sidebar-item active">
            <span>☆</span>
            Saved Tenders
          </button>

          <button
            className="saved-sidebar-item"
            onClick={() => navigate("/analytics")}
          >
            <span>▣</span>
            Analytics
          </button>

          <p className="saved-nav-label saved-second-label">
            MANAGEMENT
          </p>

          <button
            className="saved-sidebar-item"
            onClick={() => navigate("/vendors")}
          >
            <span>◉</span>
            Vendors
          </button>

          <button
            className="saved-sidebar-item"
            onClick={() => navigate("/notifications")}
          >
            <span>◌</span>
            Notifications

            <span className="saved-notification-dot">3</span>
          </button>

          <button
                className="saved-sidebar-item"
                onClick={() => navigate("/payments")}
            >
                <span>₹</span>
                Payments
          </button>

          <button
            className="saved-sidebar-item"
            onClick={() => navigate("/settings")}
          >
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="saved-sidebar-upgrade">
          <div className="saved-upgrade-icon">✦</div>

          <div>
            <strong>BidWise AI</strong>
            <p>Smarter tender decisions.</p>
          </div>
        </div>

        <Link to="/" className="saved-sidebar-back">
          ← Back to website
        </Link>
      </aside>

      {/* MAIN CONTENT */}
      <main className="saved-main">
        <div className="saved-glow saved-glow-one" />
        <div className="saved-glow saved-glow-two" />

        {/* TOP BAR */}
        <header className="saved-topbar">
          <div className="saved-mobile-title">Saved Tenders</div>

          <div className="saved-topbar-actions">
            <button className="saved-icon-button">⌕</button>

            <button className="saved-icon-button saved-notification-button">
              ♢
              <span />
            </button>

            <div className="saved-user-profile">
              <div className="saved-user-avatar">A</div>

              <div>
                <strong>Atharv</strong>
                <span>Vendor Account</span>
              </div>

              <span className="saved-profile-arrow">⌄</span>
            </div>
          </div>
        </header>

        <div className="saved-content">
          {/* PAGE HEADER */}
          <section className="saved-header">
            <div>
              <p className="saved-eyebrow">
                <span className="saved-status-dot" />
                YOUR SHORTLIST
              </p>

              <h1>
                Tenders worth <span>keeping an eye on.</span>
              </h1>

              <p>
                Review and manage tender opportunities you've saved for later.
                Keep track of deadlines and focus on the opportunities that
                matter most to your business.
              </p>
            </div>

            <button
              className="saved-primary-button"
              onClick={() => navigate("/tenders")}
            >
              + Explore Opportunities
            </button>
          </section>

          {/* SUMMARY CARDS */}
          <section className="saved-summary-grid">
            <div className="saved-summary-card">
              <span className="saved-summary-icon">☆</span>

              <div>
                <p>Total Saved</p>
                <strong>{savedTenders.length}</strong>
                <small>Across all categories</small>
              </div>
            </div>

            <div className="saved-summary-card">
              <span className="saved-summary-icon">◷</span>

              <div>
                <p>Closing Soon</p>
                <strong>
                  {
                    savedTenders.filter(
                      (tender) =>
                        tender.deadline === "2 days left" ||
                        tender.deadline === "5 days left"
                    ).length
                  }
                </strong>
                <small>Deadlines within 7 days</small>
              </div>
            </div>

            <div className="saved-summary-card">
              <span className="saved-summary-icon">✦</span>

              <div>
                <p>High Match</p>
                <strong>
                  {
                    savedTenders.filter((tender) => tender.match >= 85)
                      .length
                  }
                </strong>
                <small>Above 85% AI match</small>
              </div>
            </div>
          </section>

          {/* LIST HEADER */}
          <section className="saved-results-header">
            <div>
              <h2>Your Saved Opportunities</h2>

              <p>
                {savedTenders.length} tender
                {savedTenders.length !== 1 ? "s" : ""} currently displayed
                from your saved shortlist.
              </p>
            </div>

            <button className="saved-sort-button">
              Sort by: Recently Saved ↓
            </button>
          </section>

          {/* SAVED TENDER LIST */}
          <section className="saved-list">
            {savedTenders.length === 0 ? (
              <div className="saved-empty-state">
                <div className="saved-empty-icon">☆</div>

                <h3>No saved tenders yet</h3>

                <p>
                  Explore opportunities and save the tenders you want to review
                  later.
                </p>

                <button
                  className="saved-primary-button"
                  onClick={() => navigate("/tenders")}
                >
                  Explore Opportunities
                </button>
              </div>
            ) : (
              savedTenders.map((tender) => (
                <article
                  className="saved-tender-card"
                  key={tender.title}
                >
                  <div className="saved-tender-top">
                    <div className="saved-tender-icon">◈</div>

                    <div className="saved-tender-info">
                      <div className="saved-tender-title-row">
                        <h3>{tender.title}</h3>

                        <span className="saved-tender-status">
                          {tender.status}
                        </span>
                      </div>

                      <p>{tender.organization}</p>

                      <div className="saved-tender-meta">
                        <span>⌖ {tender.location}</span>
                        <span>•</span>
                        <span>{tender.category}</span>
                      </div>
                    </div>

                    <div className="saved-tender-match">
                      <span>AI MATCH</span>
                      <strong>{tender.match}%</strong>
                    </div>
                  </div>

                  <div className="saved-tender-bottom">
                    <div className="saved-tender-details">
                      <div>
                        <span>ESTIMATED VALUE</span>
                        <strong>{tender.value}</strong>
                      </div>

                      <div>
                        <span>DEADLINE</span>
                        <strong>{tender.deadline}</strong>
                      </div>
                    </div>

                    <div className="saved-tender-actions">
                      <button
                        className="remove-saved-button"
                        onClick={() =>
                          handleRemoveTender(tender.title)
                        }
                      >
                        Remove
                      </button>

                      <button
                        className="saved-view-button"
                        onClick={() =>
                        navigate(`/tenders/${encodeURIComponent(tender.title)}`)
                        }
                        >
                        View Details →
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default SavedTendersPage;