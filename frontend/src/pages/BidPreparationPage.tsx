import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./BidPreparationPage.css";

type Tender = {
  title: string;
  organization: string;
  location: string;
  category: string;
  value: string;
  deadline: string;
  portalUrl: string;
  requirements: string[];
};

const tenders: Tender[] = [
  {
    title: "Smart City Infrastructure Development",
    organization: "Urban Development Authority",
    location: "Mumbai, Maharashtra",
    category: "Infrastructure",
    value: "₹4.2 Cr",
    deadline: "2 days left",

    // Replace this with the exact tender URL from the official portal
    portalUrl: "https://etenders.gov.in/eprocure/app",

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

    portalUrl: "https://etenders.gov.in/eprocure/app",

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

    portalUrl: "https://etenders.gov.in/eprocure/app",

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

    portalUrl: "https://etenders.gov.in/eprocure/app",

    requirements: [
      "Registered contractor with relevant construction experience",
      "Previous experience with commercial or government projects",
      "Qualified engineering and site management personnel",
      "Compliance with safety and quality regulations",
    ],
  },
];

function BidPreparationPage() {
  const navigate = useNavigate();
  const { tenderTitle } = useParams();

  const tender = tenders.find(
    (item) => item.title === decodeURIComponent(tenderTitle || "")
  );

  const [bidData, setBidData] = useState({
    materialCost: "",
    labourCost: "",
    equipmentLogisticsCost: "",
    otherExpenses: "",
    contingencyAmount: "",
    proposedBidAmount: "",
    executionPlan: "",
  });

  const [completedRequirements, setCompletedRequirements] = useState<
    string[]
  >([]);

  if (!tender) {
    return (
      <div className="bid-preparation-not-found">
        <div>
          <h1>Tender not found</h1>

          <button onClick={() => navigate("/tenders")}>
            ← Back to Opportunities
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     NUMBER HELPERS
  ========================= */

  const parseAmount = (value: string) => {
    return Number(value.replace(/[^0-9.]/g, "")) || 0;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  /* =========================
     COMMERCIAL CALCULATIONS
  ========================= */

  const materialCost = parseAmount(bidData.materialCost);

  const labourCost = parseAmount(bidData.labourCost);

  const equipmentLogisticsCost = parseAmount(
    bidData.equipmentLogisticsCost
  );

  const otherExpenses = parseAmount(bidData.otherExpenses);

  const contingencyAmount = parseAmount(
    bidData.contingencyAmount
  );

  const proposedBidAmount = parseAmount(
    bidData.proposedBidAmount
  );

  const totalProjectCost =
    materialCost +
    labourCost +
    equipmentLogisticsCost +
    otherExpenses +
    contingencyAmount;

  const expectedProfit =
    proposedBidAmount - totalProjectCost;

  const profitMargin =
    proposedBidAmount > 0
      ? (expectedProfit / proposedBidAmount) * 100
      : 0;

  /* =========================
     INPUT HANDLER
  ========================= */

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setBidData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  /* =========================
     REQUIREMENT CHECKLIST
  ========================= */

  const toggleRequirement = (requirement: string) => {
    setCompletedRequirements((currentRequirements) =>
      currentRequirements.includes(requirement)
        ? currentRequirements.filter(
            (item) => item !== requirement
          )
        : [...currentRequirements, requirement]
    );
  };

  /* =========================
     PROGRESS
  ========================= */

  const completedCommercialFields = [
    bidData.materialCost,
    bidData.labourCost,
    bidData.equipmentLogisticsCost,
    bidData.otherExpenses,
    bidData.contingencyAmount,
    bidData.proposedBidAmount,
  ].filter((value) => value.trim() !== "").length;

  const completedExecutionFields =
    bidData.executionPlan.trim().length > 0 ? 1 : 0;

  const totalProgressItems =
    tender.requirements.length + 7;

  const completedProgressItems =
    completedRequirements.length +
    completedCommercialFields +
    completedExecutionFields;

  const progress = Math.round(
    (completedProgressItems / totalProgressItems) * 100
  );

  /* =========================
     TEMPORARY EXECUTION
     READINESS SCORE
  ========================= */

  const requirementsScore =
    (completedRequirements.length /
      tender.requirements.length) *
    30;

  const commercialScore =
    (completedCommercialFields / 6) * 30;

  let executionPlanScore = 0;

  if (bidData.executionPlan.trim().length >= 150) {
    executionPlanScore = 40;
  } else if (bidData.executionPlan.trim().length >= 80) {
    executionPlanScore = 25;
  } else if (bidData.executionPlan.trim().length >= 30) {
    executionPlanScore = 10;
  }

  let executionReadinessScore = Math.round(
    requirementsScore +
      commercialScore +
      executionPlanScore
  );

  executionReadinessScore = Math.min(
    executionReadinessScore,
    100
  );

  const readinessLabel =
    executionReadinessScore >= 80
      ? "Strong"
      : executionReadinessScore >= 60
      ? "Good"
      : executionReadinessScore > 0
      ? "Needs Improvement"
      : "Not Started";

  /* =========================
     SAVE DRAFT
  ========================= */

  const saveDraft = () => {
    const bidDraft = {
      tender,
      bidData,
      completedRequirements,

      calculations: {
        totalProjectCost,
        expectedProfit,
        profitMargin,
        executionReadinessScore,
      },

      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      `bidDraft_${tender.title}`,
      JSON.stringify(bidDraft)
    );
  };

  const handleSaveDraft = () => {
    saveDraft();

    alert("Bid draft saved successfully!");
  };

  /* =========================
     APPLY FOR BID
  ========================= */

  const handleApplyForBid = () => {
    /*
      Save the vendor's BidWise preparation
      before sending them to the official
      tender portal.
    */

    saveDraft();

    /*
      Open the official tender portal
      in a new browser tab.
    */

    window.open(
      tender.portalUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="bid-preparation-page">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="bid-sidebar">

        <Link to="/" className="bid-logo">

          <span className="bid-logo-mark">
            B
          </span>

          <span>
            BID<span>WISE</span>
          </span>

        </Link>

        <nav className="bid-sidebar-nav">

          <p className="bid-nav-label">
            WORKSPACE
          </p>

          <button
            className="bid-sidebar-item"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="bid-sidebar-item active"
            onClick={() =>
              navigate("/tenders")
            }
          >
            <span>◈</span>
            Opportunities
          </button>

          <button
            className="bid-sidebar-item"
            onClick={() =>
              navigate("/saved-tenders")
            }
          >
            <span>☆</span>
            Saved Tenders
          </button>

          <button
            className="bid-sidebar-item"
            onClick={() =>
              navigate("/analytics")
            }
          >
            <span>▣</span>
            Analytics
          </button>

        </nav>

        <div className="bid-sidebar-upgrade">

          <div>✦</div>

          <div>
            <strong>
              BidWise AI
            </strong>

            <p>
              Smarter tender decisions.
            </p>
          </div>

        </div>

        <Link
          to="/"
          className="bid-sidebar-back"
        >
          ← Back to website
        </Link>

      </aside>

      {/* =========================
          MAIN
      ========================= */}

      <main className="bid-main">

        <header className="bid-topbar">

          <button
            className="bid-back-button"
            onClick={() =>
              navigate(
                `/tenders/${encodeURIComponent(
                  tender.title
                )}`
              )
            }
          >
            ← Back to Tender
          </button>

          <div className="bid-user-profile">

            <div className="bid-user-avatar">
              A
            </div>

            <div>
              <strong>
                Atharv
              </strong>

              <span>
                Vendor Account
              </span>
            </div>

          </div>

        </header>

        <div className="bid-content">

          {/* =========================
              HEADER
          ========================= */}

          <section className="bid-header">

            <p>
              PREPARE YOUR BID
            </p>

            <h1>
              Build a winning{" "}
              <span>
                proposal.
              </span>
            </h1>

            <p>
              Complete the requirements,
              calculate your project costs,
              plan execution, and prepare
              your bid before applying through
              the official tender portal.
            </p>

          </section>

          {/* =========================
              TENDER SUMMARY
          ========================= */}

          <section className="bid-tender-summary">

            <div className="bid-tender-icon">
              ◈
            </div>

            <div>

              <span>
                PREPARING BID FOR
              </span>

              <h2>
                {tender.title}
              </h2>

              <p>
                {tender.organization}
              </p>

            </div>

            <div className="bid-tender-value">

              <span>
                ESTIMATED VALUE
              </span>

              <strong>
                {tender.value}
              </strong>

            </div>

          </section>

          {/* =========================
              PROGRESS
          ========================= */}

          <section className="bid-progress-card">

            <div className="bid-progress-header">

              <div>

                <span>
                  BID PREPARATION PROGRESS
                </span>

                <h2>
                  {progress}% Complete
                </h2>

              </div>

              <strong>
                {completedProgressItems}/
                {totalProgressItems}
              </strong>

            </div>

            <div className="bid-progress-bar">

              <div
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </section>

          {/* =========================
              REQUIREMENTS
          ========================= */}

          <section className="bid-section">

            <div className="bid-section-header">

              <span>
                01
              </span>

              <div>

                <h2>
                  Requirement checklist
                </h2>

                <p>
                  Confirm that your business
                  meets each tender requirement.
                </p>

              </div>

            </div>

            <div className="bid-checklist">

              {tender.requirements.map(
                (requirement) => {

                  const isCompleted =
                    completedRequirements.includes(
                      requirement
                    );

                  return (
                    <button
                      type="button"
                      className={`bid-checklist-item ${
                        isCompleted
                          ? "completed"
                          : ""
                      }`}
                      key={requirement}
                      onClick={() =>
                        toggleRequirement(
                          requirement
                        )
                      }
                    >

                      <span>
                        {isCompleted
                          ? "✓"
                          : ""}
                      </span>

                      <p>
                        {requirement}
                      </p>

                    </button>
                  );
                }
              )}

            </div>

          </section>

          {/* =========================
              COMMERCIAL PROPOSAL
          ========================= */}

          <section className="bid-section">

            <div className="bid-section-header">

              <span>
                02
              </span>

              <div>

                <h2>
                  Commercial proposal
                </h2>

                <p>
                  Enter your expected project
                  expenses. BidWise automatically
                  calculates your total cost,
                  expected profit, and margin.
                </p>

              </div>

            </div>

            <div className="bid-form-grid">

              <label>

                <span>
                  Material costs (₹)
                </span>

                <input
                  type="text"
                  name="materialCost"
                  placeholder="Example: ₹2,00,00,000"
                  value={
                    bidData.materialCost
                  }
                  onChange={handleChange}
                />

              </label>

              <label>

                <span>
                  Labour costs (₹)
                </span>

                <input
                  type="text"
                  name="labourCost"
                  placeholder="Example: ₹50,00,000"
                  value={
                    bidData.labourCost
                  }
                  onChange={handleChange}
                />

              </label>

              <label>

                <span>
                  Equipment / logistics costs (₹)
                </span>

                <input
                  type="text"
                  name="equipmentLogisticsCost"
                  placeholder="Example: ₹20,00,000"
                  value={
                    bidData.equipmentLogisticsCost
                  }
                  onChange={handleChange}
                />

              </label>

              <label>

                <span>
                  Other expenses (₹)
                </span>

                <input
                  type="text"
                  name="otherExpenses"
                  placeholder="Example: ₹10,00,000"
                  value={
                    bidData.otherExpenses
                  }
                  onChange={handleChange}
                />

              </label>

              <label>

                <span>
                  Contingency amount (₹)
                </span>

                <input
                  type="text"
                  name="contingencyAmount"
                  placeholder="Example: ₹15,00,000"
                  value={
                    bidData.contingencyAmount
                  }
                  onChange={handleChange}
                />

              </label>

              <label>

                <span>
                  Proposed bid amount (₹)
                </span>

                <input
                  type="text"
                  name="proposedBidAmount"
                  placeholder="Example: ₹4,00,00,000"
                  value={
                    bidData.proposedBidAmount
                  }
                  onChange={handleChange}
                />

              </label>

            </div>

            {/* =========================
                CALCULATIONS
            ========================= */}

            <div className="bid-calculation-grid">

              <div className="bid-calculation-card">

                <span>
                  TOTAL PROJECT COST
                </span>

                <strong>
                  {formatCurrency(
                    totalProjectCost
                  )}
                </strong>

                <p>
                  Automatically calculated from
                  all project expenses.
                </p>

              </div>

              <div className="bid-calculation-card">

                <span>
                  EXPECTED PROFIT
                </span>

                <strong
                  className={
                    expectedProfit < 0
                      ? "negative-profit"
                      : ""
                  }
                >
                  {formatCurrency(
                    expectedProfit
                  )}
                </strong>

                <p>
                  Proposed bid amount minus
                  total project cost.
                </p>

              </div>

              <div className="bid-calculation-card">

                <span>
                  PROFIT MARGIN
                </span>

                <strong>
                  {profitMargin.toFixed(1)}%
                </strong>

                <p>
                  Expected profit as a percentage
                  of your proposed bid.
                </p>

              </div>

            </div>

          </section>

          {/* =========================
              EXECUTION PLAN
          ========================= */}

          <section className="bid-section">

            <div className="bid-section-header">

              <span>
                03
              </span>

              <div>

                <h2>
                  Execution plan
                </h2>

                <p>
                  Explain how your business will
                  realistically deliver this project
                  within the required timeline.
                </p>

              </div>

            </div>

            <div className="bid-textarea-group">

              <label>

                <span>
                  Project execution plan
                </span>

                <textarea
                  name="executionPlan"
                  rows={7}
                  placeholder="Describe your project timeline, workforce, materials, equipment, milestones, delivery plan, and important risks or dependencies..."
                  value={
                    bidData.executionPlan
                  }
                  onChange={handleChange}
                />

              </label>

            </div>

            {/* =========================
                READINESS
            ========================= */}

            <div className="bid-readiness-card">

              <div>

                <span>
                  BID PREPARATION READINESS
                </span>

                <h3>
                  {readinessLabel}
                </h3>

                <p>
                  This is currently a preparation
                  score based on your completed
                  requirements, commercial inputs,
                  and execution plan. Once the
                  Django AI agent is connected,
                  this can be replaced with the
                  actual AI and market analysis.
                </p>

              </div>

              <div className="bid-readiness-score">

                <strong>
                  {executionReadinessScore}
                </strong>

                <span>
                  /100
                </span>

              </div>

            </div>

          </section>

          {/* =========================
              AI TIP
          ========================= */}

          <section className="bid-ai-tip">

            <span>
              ✦
            </span>

            <div>

              <strong>
                BidWise AI Tip
              </strong>

              <p>
                Competitive bids are not always
                the cheapest. The strongest bid
                balances realistic costs,
                sustainable profit margins,
                market competitiveness, and
                your ability to execute
                successfully.
              </p>

            </div>

          </section>

          {/* =========================
              ACTIONS
          ========================= */}

          <div className="bid-actions">

            <button
              type="button"
              className="bid-save-button"
              onClick={handleSaveDraft}
            >
              Save Draft
            </button>

            <button
              type="button"
              className="bid-continue-button"
              onClick={handleApplyForBid}
            >
              Apply for Bid →
            </button>

          </div>

          {/* =========================
              PORTAL NOTICE
          ========================= */}

          <div className="bid-portal-notice">

            <span>
              ↗
            </span>

            <p>
              When you click Apply for Bid,
              your BidWise preparation will be
              saved and you will be redirected
              to the official tender portal.
              You will complete the final
              submission there.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default BidPreparationPage;