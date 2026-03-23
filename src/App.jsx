import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import InterBankForm from "./component/interBankForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/interbank-form" replace />} />
        <Route path="/interbank-form" element={<InterBankForm />} />
      </Routes>
    </Router>
  );
}

export default App;
