import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RedirectPage from "./pages/RedirectPage";
import ViewLink from "../components/ViewLink";
import LinkForm from "../components/LinkForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
         <Route path="/view/:code" element={<ViewLink />} />
          <Route path="/add-link" element={<LinkForm />} />
        <Route path="/:code" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
