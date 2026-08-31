import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./TenderDetailsPage.css";

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
    description:
      "Development and modernization of smart city infrastructure, including intelligent transportation systems, public utilities, digital connectivity, and integrated urban services.",
    requirements: [
      "Minimum 5 years of experience in infrastructure development",
      "Demonstrated experience with large-scale government projects",
      "Required technical and financial certifications",
      "Valid business and government registration documents",
    ],
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
    description:
      "Supply and delivery of industrial electrical equipment and related components for modernization and maintenance of the regional electricity network.",
    requirements: [
      "Authorized supplier or manufacturer of electrical equipment",
      "Previous experience with government or utility projects",
      "Compliance with required electrical safety standards",
      "Ability to provide warranty and technical support",
    ],
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
    description:
      "Modernization of enterprise IT infrastructure including servers, networking, cloud integration, cybersecurity, and managed technology services.",
    requirements: [
      "Experience delivering enterprise-scale IT projects",
      "Qualified technical and project management team",
      "Strong cybersecurity and infrastructure capabilities",
      "Ability to provide long-term maintenance and support",
    ],
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
    description:
      "Renovation, maintenance, and modernization of government office facilities, including civil works, electrical upgrades, and ongoing maintenance.",
    requirements: [
      "Registered contractor with relevant construction experience",
      "Previous experience with commercial or government projects",
      "Qualified engineering and site management personnel",
      "Compliance with safety and quality regulations",
    ],
  },
];

