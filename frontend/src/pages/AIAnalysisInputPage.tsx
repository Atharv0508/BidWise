import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AIAnalysisInputPage.css";

const tenders = [
  {
    title: "Smart City Infrastructure Development",
    organization: "Urban Development Authority",
    location: "Mumbai, Maharashtra",
    category: "Infrastructure",
    value: "₹4.2 Cr",
    deadline: "2 days left",
  },
  {
    title: "Supply of Industrial Electrical Equipment",
    organization: "State Electricity Board",
    location: "Pune, Maharashtra",
    category: "Electrical",
    value: "₹1.8 Cr",
    deadline: "5 days left",
  },
  {
    title: "IT Infrastructure Modernization Project",
    organization: "National Technology Department",
    location: "Bengaluru, Karnataka",
    category: "Technology",
    value: "₹6.5 Cr",
    deadline: "7 days left",
  },
  {
    title: "Government Office Renovation and Maintenance",
    organization: "Public Works Department",
    location: "New Delhi",
    category: "Construction",
    value: "₹3.1 Cr",
    deadline: "10 days left",
  },
];

function AIAnalysisInputPage() {
  const navigate = useNavigate();
  const { tenderTitle } = useParams();

  const tender = tenders.find(
    (item) => item.title === decodeURIComponent(tenderTitle || "")
  );

  const [formData, setFormData] = useState({
    minimumProfitMargin: "",
    availableCapital: "",
    inventoryCapacity: "",
    currentCommitments: "",
    paymentDue: "",
    workforceCapacity: "",
    completionCapacity: "",
    additionalNotes: "",
  });

  if (!tender) {
    return (
      <div className="analysis-input-not-found">
        <h1>Tender not found</h1>

        <button onClick={() => navigate("/tenders")}>
          ← Back to Opportunities
        </button>
      </div>
    );
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const analysisRequest = {
      tender,
      businessInputs: formData,
      createdAt: new Date().toISOString(),
    };

    try {
      // Save the analysis data temporarily.
      // Later this will be replaced with a request to your Django AI backend.
      localStorage.setItem(
        "currentAnalysisRequest",
        JSON.stringify(analysisRequest)
      );

      // Confirm that the data was successfully saved.
      const savedAnalysis = localStorage.getItem(
        "currentAnalysisRequest"
      );

      if (!savedAnalysis) {
        alert("Unable to save analysis data. Please try again.");
        return;
      }

      navigate(
        `/analysis/results/${encodeURIComponent(tender.title)}`
      );
    } catch (error) {
      console.error("Error preparing analysis:", error);
      alert("Something went wrong while preparing the analysis.");
    }
  };

  return (
    <div className="analysis-input-page">
      {/* SIDEBAR */}
      <aside className="analysis-input-sidebar">
        <Link to="/" className="analysis-input-logo">
          <span className="analysis-input-logo-mark">B</span>

          <span>
            BID<span>WISE</span>
          </span>
        </Link>

        <nav className="analysis-input-sidebar-nav">
          <p className="analysis-input-nav-label">WORKSPACE</p>

          <button
            className="analysis-input-sidebar-item"
            onClick={() => navigate("/dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="analysis-input-sidebar-item active"
            onClick={() => navigate("/tenders")}
          >
            <span>◈</span>
            Opportunities
          </button>

          <button
            className="analysis-input-sidebar-item"
            onClick={() => navigate("/saved-tenders")}
          >
            <span>☆</span>
            Saved Tenders
          </button>

          <button
            className="analysis-input-sidebar-item"
            onClick={() => navigate("/analytics")}
          >
            <span>▣</span>
            Analytics
          </button>

          <p className="analysis-input-nav-label analysis-input-second-label">
            MANAGEMENT
          </p>

          <button
            className="analysis-input-sidebar-item"
            onClick={() => navigate("/vendors")}
          >
            <span>◉</span>
            Vendors
          </button>

          <button
            className="analysis-input-sidebar-item"
            onClick={() => navigate("/payments")}
          >
            <span>₹</span>
            Payments
          </button>

          <button
            className="analysis-input-sidebar-item"
            onClick={() => navigate("/settings")}
          >
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="analysis-input-sidebar-upgrade">
          <div className="analysis-input-upgrade-icon">✦</div>

          <div>
            <strong>BidWise AI</strong>
            <p>Smarter tender decisions.</p>
          </div>
        </div>

        <Link to="/" className="analysis-input-sidebar-back">
          ← Back to website
        </Link>
      </aside>

      {/* MAIN CONTENT */}
      <main className="analysis-input-main">
        <header className="analysis-input-topbar">
          <button
            className="analysis-input-back-button"
            onClick={() =>
              navigate(`/tenders/${encodeURIComponent(tender.title)}`)
            }
          >
            ← Back to Tender
          </button>

          <div className="analysis-input-user-profile">
            <div className="analysis-input-user-avatar">A</div>

            <div>
              <strong>Atharv</strong>
              <span>Vendor Account</span>
            </div>
          </div>
        </header>

        <div className="analysis-input-content">
          {/* HEADER */}
          <section className="analysis-input-header">
            <p className="analysis-input-eyebrow">
              <span className="analysis-input-status-dot" />
              BIDWISE AI ANALYSIS
            </p>

            <h1>
              Let's analyze this <span>opportunity.</span>
            </h1>

            <p>
              Provide a few details about your current business situation. Our
              AI will combine this information with the tender details to help
              you make a smarter bidding decision.
            </p>
          </section>

          {/* TENDER SUMMARY */}
          <section className="analysis-tender-summary">
            <div className="analysis-tender-summary-icon">◈</div>

            <div className="analysis-tender-summary-info">
              <span>ANALYZING TENDER</span>

              <h2>{tender.title}</h2>

              <p>{tender.organization}</p>

              <div>
                <span>{tender.location}</span>
                <span>•</span>
                <span>{tender.value}</span>
                <span>•</span>
                <span>{tender.deadline}</span>
              </div>
            </div>
          </section>

          {/* FORM */}
          <form className="analysis-input-form" onSubmit={handleSubmit}>
            {/* FINANCIAL DETAILS */}
            <section className="analysis-form-section">
              <div className="analysis-form-section-header">
                <div className="analysis-form-icon">₹</div>

                <div>
                  <p>FINANCIAL POSITION</p>
                  <h2>Tell us about your financial capacity</h2>

                  <span>
                    This helps us estimate profitability and financial risk.
                  </span>
                </div>
              </div>

              <div className="analysis-form-grid">
                <div className="analysis-form-field">
                  <label htmlFor="minimumProfitMargin">
                    Minimum acceptable profit margin (%)
                  </label>

                  <input
                    id="minimumProfitMargin"
                    name="minimumProfitMargin"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Example: 15"
                    value={formData.minimumProfitMargin}
                    onChange={handleChange}
                  />
                </div>

                <div className="analysis-form-field">
                  <label htmlFor="availableCapital">
                    Available capital for this project
                  </label>

                  <input
                    id="availableCapital"
                    name="availableCapital"
                    type="text"
                    placeholder="Example: ₹50,00,000"
                    value={formData.availableCapital}
                    onChange={handleChange}
                  />
                </div>

                <div className="analysis-form-field">
                  <label htmlFor="paymentDue">
                    Current outstanding payments / liabilities
                  </label>

                  <input
                    id="paymentDue"
                    name="paymentDue"
                    type="text"
                    placeholder="Example: ₹10,00,000"
                    value={formData.paymentDue}
                    onChange={handleChange}
                  />
                </div>

                <div className="analysis-form-field">
                  <label htmlFor="currentCommitments">
                    Other ongoing financial commitments
                  </label>

                  <input
                    id="currentCommitments"
                    name="currentCommitments"
                    type="text"
                    placeholder="Example: Two ongoing projects"
                    value={formData.currentCommitments}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {/* BUSINESS CAPACITY */}
            <section className="analysis-form-section">
              <div className="analysis-form-section-header">
                <div className="analysis-form-icon">◉</div>

                <div>
                  <p>BUSINESS CAPACITY</p>
                  <h2>What resources do you currently have?</h2>

                  <span>
                    Help the AI understand whether you can realistically take
                    on this project.
                  </span>
                </div>
              </div>

              <div className="analysis-form-grid">
                <div className="analysis-form-field">
                  <label htmlFor="inventoryCapacity">
                    Current inventory / material capacity
                  </label>

                  <input
                    id="inventoryCapacity"
                    name="inventoryCapacity"
                    type="text"
                    placeholder="Describe available inventory or materials"
                    value={formData.inventoryCapacity}
                    onChange={handleChange}
                  />
                </div>

                <div className="analysis-form-field">
                  <label htmlFor="workforceCapacity">
                    Available workforce / team capacity
                  </label>

                  <input
                    id="workforceCapacity"
                    name="workforceCapacity"
                    type="text"
                    placeholder="Example: 25 skilled workers available"
                    value={formData.workforceCapacity}
                    onChange={handleChange}
                  />
                </div>

                <div className="analysis-form-field full-width">
                  <label htmlFor="completionCapacity">
                    Can your current business capacity handle this project?
                  </label>

                  <input
                    id="completionCapacity"
                    name="completionCapacity"
                    type="text"
                    placeholder="Describe your ability to complete the project within the required timeline"
                    value={formData.completionCapacity}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {/* ADDITIONAL INFORMATION */}
            <section className="analysis-form-section">
              <div className="analysis-form-section-header">
                <div className="analysis-form-icon">✦</div>

                <div>
                  <p>ADDITIONAL CONTEXT</p>
                  <h2>Anything else the AI should know?</h2>

                  <span>
                    Add any important business conditions, concerns, or project
                    limitations.
                  </span>
                </div>
              </div>

              <div className="analysis-form-field">
                <label htmlFor="additionalNotes">
                  Additional information
                </label>

                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  rows={5}
                  placeholder="Example: We may need to hire additional specialists, our supplier pricing may change next month, or any other information relevant to this tender."
                  value={formData.additionalNotes}
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* INFO */}
            <div className="analysis-input-info">
              <span>✦</span>

              <p>
                Your business information will be used only for analyzing this
                tender and generating recommendations for your bidding decision.
              </p>
            </div>

            {/* ACTIONS */}
            <div className="analysis-input-actions">
              <button
                type="button"
                className="analysis-input-cancel"
                onClick={() =>
                  navigate(`/tenders/${encodeURIComponent(tender.title)}`)
                }
              >
                Cancel
              </button>

              <button type="submit" className="run-analysis-button">
                Run AI Analysis ✦
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AIAnalysisInputPage;