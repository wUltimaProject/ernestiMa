import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuestionnairePage } from "./pages/QuestionnairePage";
import { EstimationsListPage } from "./pages/EstimationsListPage";
import { EstimationDetailPage } from "./pages/EstimationDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuestionnairePage />} />
        <Route path="/estimations" element={<EstimationsListPage />} />
        <Route path="/estimations/:id" element={<EstimationDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

