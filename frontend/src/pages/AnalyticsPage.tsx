import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AnalyticsPage.css";

type TenderAnalysis = {
  title: string;
  organization: string;
  location: string;
  value: string;
  deadline: string;
  match: number;
  riskScore: number;
  riskLevel: string;
  recommendation: string;
  strengths: string[];
  gaps: string[];
  requirements: string[];
};

function AnalyticsPage() {
  const navigate = useNavigate();

  const [selectedTender, setSelectedTender] =
    useState<TenderAnalysis | null>(null);

  const [showCompleteAnalysis, setShowCompleteAnalysis] = useState(false);

  const tenders: TenderAnalysis[] = [
    {
      title: "Smart City Infrastructure Development",
      organization: "Urban Development Authority",
      location: "Mumbai, Maharashtra",
      value: "₹4.2 Cr",
      deadline: "2 days left",
      match: 92,
      riskScore: 18,
      riskLevel: "Low Risk",
      recommendation: "Strong opportunity — recommended to bid.",
      strengths: [
        "Excellent alignment with your infrastructure capabilities",
        "High AI match based on business profile",
        "Strong relevance to your previous project experience",
      ],
      gaps: [
        "Tight submission timeline requires immediate preparation",
        "Financial documentation should be reviewed before bidding",
      ],
      requirements: [
        "Minimum 5 years of infrastructure development experience",
        "Experience with large-scale government projects",
        "Required technical and financial certifications",
        "Valid business and government registration documents",
      ],
    },
    {
      title: "Supply of Industrial Electrical Equipment",
      organization: "State Electricity Board",
      location: "Pune, Maharashtra",
      value: "₹1.8 Cr",
      deadline: "5 days left",
      match: 86,
      riskScore: 28,
      riskLevel: "Low–Medium Risk",
      recommendation:
        "Good opportunity — verify technical specifications before bidding.",
      strengths: [
        "Strong match with relevant supplier capabilities",
        "Good alignment with electrical equipment requirements",
        "Suitable project value for business capacity",
      ],
      gaps: [
        "Technical compliance requirements need detailed verification",
        "Warranty and support commitments may increase delivery risk",
      ],
      requirements: [
        "Authorized supplier or manufacturer status",
        "Previous government or utility project experience",
        "Compliance with electrical safety standards",
        "Ability to provide warranty and technical support",
      ],
    },
    {
      title: "IT Infrastructure Modernization Project",
      organization: "National Technology Department",
      location: "Bengaluru, Karnataka",
      value: "₹6.5 Cr",
      deadline: "7 days left",
      match: 78,
      riskScore: 42,
      riskLevel: "Medium Risk",
      recommendation:
        "Potential opportunity — assess technical capacity before committing.",
      strengths: [
        "Strong project value and business growth potential",
        "Relevant technology and modernization requirements",
        "Reasonable time available for bid preparation",
      ],
      gaps: [
        "Requires broad enterprise technology capabilities",
        "Long-term maintenance commitment may require additional resources",
      ],
      requirements: [
        "Enterprise-scale IT project experience",
        "Qualified technical and project management team",
        "Strong cybersecurity capabilities",
        "Ability to provide long-term support and maintenance",
      ],
    },
    {
      title: "Government Office Renovation and Maintenance",
      organization: "Public Works Department",
      location: "New Delhi",
      value: "₹3.1 Cr",
      deadline: "10 days left",
      match: 73,
      riskScore: 55,
      riskLevel: "Medium–High Risk",
      recommendation:
        "Proceed carefully — review capability gaps and resource availability.",
      strengths: [
        "Good opportunity value",
        "Longer preparation period available",
        "Potential for ongoing maintenance work",
      ],
      gaps: [
        "Lower alignment with current business profile",
        "Requires multiple construction and maintenance capabilities",
        "Resource and location planning may increase operational risk",
      ],
      requirements: [
        "Registered contractor with relevant experience",
        "Government or commercial construction experience",
        "Qualified engineering and site management personnel",
        "Compliance with safety and quality regulations",
      ],
    },
  ];

  const averageMatch = Math.round(
    tenders.reduce((total, tender) => total + tender.match, 0) /
      tenders.length
  );

  const averageRisk = Math.round(
    tenders.reduce((total, tender) => total + tender.riskScore, 0) /
      tenders.length
  );

  const recommendedTenders = tenders.filter(
    (tender) => tender.match >= 80 && tender.riskScore < 40
  ).length;

  const handleSelectTender = (tender: TenderAnalysis) => {
    setSelectedTender(tender);
    setShowCompleteAnalysis(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="analytics-page">
      {/* SIDEBAR */}
      <aside className="analytics-sidebar">
        <Link to="/" className="analytics-logo">
          <span className="analytics-logo-mark">B</span>

          <span>
            BID<span>WISE</span>
          </span>
        </Link>

        <nav className="analytics-sidebar-nav">
          <p className="analytics-nav-label">WORKSPACE</p>

          <button
            className="analytics-sidebar-item"
            onClick={() => navigate("/dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="analytics-sidebar-item"
            onClick={() => navigate("/tenders")}
          >
            <span>◈</span>
            Opportunities
          </button>

          <button
            className="analytics-sidebar-item"
            onClick={() => navigate("/saved-tenders")}
          >
            <span>☆</span>
            Saved Tenders
          </button>

          <button className="analytics-sidebar-item active">
            <span>▣</span>
            Analytics
          </button>

          <button
            className="analytics-sidebar-item"
            onClick={() => navigate("/payments")}
          >
            <span>₹</span>
            Payments
          </button>

          <p className="analytics-nav-label analytics-second-label">
            MANAGEMENT
          </p>

          <button
            className="analytics-sidebar-item"
            onClick={() => navigate("/vendors")}
          >
            <span>◉</span>
            Vendors
          </button>

          <button
            className="analytics-sidebar-item"
            onClick={() => navigate("/notifications")}
          >
            <span>◌</span>
            Notifications
            <span className="analytics-notification-dot">3</span>
          </button>

          <button
            className="analytics-sidebar-item"
            onClick={() => navigate("/settings")}
          >
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="analytics-sidebar-upgrade">
          <div className="analytics-upgrade-icon">✦</div>

          <div>
            <strong>BidWise AI</strong>
            <p>Smarter tender decisions.</p>
          </div>
        </div>

        <Link to="/" className="analytics-sidebar-back">
          ← Back to website
        </Link>
      </aside>

      {/* MAIN CONTENT */}
      <main className="analytics-main">
        <div className="analytics-glow analytics-glow-one" />
        <div className="analytics-glow analytics-glow-two" />

        {/* TOP BAR */}
        <header className="analytics-topbar">
          <div className="analytics-mobile-title">Analytics</div>

          <div className="analytics-topbar-actions">
            <button className="analytics-icon-button">⌕</button>

            <button className="analytics-icon-button analytics-notification-button">
              ♢
              <span />
            </button>

            <div className="analytics-user-profile">
              <div className="analytics-user-avatar">A</div>

              <div>
                <strong>Atharv</strong>
                <span>Vendor Account</span>
              </div>

              <span className="analytics-profile-arrow">⌄</span>
            </div>
          </div>
        </header>

        <div className="analytics-content">
          {/* PAGE HEADER */}
          <section className="analytics-header">
            <div>
              <p className="analytics-eyebrow">
                <span className="analytics-status-dot" />
                BUSINESS INTELLIGENCE
              </p>

              <h1>
                Make every bid a <span>smarter decision.</span>
              </h1>

              <p>
                Track your overall business performance and use AI-powered
                insights to evaluate individual tender opportunities.
              </p>
            </div>
          </section>

          {/* OVERALL BUSINESS ANALYTICS */}
          <section className="business-analytics-section">
            <div className="analytics-section-heading">
              <div>
                <p className="analytics-panel-eyebrow">OVERVIEW</p>
                <h2>Overall business analytics</h2>
              </div>

              <span className="analytics-live-status">
                <span />
                Updated today
              </span>
            </div>

            <div className="business-stats-grid">
              <div className="business-stat-card">
                <div className="business-stat-top">
                  <span className="business-stat-icon">◈</span>
                  <span className="business-stat-change positive">+12%</span>
                </div>

                <strong>24</strong>
                <p>Active Opportunities</p>
                <small>4 new opportunities this week</small>
              </div>

              <div className="business-stat-card">
                <div className="business-stat-top">
                  <span className="business-stat-icon">◎</span>
                  <span className="business-stat-change positive">+5%</span>
                </div>

                <strong>{averageMatch}%</strong>
                <p>Average AI Match</p>
                <small>Across current opportunities</small>
              </div>

              <div className="business-stat-card">
                <div className="business-stat-top">
                  <span className="business-stat-icon">✓</span>
                  <span className="business-stat-change positive">+8%</span>
                </div>

                <strong>60%</strong>
                <p>Bid Win Rate</p>
                <small>12 tenders won this period</small>
              </div>

              <div className="business-stat-card">
                <div className="business-stat-top">
                  <span className="business-stat-icon">⚠</span>
                  <span className="business-stat-change">Stable</span>
                </div>

                <strong>{averageRisk}</strong>
                <p>Average Risk Score</p>
                <small>Lower scores indicate lower risk</small>
              </div>
            </div>

            <div className="business-insights-grid">
              <div className="analytics-panel opportunity-health">
                <div className="analytics-panel-header">
                  <div>
                    <p className="analytics-panel-eyebrow">
                      OPPORTUNITY HEALTH
                    </p>
                    <h3>Your tender portfolio</h3>
                  </div>
                </div>

                <div className="portfolio-bars">
                  <div className="portfolio-bar-row">
                    <span>High Match</span>
                    <div className="portfolio-track">
                      <span className="portfolio-fill high-match-fill" />
                    </div>
                    <strong>42%</strong>
                  </div>

                  <div className="portfolio-bar-row">
                    <span>Good Potential</span>
                    <div className="portfolio-track">
                      <span className="portfolio-fill good-potential-fill" />
                    </div>
                    <strong>35%</strong>
                  </div>

                  <div className="portfolio-bar-row">
                    <span>Needs Review</span>
                    <div className="portfolio-track">
                      <span className="portfolio-fill review-fill" />
                    </div>
                    <strong>23%</strong>
                  </div>
                </div>

                <div className="portfolio-summary">
                  <span>✦</span>
                  <p>
                    You currently have{" "}
                    <strong>{recommendedTenders} strong bidding opportunities</strong>{" "}
                    with a high match and manageable risk.
                  </p>
                </div>
              </div>

              <div className="analytics-panel business-recommendation">
                <div className="analytics-panel-header">
                  <div>
                    <p className="analytics-panel-eyebrow">AI INSIGHT</p>
                    <h3>What to focus on next</h3>
                  </div>
                </div>

                <div className="recommendation-content">
                  <div className="recommendation-score">76</div>

                  <div>
                    <strong>Healthy opportunity pipeline</strong>
                    <p>
                      Your strongest opportunities are concentrated in
                      infrastructure and electrical projects. Prioritize
                      high-match tenders with approaching deadlines.
                    </p>
                  </div>
                </div>

                <div className="recommendation-tags">
                  <span>Prioritize High Match</span>
                  <span>Reduce Risk</span>
                  <span>Meet Deadlines</span>
                </div>
              </div>
            </div>
          </section>

          {/* TENDER ANALYSIS LIST */}
          <section className="tender-analysis-section">
            <div className="analytics-section-heading">
              <div>
                <p className="analytics-panel-eyebrow">TENDER INTELLIGENCE</p>
                <h2>Analyze individual opportunities</h2>
                <p className="analytics-section-description">
                  Select a tender to get a detailed AI-powered analysis of its
                  match, requirements, risks, and bidding potential.
                </p>
              </div>
            </div>

            <div className="analytics-tender-list">
              {tenders.map((tender) => (
                <article
                  className={`analytics-tender-card ${
                    selectedTender?.title === tender.title
                      ? "selected"
                      : ""
                  }`}
                  key={tender.title}
                >
                  <div className="analytics-tender-main">
                    <div className="analytics-tender-icon">◈</div>

                    <div className="analytics-tender-info">
                      <h3>{tender.title}</h3>
                      <p>{tender.organization}</p>

                      <div className="analytics-tender-meta">
                        <span>⌖ {tender.location}</span>
                        <span>•</span>
                        <span>{tender.value}</span>
                        <span>•</span>
                        <span>{tender.deadline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="analytics-tender-scores">
                    <div className="analytics-score-item match">
                      <span>AI MATCH</span>
                      <strong>{tender.match}%</strong>
                    </div>

                    <div className="analytics-score-item risk">
                      <span>RISK SCORE</span>
                      <strong>{tender.riskScore}</strong>
                    </div>

                    <button
                      className="analyze-tender-button"
                      onClick={() => handleSelectTender(tender)}
                    >
                      Analyze →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SELECTED TENDER ANALYSIS */}
          {selectedTender && (
            <section className="selected-analysis-section">
              <div className="selected-analysis-header">
                <div>
                  <p className="analytics-eyebrow">
                    <span className="analytics-status-dot" />
                    AI TENDER ANALYSIS
                  </p>

                  <h2>{selectedTender.title}</h2>

                  <p>
                    AI-generated analysis based on your business profile and
                    tender requirements.
                  </p>
                </div>

                <span className="analysis-recommendation">
                  {selectedTender.recommendation}
                </span>
              </div>

              {/* SCORE CARDS */}
              <div className="analysis-score-grid">
                <div className="analysis-score-card match-card">
                  <span>AI MATCH SCORE</span>
                  <strong>{selectedTender.match}%</strong>
                  <p>Compatibility with your business profile</p>
                </div>

                <div className="analysis-score-card risk-card">
                  <span>RISK SCORE</span>
                  <strong>{selectedTender.riskScore}/100</strong>
                  <p>{selectedTender.riskLevel}</p>
                </div>

                <div className="analysis-score-card recommendation-card">
                  <span>BID RECOMMENDATION</span>
                  <strong>
                    {selectedTender.match >= 85
                      ? "Recommended"
                      : "Review Carefully"}
                  </strong>
                  <p>Based on match, requirements, and risk</p>
                </div>
              </div>

              {/* COMPLETE ANALYSIS BUTTON */}
              {!showCompleteAnalysis ? (
                <div className="complete-analysis-cta">
                  <div>
                    <span className="complete-analysis-icon">✦</span>

                    <div>
                      <h3>Ready for a deeper analysis?</h3>
                      <p>
                        Review requirements, strengths, gaps, and potential
                        risks before making your bidding decision.
                      </p>
                    </div>
                  </div>

                  <button
                    className="complete-analysis-button"
                    onClick={() => setShowCompleteAnalysis(true)}
                  >
                    Run Complete Analysis ✦
                  </button>
                </div>
              ) : (
                <div className="complete-analysis-results">
                  <div className="analysis-result-grid">
                    {/* STRENGTHS */}
                    <div className="analysis-detail-card strengths-card">
                      <div className="analysis-detail-header">
                        <span>✓</span>
                        <div>
                          <p>YOUR STRENGTHS</p>
                          <h3>Why this tender fits you</h3>
                        </div>
                      </div>

                      <div className="analysis-list">
                        {selectedTender.strengths.map((strength) => (
                          <div key={strength}>
                            <span>✓</span>
                            <p>{strength}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* GAPS */}
                    <div className="analysis-detail-card gaps-card">
                      <div className="analysis-detail-header">
                        <span>!</span>
                        <div>
                          <p>POTENTIAL GAPS</p>
                          <h3>Things to address</h3>
                        </div>
                      </div>

                      <div className="analysis-list">
                        {selectedTender.gaps.map((gap) => (
                          <div key={gap}>
                            <span>!</span>
                            <p>{gap}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* REQUIREMENTS */}
                  <div className="analysis-detail-card requirements-analysis-card">
                    <div className="analysis-detail-header">
                      <span>▤</span>
                      <div>
                        <p>KEY REQUIREMENTS</p>
                        <h3>What the tender expects</h3>
                      </div>
                    </div>

                    <div className="requirements-analysis-grid">
                      {selectedTender.requirements.map(
                        (requirement, index) => (
                          <div key={requirement}>
                            <span>{index + 1}</span>
                            <p>{requirement}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* FINAL VERDICT */}
                  <div className="final-verdict">
                    <div>
                      <span>✦</span>

                      <div>
                        <p>AI FINAL VERDICT</p>
                        <h3>{selectedTender.recommendation}</h3>
                        <small>
                          Risk score: {selectedTender.riskScore}/100 · Match
                          score: {selectedTender.match}%
                        </small>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/tenders/${encodeURIComponent(
                            selectedTender.title
                          )}`
                        )
                      }
                    >
                      View Tender Details →
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default AnalyticsPage;