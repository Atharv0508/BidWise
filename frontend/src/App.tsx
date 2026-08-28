import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TendersPage from "./pages/TendersPage";
import SavedTendersPage from "./pages/SavedTendersPage";
import TenderDetailsPage from "./pages/TenderDetailsPage";

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
        <Route
          path="/tenders/:tenderTitle"
          element={<TenderDetailsPage />}
        />
        <Route
          path="/saved-tenders"
          element={<SavedTendersPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;