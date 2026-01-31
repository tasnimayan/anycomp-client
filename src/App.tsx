import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { RegisterCompanyPage } from "./features/register-company/pages/RegisterCopanyPage";
import { SpecialistsPage } from "./features/specialists";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpecialistsPage />} />
        <Route path="/company" element={<RegisterCompanyPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
