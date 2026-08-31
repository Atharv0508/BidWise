import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TendersPage from "./pages/TendersPage";
import SavedTendersPage from "./pages/SavedTendersPage";
import TenderDetailsPage from "./pages/TenderDetailsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AIAnalysisInputPage from "./pages/AIAnalysisInputPage";
import AIAnalysisResultsPage from "./pages/AIAnalysisResultsPage";
import BidPreparationPage from "./pages/BidPreparationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC PAGES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* TENDERS */}
        <Route path="/tenders" element={<TendersPage />} />

        {/* AI ANALYSIS INPUT */}
        <Route
          path="/tenders/:tenderTitle/ai-analysis"
          element={<AIAnalysisInputPage />}
        />

        {/* AI ANALYSIS RESULTS */}
        <Route
          path="/analysis/results/:tenderTitle"
          element={<AIAnalysisResultsPage />}
        />

        <Route
          path="/tenders/:tenderTitle/prepare-bid"
          element={<BidPreparationPage />}
        />
        
        {/* TENDER DETAILS */}
        <Route
          path="/tenders/:tenderTitle"
          element={<TenderDetailsPage />}
        />

        {/* SAVED TENDERS */}
        <Route
          path="/saved-tenders"
          element={<SavedTendersPage />}
        />

        {/* ANALYTICS */}
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;