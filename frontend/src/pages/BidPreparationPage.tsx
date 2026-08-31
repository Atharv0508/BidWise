import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./BidPreparationPage.css";

const tenders = [
  {
    title: "Smart City Infrastructure Development",
    organization: "Urban Development Authority",
    location: "Mumbai, Maharashtra",
    category: "Infrastructure",
    value: "₹4.2 Cr",
    deadline: "2 days left",
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

  const [completedRequirements, setCompletedRequirements] = useState<string[]>(
    []
  );

  if (!tender) {
    return (
      <div className="bid-preparation-not-found">
        <h1>Tender not found</h1>

        <button onClick={() => navigate("/tenders")}>
          ← Back to Opportunities
        </button>
      </div>
    );
  }

  /* Converts values such as ₹50,00,000 into numbers */
  const parseAmount = (value: string) => {
    return Number(value.replace(/[^0-9.]/g, "")) || 0;
  };

  /* Formats numbers into Indian currency */
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  /* Automatic calculations */
  const materialCost = parseAmount(bidData.materialCost);
  const labourCost = parseAmount(bidData.labourCost);
  const equipmentLogisticsCost = parseAmount(
    bidData.equipmentLogisticsCost
  );
  const otherExpenses = parseAmount(bidData.otherExpenses);
  const contingencyAmount = parseAmount(bidData.contingencyAmount);
  const proposedBidAmount = parseAmount(bidData.proposedBidAmount);

  const totalProjectCost =
    materialCost +
    labourCost +
    equipmentLogisticsCost +
    otherExpenses +
    contingencyAmount;

  const expectedProfit = proposedBidAmount - totalProjectCost;

  const profitMargin =
    proposedBidAmount > 0
      ? (expectedProfit / proposedBidAmount) * 100
      : 0;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setBidData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const toggleRequirement = (requirement: string) => {
    setCompletedRequirements((currentRequirements) =>
      currentRequirements.includes(requirement)
        ? currentRequirements.filter((item) => item !== requirement)
        : [...currentRequirements, requirement]
    );
  };

  /*
    Temporary execution readiness score.
    Later this should come from your Django backend + AI analysis.
  */
  let executionReadinessScore = 50;

  if (completedRequirements.length === tender.requirements.length) {
    executionReadinessScore += 20;
  } else {
    executionReadinessScore += Math.round(
      (completedRequirements.length / tender.requirements.length) * 15
    );
  }

  if (bidData.executionPlan.trim().length > 100) {
    executionReadinessScore += 15;
  } else if (bidData.executionPlan.trim().length > 30) {
    executionReadinessScore += 8;
  }

  if (profitMargin >= 10 && profitMargin <= 25) {
    executionReadinessScore += 10;
  }

  executionReadinessScore = Math.min(executionReadinessScore, 100);

  const readinessLabel =
    executionReadinessScore >= 80
      ? "Strong"
      : executionReadinessScore >= 60
      ? "Good"
      : "Needs Improvement";

  /*
    Progress calculation.
    We include completed requirements, commercial inputs,
    and execution plan.
  */
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

  const totalProgressItems = tender.requirements.length + 7;
  const completedProgressItems =
    completedRequirements.length +
    completedCommercialFields +
    completedExecutionFields;

  const progress = Math.round(
    (completedProgressItems / totalProgressItems) * 100
  );

  const handleSaveDraft = () => {
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

    alert("Bid draft saved successfully!");
  };

  return (
    <div className="bid-preparation-page">
      {/* SIDEBAR */}
      <aside className="bid-sidebar">
        <Link to="/" className="bid-logo">
          <span className="bid-logo-mark">B</span>

          <span>
            BID<span>WISE</span>
          </span>
        </Link>

        <nav className="bid-sidebar-nav">
          <p className="bid-nav-label">WORKSPACE</p>

          <button
            className="bid-sidebar-item"
            onClick={() => navigate("/dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="bid-sidebar-item active"
            onClick={() => navigate("/tenders")}
          >
            <span>◈</span>
            Opportunities
          </button>

          <button
            className="bid-sidebar-item"
            onClick={() => navigate("/saved-tenders")}
          >
            <span>☆</span>
            Saved Tenders
          </button>

          <button
            className="bid-sidebar-item"
            onClick={() => navigate("/analytics")}
          >
            <span>▣</span>
            Analytics
          </button>
        </nav>

        <div className="bid-sidebar-upgrade">
          <div>✦</div>

          <div>
            <strong>BidWise AI</strong>
            <p>Smarter tender decisions.</p>
          </div>
        </div>

        <Link to="/" className="bid-sidebar-back">
          ← Back to website
        </Link>
      </aside>

      {/* MAIN CONTENT */}
      <main className="bid-main">
        <header className="bid-topbar">
          <button
            className="bid-back-button"
            onClick={() =>
              navigate(`/tenders/${encodeURIComponent(tender.title)}`)
            }
          >
            ← Back to Tender
          </button>

          <div className="bid-user-profile">
            <div className="bid-user-avatar">A</div>

            <div>
              <strong>Atharv</strong>
              <span>Vendor Account</span>
            </div>
          </div>
        </header>

        <div className="bid-content">
          {/* PAGE HEADER */}
          <section className="bid-header">
            <p>PREPARE YOUR BID</p>

            <h1>
              Build a winning <span>proposal.</span>
            </h1>

            <p>
              Complete the requirements, calculate your costs, plan project
              execution, and prepare a financially sustainable bid.
            </p>
          </section>

          {/* TENDER SUMMARY */}
          <section className="bid-tender-summary">
            <div className="bid-tender-icon">◈</div>

            <div>
              <span>PREPARING BID FOR</span>
              <h2>{tender.title}</h2>
              <p>{tender.organization}</p>
            </div>

            <div className="bid-tender-value">
              <span>ESTIMATED VALUE</span>
              <strong>{tender.value}</strong>
            </div>
          </section>

          {/* PROGRESS */}
          <section className="bid-progress-card">
            <div className="bid-progress-header">
              <div>
                <span>BID PREPARATION PROGRESS</span>
                <h2>{progress}% Complete</h2>
              </div>

              <strong>
                {completedProgressItems}/{totalProgressItems}
              </strong>
            </div>

            <div className="bid-progress-bar">
              <div style={{ width: `${progress}%` }} />
            </div>
          </section>

          {/* REQUIREMENTS */}
          <section className="bid-section">
            <div className="bid-section-header">
              <span>01</span>

              <div>
                <h2>Requirement checklist</h2>
                <p>Confirm that your business meets each tender requirement.</p>
              </div>
            </div>

            <div className="bid-checklist">
              {tender.requirements.map((requirement) => {
                const isCompleted =
                  completedRequirements.includes(requirement);

                return (
                  <button
                    type="button"
                    className={`bid-checklist-item ${
                      isCompleted ? "completed" : ""
                    }`}
                    key={requirement}
                    onClick={() => toggleRequirement(requirement)}
                  >
                    <span>{isCompleted ? "✓" : ""}</span>
                    <p>{requirement}</p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* COMMERCIAL PROPOSAL */}
          <section className="bid-section">
            <div className="bid-section-header">
              <span>02</span>

              <div>
                <h2>Commercial proposal</h2>
                <p>
                  Add your estimated costs. BidWise automatically calculates
                  your total cost, expected profit, and profit margin.
                </p>
              </div>
            </div>

            <div className="bid-form-grid">
              <label>
                <span>Material costs (₹)</span>
                <input
                  type="text"
                  name="materialCost"
                  placeholder="Example: ₹2,00,00,000"
                  value={bidData.materialCost}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Labour costs (₹)</span>
                <input
                  type="text"
                  name="labourCost"
                  placeholder="Example: ₹50,00,000"
                  value={bidData.labourCost}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Equipment / logistics costs (₹)</span>
                <input
                  type="text"
                  name="equipmentLogisticsCost"
                  placeholder="Example: ₹20,00,000"
                  value={bidData.equipmentLogisticsCost}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Other expenses (₹)</span>
                <input
                  type="text"
                  name="otherExpenses"
                  placeholder="Example: ₹10,00,000"
                  value={bidData.otherExpenses}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Contingency amount (₹)</span>
                <input
                  type="text"
                  name="contingencyAmount"
                  placeholder="Example: ₹15,00,000"
                  value={bidData.contingencyAmount}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Proposed bid amount (₹)</span>
                <input
                  type="text"
                  name="proposedBidAmount"
                  placeholder="Example: ₹4,00,00,000"
                  value={bidData.proposedBidAmount}
                  onChange={handleChange}
                />
              </label>
            </div>

            {/* AUTOMATIC COMMERCIAL CALCULATIONS */}
            <div className="bid-calculation-grid">
              <div className="bid-calculation-card">
                <span>TOTAL PROJECT COST</span>
                <strong>{formatCurrency(totalProjectCost)}</strong>
                <p>Calculated from all project expenses</p>
              </div>

              <div className="bid-calculation-card">
                <span>EXPECTED PROFIT</span>
                <strong>{formatCurrency(expectedProfit)}</strong>
                <p>
                  {proposedBidAmount > 0
                    ? "Proposed bid amount minus total project cost"
                    : "Add a proposed bid amount to calculate profit"}
                </p>
              </div>

              <div className="bid-calculation-card">
                <span>PROFIT MARGIN</span>
                <strong>{profitMargin.toFixed(1)}%</strong>
                <p>Expected profit as a percentage of your bid</p>
              </div>
            </div>
          </section>

          {/* EXECUTION PLAN */}
          <section className="bid-section">
            <div className="bid-section-header">
              <span>03</span>

              <div>
                <h2>Execution plan</h2>
                <p>
                  Explain how your business will realistically deliver this
                  project within the required timeline.
                </p>
              </div>
            </div>

            <div className="bid-textarea-group">
              <label>
                <span>Project execution plan</span>

                <textarea
                  name="executionPlan"
                  rows={7}
                  placeholder="Describe your project timeline, workforce, materials, equipment, milestones, delivery plan, and any important risks or dependencies..."
                  value={bidData.executionPlan}
                  onChange={handleChange}
                />
              </label>
            </div>

            {/* AI READINESS SCORE */}
            <div className="bid-readiness-card">
              <div>
                <span>AI EXECUTION READINESS</span>

                <h3>
                  {readinessLabel} execution potential
                </h3>

                <p>
                  This temporary score considers your completed requirements,
                  commercial preparation, and execution plan. Your future AI
                  agent will evaluate this using detailed tender and market
                  information.
                </p>
              </div>

              <div className="bid-readiness-score">
                <strong>{executionReadinessScore}</strong>
                <span>/100</span>
              </div>
            </div>
          </section>

          {/* AI TIP */}
          <section className="bid-ai-tip">
            <span>✦</span>

            <div>
              <strong>BidWise AI Tip</strong>
              <p>
                Competitive bids are not always the cheapest. The strongest bid
                balances realistic costs, sustainable profit margins, market
                competitiveness, and your ability to execute successfully.
              </p>
            </div>
          </section>

          {/* ACTIONS */}
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
              onClick={handleSaveDraft}
            >
              Continue Bid Preparation →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BidPreparationPage;