function TenderDetailsPage() {
  const navigate = useNavigate();
  const { tenderTitle } = useParams();

  const tender = tenders.find(
    (item) => item.title === decodeURIComponent(tenderTitle || "")
  );

  const [savedTenderTitles, setSavedTenderTitles] = useState<string[]>(() => {
    const storedTenders = localStorage.getItem("savedTenders");

    if (!storedTenders) return [];

    try {
      const parsedTenders = JSON.parse(storedTenders);
      return Array.isArray(parsedTenders) ? parsedTenders : [];
    } catch {
      return [];
    }
  });

  if (!tender) {
    return (
      <div className="tender-details-not-found">
        <h1>Tender not found</h1>

        <button onClick={() => navigate("/tenders")}>
          ← Back to Opportunities
        </button>
      </div>
    );
  }

  // CHECK WHETHER THIS TENDER ALREADY HAS AN AI ANALYSIS
  const storedAnalysis = localStorage.getItem("currentAnalysisRequest");

  let hasAnalysis = false;

  try {
    if (storedAnalysis) {
      const parsedAnalysis = JSON.parse(storedAnalysis);

      hasAnalysis =
        parsedAnalysis?.tender?.title === tender.title;
    }
  } catch {
    hasAnalysis = false;
  }

  const isSaved = savedTenderTitles.includes(tender.title);

  const handleSaveTender = () => {
    const updatedSavedTenders = isSaved
      ? savedTenderTitles.filter((title) => title !== tender.title)
      : [...savedTenderTitles, tender.title];

    setSavedTenderTitles(updatedSavedTenders);

    localStorage.setItem(
      "savedTenders",
      JSON.stringify(updatedSavedTenders)
    );
  };

  const handleAIAnalysisClick = () => {
    if (hasAnalysis) {
      // ANALYSIS ALREADY EXISTS → OPEN RESULTS
      navigate(`/analysis/results/${encodeURIComponent(tender.title)}`);
    } else {
      // NO ANALYSIS YET → OPEN INPUT FORM
      navigate(`/tenders/${encodeURIComponent(tender.title)}/ai-analysis`);
    }
  };

  return (
    <div className="tender-details-page">
      {/* SIDEBAR */}
      <aside className="details-sidebar">
        <Link to="/" className="details-logo">
          <span className="details-logo-mark">B</span>

          <span>
            BID<span>WISE</span>
          </span>
        </Link>

        <nav className="details-sidebar-nav">
          <p className="details-nav-label">WORKSPACE</p>

          <button
            className="details-sidebar-item"
            onClick={() => navigate("/dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="details-sidebar-item active"
            onClick={() => navigate("/tenders")}
          >
            <span>◈</span>
            Opportunities
          </button>

          <button
            className="details-sidebar-item"
            onClick={() => navigate("/saved-tenders")}
          >
            <span>☆</span>
            Saved Tenders
          </button>

          <button
            className="details-sidebar-item"
            onClick={() => navigate("/analytics")}
          >
            <span>▣</span>
            Analytics
          </button>

          <p className="details-nav-label details-second-label">
            MANAGEMENT
          </p>

          <button
            className="details-sidebar-item"
            onClick={() => navigate("/vendors")}
          >
            <span>◉</span>
            Vendors
          </button>

          <button
            className="details-sidebar-item"
            onClick={() => navigate("/notifications")}
          >
            <span>◌</span>
            Notifications
          </button>

          <button
            className="details-sidebar-item"
            onClick={() => navigate("/payments")}
          >
            <span>₹</span>
            Payments
          </button>

          <button
            className="details-sidebar-item"
            onClick={() => navigate("/settings")}
          >
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="details-sidebar-upgrade">
          <div className="details-upgrade-icon">✦</div>

          <div>
            <strong>BidWise AI</strong>
            <p>Smarter tender decisions.</p>
          </div>
        </div>

        <Link to="/" className="details-sidebar-back">
          ← Back to website
        </Link>
      </aside>

      {/* MAIN CONTENT */}
      <main className="tender-details-main">
        <header className="details-topbar">
          <button
            className="details-back-button"
            onClick={() => navigate("/tenders")}
          >
            ← Back to Opportunities
          </button>

          <div className="details-user-profile">
            <div className="details-user-avatar">A</div>

            <div>
              <strong>Atharv</strong>
              <span>Vendor Account</span>
            </div>
          </div>
        </header>

        <div className="tender-details-content">
          {/* HERO */}
          <section className="details-hero">
            <div className="details-hero-main">
              <p className="details-eyebrow">
                <span className="details-status-dot" />
                {tender.category.toUpperCase()} OPPORTUNITY
              </p>

              <div className="details-title-row">
                <h1>{tender.title}</h1>
                <span className="details-status">{tender.status}</span>
              </div>

              <p className="details-organization">{tender.organization}</p>

              <div className="details-meta">
                <span>⌖ {tender.location}</span>
                <span>•</span>
                <span>{tender.category}</span>
                <span>•</span>
                <span>Deadline: {tender.deadline}</span>
              </div>
            </div>

            <div className="details-match-card">
              <span>AI MATCH SCORE</span>
              <strong>{tender.match}%</strong>
              <p>Strong compatibility with your business profile</p>
            </div>
          </section>

          {/* QUICK DETAILS */}
          <section className="details-info-grid">
            <div className="details-info-card">
              <span>ESTIMATED VALUE</span>
              <strong>{tender.value}</strong>
            </div>

            <div className="details-info-card">
              <span>DEADLINE</span>
              <strong>{tender.deadline}</strong>
            </div>

            <div className="details-info-card">
              <span>CATEGORY</span>
              <strong>{tender.category}</strong>
            </div>
          </section>

          {/* DESCRIPTION */}
          <section className="details-section">
            <h2>About this opportunity</h2>
            <p>{tender.description}</p>
          </section>

          {/* REQUIREMENTS */}
          <section className="details-section">
            <h2>Key requirements</h2>

            <div className="requirements-list">
              {tender.requirements.map((requirement) => (
                <div className="requirement-item" key={requirement}>
                  <span>✓</span>
                  <p>{requirement}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ACTIONS */}
          <section className="details-actions">
            <button
              className="details-ai-analysis-button"
              onClick={handleAIAnalysisClick}
            >
              {hasAnalysis ? "View Analysis →" : "✦ Start AI Analysis"}
            </button>

            <button
              className="details-save-button"
              onClick={handleSaveTender}
            >
              {isSaved ? "★ Saved Tender" : "☆ Save Tender"}
            </button>

            <button
              className="details-primary-button"
              onClick={() =>
              navigate(`/tenders/${encodeURIComponent(tender.title)}/prepare-bid`)
              }
            >
              Start Preparing Bid →
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default TenderDetailsPage;