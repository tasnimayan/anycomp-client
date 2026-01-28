import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SpecialistsPage } from "./features/specialists";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpecialistsPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
