import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./TenderAnalysisPage.css";

type AnalysisFormData = {
  minimumProfitMargin: string;
  availableInventoryCapacity: string;
  currentInventoryValue: string;
  monthlyOperatingCost: string;
  outstandingPayments: string;
  availableWorkingCapital: string;
  deliveryCapacity: string;
  additionalNotes: string;
};

function TenderAnalysisPage() {
  const navigate = useNavigate();
  const { tenderTitle } = useParams();

  const decodedTenderTitle = decodeURIComponent(tenderTitle || "");

  const [formData, setFormData] = useState<AnalysisFormData>({
    minimumProfitMargin: "",
    availableInventoryCapacity: "",
    currentInventoryValue: "",
    monthlyOperatingCost: "",
    outstandingPayments: "",
    availableWorkingCapital: "",
    deliveryCapacity: "",
    additionalNotes: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    /*
      Later, this is where we will send:

      1. Tender details
      2. Vendor's business inputs
      3. Market information

      to your Django backend and AI analysis agent.
    */

    console.log("Tender being analyzed:", decodedTenderTitle);
    console.log("Business analysis inputs:", formData);

    // Temporary confirmation until the AI agent and results page are connected
    alert(
      "Your business information has been collected. AI analysis will be connected here next."
    );
  };

  return (
    <div className="tender-analysis-page">
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
            onClick={() => navigate("/notifications")}
          >
            <span>◌</span>
            Notifications
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
            onClick={() => navigate(-1)}
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
              AI TENDER ANALYSIS
            </p>

            <h1>
              Prepare your <span>business intelligence.</span>
            </h1>

            <p>
              Provide a few details about your current business position.
              BidWise AI will combine this information with tender requirements
              and market conditions to help evaluate whether the opportunity is
              commercially viable.
            </p>
          </section>

          {/* TENDER SUMMARY */}
          <section className="analysis-input-tender-summary">
            <div>
              <span className="analysis-input-summary-label">
                SELECTED OPPORTUNITY
              </span>

              <h2>{decodedTenderTitle || "Tender Opportunity"}</h2>

              <p>
                Your information will be analyzed specifically for this tender.
              </p>
            </div>

            <div className="analysis-input-summary-icon">✦</div>
          </section>

          {/* FORM */}
          <form className="analysis-input-form" onSubmit={handleSubmit}>
            {/* PROFIT */}
            <section className="analysis-input-section">
              <div className="analysis-input-section-heading">
                <span>01</span>

                <div>
                  <h2>Profit & commercial expectations</h2>
                  <p>
                    Help us understand the minimum commercial outcome your
                    business expects from this opportunity.
                  </p>
                </div>
              </div>

              <div className="analysis-input-grid">
                <label>
                  <span>Minimum acceptable profit margin (%)</span>

                  <input
                    type="number"
                    name="minimumProfitMargin"
                    value={formData.minimumProfitMargin}
                    onChange={handleChange}
                    placeholder="Example: 15"
                    min="0"
                    max="100"
                  />
                </label>

                <label>
                  <span>Monthly operating cost (₹)</span>

                  <input
                    type="number"
                    name="monthlyOperatingCost"
                    value={formData.monthlyOperatingCost}
                    onChange={handleChange}
                    placeholder="Example: 500000"
                    min="0"
                  />
                </label>
              </div>
            </section>

            {/* INVENTORY */}
            <section className="analysis-input-section">
              <div className="analysis-input-section-heading">
                <span>02</span>

                <div>
                  <h2>Inventory & delivery capacity</h2>
                  <p>
                    Tell us about your available resources and whether your
                    business can realistically fulfill the tender requirements.
                  </p>
                </div>
              </div>

              <div className="analysis-input-grid">
                <label>
                  <span>Available inventory / production capacity (%)</span>

                  <input
                    type="number"
                    name="availableInventoryCapacity"
                    value={formData.availableInventoryCapacity}
                    onChange={handleChange}
                    placeholder="Example: 70"
                    min="0"
                    max="100"
                  />
                </label>

                <label>
                  <span>Current inventory value (₹)</span>

                  <input
                    type="number"
                    name="currentInventoryValue"
                    value={formData.currentInventoryValue}
                    onChange={handleChange}
                    placeholder="Example: 2500000"
                    min="0"
                  />
                </label>

                <label className="analysis-input-full-width">
                  <span>Delivery / project execution capacity</span>

                  <input
                    type="text"
                    name="deliveryCapacity"
                    value={formData.deliveryCapacity}
                    onChange={handleChange}
                    placeholder="Example: Can execute projects worth up to ₹5 Cr simultaneously"
                  />
                </label>
              </div>
            </section>

            {/* FINANCIAL */}
            <section className="analysis-input-section">
              <div className="analysis-input-section-heading">
                <span>03</span>

                <div>
                  <h2>Financial position & commitments</h2>
                  <p>
                    These details help the AI estimate financial pressure and
                    payment-related risks during project execution.
                  </p>
                </div>
              </div>

              <div className="analysis-input-grid">
                <label>
                  <span>Outstanding payments / current dues (₹)</span>

                  <input
                    type="number"
                    name="outstandingPayments"
                    value={formData.outstandingPayments}
                    onChange={handleChange}
                    placeholder="Example: 1000000"
                    min="0"
                  />
                </label>

                <label>
                  <span>Available working capital (₹)</span>

                  <input
                    type="number"
                    name="availableWorkingCapital"
                    value={formData.availableWorkingCapital}
                    onChange={handleChange}
                    placeholder="Example: 3500000"
                    min="0"
                  />
                </label>
              </div>
            </section>

            {/* ADDITIONAL CONTEXT */}
            <section className="analysis-input-section">
              <div className="analysis-input-section-heading">
                <span>04</span>

                <div>
                  <h2>Additional business context</h2>
                  <p>
                    Share anything else that may affect your ability to bid or
                    execute this project.
                  </p>
                </div>
              </div>

              <label className="analysis-input-notes">
                <span>Additional notes (optional)</span>

                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  placeholder="Example: We have an ongoing project that may affect manpower availability for the next three months..."
                  rows={5}
                />
              </label>
            </section>

            {/* AI NOTICE */}
            <div className="analysis-input-ai-notice">
              <span>✦</span>

              <p>
                Your inputs will be used together with tender requirements,
                business data, and market intelligence to generate a detailed
                commercial and risk analysis.
              </p>
            </div>

            {/* ACTIONS */}
            <div className="analysis-input-actions">
              <button
                type="button"
                className="analysis-input-cancel-button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="analysis-input-submit-button"
              >
                ✦ Start AI Analysis
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default TenderAnalysisPage;