import { Link, useNavigate, useParams } from "react-router-dom";
import "./AIAnalysisResultsPage.css";

type Tender = {
  title: string;
  organization: string;
  location: string;
  category: string;
  value: string;
  deadline: string;
};

type BusinessInputs = {
  minimumProfitMargin: string;
  availableCapital: string;
  inventoryCapacity: string;
  currentCommitments: string;
  paymentDue: string;
  workforceCapacity: string;
  completionCapacity: string;
  additionalNotes: string;
};

type AnalysisRequest = {
  tender: Tender;
  businessInputs: BusinessInputs;
  createdAt: string;
};

function AIAnalysisResultsPage() {
  const navigate = useNavigate();
  const { tenderTitle } = useParams();

  const storedAnalysis = localStorage.getItem("currentAnalysisRequest");

  let analysisRequest: AnalysisRequest | null = null;

  try {
    if (storedAnalysis) {
      analysisRequest = JSON.parse(storedAnalysis);
    }
  } catch {
    analysisRequest = null;
  }

  if (!analysisRequest) {
    return (
      <div className="analysis-results-not-found">
        <h1>No analysis found</h1>

        <p>
          Start an AI analysis from a tender opportunity to view your results.
        </p>

        <button onClick={() => navigate("/tenders")}>
          ← Back to Opportunities
        </button>
      </div>
    );
  }

  const { tender, businessInputs } = analysisRequest;

  // Temporary frontend analysis logic.
  // This will later be replaced by the Django backend + AI agent response.

  const minimumProfitMargin =
    Number(businessInputs.minimumProfitMargin) || 0;

  const availableCapital =
    Number(businessInputs.availableCapital.replace(/[^0-9.]/g, "")) || 0;

  const outstandingPayments =
    Number(businessInputs.paymentDue.replace(/[^0-9.]/g, "")) || 0;

  let riskScore = 42;

  if (minimumProfitMargin >= 25) riskScore += 5;
  if (availableCapital > 0 && availableCapital < 1000000) riskScore += 12;
  if (outstandingPayments > availableCapital) riskScore += 15;
  if (businessInputs.completionCapacity.toLowerCase().includes("cannot")) {
    riskScore += 15;
  }

  riskScore = Math.min(Math.max(riskScore, 0), 100);

  const riskLevel =
    riskScore <= 30
      ? "Low Risk"
      : riskScore <= 60
      ? "Medium Risk"
      : "High Risk";

  const recommendation =
    riskScore <= 35
      ? "Recommended to Bid"
      : riskScore <= 60
      ? "Review Carefully"
      : "High Risk — Avoid or Reassess";

  const profitabilityScore =
    minimumProfitMargin >= 20
      ? 82
      : minimumProfitMargin >= 12
      ? 72
      : 58;

  const financialScore =
    availableCapital > 0 && availableCapital >= outstandingPayments
      ? 78
      : 55;

  const capacityScore =
    businessInputs.completionCapacity.trim().length > 10 ? 76 : 62;

  const overallScore = Math.round(
    (profitabilityScore + financialScore + capacityScore + (100 - riskScore)) /
      4
  );

  const strengths = [
    `The tender value of ${tender.value} presents a potentially significant business opportunity.`,
    "Your submitted business information provides a foundation for evaluating commercial viability.",
    "The analysis can be refined further once supplier pricing and detailed market data are available.",
  ];

  const risks = [
    outstandingPayments > 0
      ? "Existing outstanding payments may create additional cash-flow pressure during project execution."
      : "Financial commitments should be monitored carefully before committing to the project.",
    "Market prices for materials, labour, and services may change during the execution period.",
    `The deadline is ${tender.deadline}, so bid preparation and financial planning should begin early.`,
  ];

  const recommendedActions = [
    "Collect current supplier quotations before submitting the final bid.",
    "Compare the expected project cost against the minimum profit margin you require.",
    "Confirm that available working capital can support the project until payments are received.",
    "Review all tender requirements and identify any capability or compliance gaps.",
  ];

  return (
    <div className="analysis-results-page">
      {/* SIDEBAR */}
      <aside className="analysis-results-sidebar">
        <Link to="/" className="analysis-results-logo">
          <span className="analysis-results-logo-mark">B</span>

          <span>
            BID<span>WISE</span>
          </span>
        </Link>

        <nav className="analysis-results-sidebar-nav">
          <p className="analysis-results-nav-label">WORKSPACE</p>

          <button
            className="analysis-results-sidebar-item"
            onClick={() => navigate("/dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="analysis-results-sidebar-item active"
            onClick={() => navigate("/tenders")}
          >
            <span>◈</span>
            Opportunities
          </button>

          <button
            className="analysis-results-sidebar-item"
            onClick={() => navigate("/saved-tenders")}
          >
            <span>☆</span>
            Saved Tenders
          </button>

          <button
            className="analysis-results-sidebar-item"
            onClick={() => navigate("/analytics")}
          >
            <span>▣</span>
            Analytics
          </button>

          <p className="analysis-results-nav-label analysis-results-second-label">
            MANAGEMENT
          </p>

          <button
            className="analysis-results-sidebar-item"
            onClick={() => navigate("/vendors")}
          >
            <span>◉</span>
            Vendors
          </button>

          <button
            className="analysis-results-sidebar-item"
            onClick={() => navigate("/payments")}
          >
            <span>₹</span>
            Payments
          </button>

          <button
            className="analysis-results-sidebar-item"
            onClick={() => navigate("/settings")}
          >
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="analysis-results-sidebar-upgrade">
          <div className="analysis-results-upgrade-icon">✦</div>

          <div>
            <strong>BidWise AI</strong>
            <p>Smarter tender decisions.</p>
          </div>
        </div>

        <Link to="/" className="analysis-results-sidebar-back">
          ← Back to website
        </Link>
      </aside>

      {/* MAIN CONTENT */}
      <main className="analysis-results-main">
        <header className="analysis-results-topbar">
          <button
            className="analysis-results-back-button"
            onClick={() =>
              navigate(`/tenders/${encodeURIComponent(tender.title)}`)
            }
          >
            ← Back to Tender
          </button>

          <div className="analysis-results-user-profile">
            <div className="analysis-results-user-avatar">A</div>

            <div>
              <strong>Atharv</strong>
              <span>Vendor Account</span>
            </div>
          </div>
        </header>

        <div className="analysis-results-content">
          {/* HEADER */}
          <section className="analysis-results-header">
            <p className="analysis-results-eyebrow">
              <span className="analysis-results-status-dot" />
              BIDWISE AI ANALYSIS COMPLETE
            </p>

            <h1>
              Here's what we found about your{" "}
              <span>opportunity.</span>
            </h1>

            <p>
              This analysis combines tender information with your submitted
              business and financial inputs to help you make a more informed
              bidding decision.
            </p>
          </section>

          {/* TENDER SUMMARY */}
          <section className="results-tender-summary">
            <div className="results-tender-summary-icon">◈</div>

            <div>
              <span>ANALYZED OPPORTUNITY</span>
              <h2>{tender.title}</h2>
              <p>{tender.organization}</p>

              <div className="results-tender-meta">
                <span>⌖ {tender.location}</span>
                <span>•</span>
                <span>{tender.value}</span>
                <span>•</span>
                <span>{tender.deadline}</span>
              </div>
            </div>
          </section>

          {/* MAIN VERDICT */}
          <section className="analysis-final-verdict">
            <div>
              <p>AI BID RECOMMENDATION</p>
              <h2>{recommendation}</h2>
              <span>
                Based on commercial potential, financial capacity, business
                readiness, and identified risks.
              </span>
            </div>

            <div className="overall-analysis-score">
              <span>OVERALL SCORE</span>
              <strong>{overallScore}</strong>
              <small>/100</small>
            </div>
          </section>

          {/* SCORE CARDS */}
          <section className="analysis-results-score-grid">
            <div className="results-score-card">
              <span>RISK SCORE</span>
              <strong>{riskScore}/100</strong>
              <p>{riskLevel}</p>
            </div>

            <div className="results-score-card">
              <span>PROFITABILITY</span>
              <strong>{profitabilityScore}/100</strong>
              <p>Based on your commercial expectations</p>
            </div>

            <div className="results-score-card">
              <span>FINANCIAL CAPACITY</span>
              <strong>{financialScore}/100</strong>
              <p>Current capital and payment pressure</p>
            </div>

            <div className="results-score-card">
              <span>EXECUTION CAPACITY</span>
              <strong>{capacityScore}/100</strong>
              <p>Current business readiness</p>
            </div>
          </section>

          {/* INSIGHTS GRID */}
          <section className="analysis-insights-grid">
            {/* PROFITABILITY */}
            <article className="results-analysis-card">
              <div className="results-card-header">
                <span>₹</span>

                <div>
                  <p>COMMERCIAL ANALYSIS</p>
                  <h2>Profitability outlook</h2>
                </div>
              </div>

              <p>
                Your minimum expected profit margin is{" "}
                <strong>
                  {businessInputs.minimumProfitMargin || "not specified"}%
                </strong>
                . Before bidding, the final project cost should be calculated
                using current supplier quotations, labour costs, logistics, and
                potential price fluctuations.
              </p>

              <div className="results-highlight">
                <span>✦</span>
                A detailed AI agent will later calculate estimated profit,
                break-even pricing, and commercial feasibility using real
                market data.
              </div>
            </article>

            {/* FINANCIAL */}
            <article className="results-analysis-card">
              <div className="results-card-header">
                <span>◎</span>

                <div>
                  <p>FINANCIAL PRESSURE</p>
                  <h2>Cash-flow assessment</h2>
                </div>
              </div>

              <p>
                Available project capital and outstanding financial obligations
                should be considered together. Projects often require spending
                on materials and operations before client payments are
                received.
              </p>

              <div className="results-highlight">
                <span>!</span>
                Payment delays or unexpected costs could increase working-capital
                pressure during execution.
              </div>
            </article>

            {/* MARKET */}
            <article className="results-analysis-card">
              <div className="results-card-header">
                <span>↗</span>

                <div>
                  <p>MARKET INTELLIGENCE</p>
                  <h2>Market situation</h2>
                </div>
              </div>

              <p>
                The final AI analysis should evaluate current market pricing,
                material availability, supplier quotations, competition, and
                industry conditions before giving a final commercial
                recommendation.
              </p>

              <div className="results-highlight">
                <span>⌁</span>
                Market intelligence will be connected to your future AI agent
                and verified data sources.
              </div>
            </article>

            {/* CAPACITY */}
            <article className="results-analysis-card">
              <div className="results-card-header">
                <span>◉</span>

                <div>
                  <p>OPERATIONAL READINESS</p>
                  <h2>Capacity assessment</h2>
                </div>
              </div>

              <p>
                Your inventory, workforce, and project execution capacity are
                important indicators of whether this tender can be completed
                without negatively affecting your existing operations.
              </p>

              <div className="results-highlight">
                <span>✓</span>
                Confirm resource availability and delivery timelines before
                committing to the project.
              </div>
            </article>
          </section>

          {/* STRENGTHS AND RISKS */}
          <section className="results-strength-risk-grid">
            <div className="results-list-card strengths">
              <div className="results-list-heading">
                <span>✓</span>

                <div>
                  <p>POSITIVE FACTORS</p>
                  <h2>Potential strengths</h2>
                </div>
              </div>

              {strengths.map((strength) => (
                <div className="results-list-item" key={strength}>
                  <span>✓</span>
                  <p>{strength}</p>
                </div>
              ))}
            </div>

            <div className="results-list-card risks">
              <div className="results-list-heading">
                <span>!</span>

                <div>
                  <p>POTENTIAL RISKS</p>
                  <h2>Things to watch</h2>
                </div>
              </div>

              {risks.map((risk) => (
                <div className="results-list-item" key={risk}>
                  <span>!</span>
                  <p>{risk}</p>
                </div>
              ))}
            </div>
          </section>

          {/* RECOMMENDED ACTIONS */}
          <section className="recommended-actions-section">
            <div className="recommended-actions-header">
              <p>WHAT TO DO NEXT</p>
              <h2>Recommended actions before bidding</h2>
            </div>

            <div className="recommended-actions-list">
              {recommendedActions.map((action, index) => (
                <div key={action}>
                  <span>{index + 1}</span>
                  <p>{action}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="results-bottom-actions">
            <div>
              <p>AI ANALYSIS STATUS</p>
              <h2>Analysis completed successfully</h2>
              <span>
                Future analyses will use your Django backend and AI agent to
                generate live, data-driven recommendations.
              </span>
            </div>

            <button
              onClick={() =>
                navigate(`/tenders/${encodeURIComponent(tender.title)}`)
              }
            >
              View Tender Details →
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AIAnalysisResultsPage;