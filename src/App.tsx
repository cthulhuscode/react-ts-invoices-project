import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { SideNavBar } from "./layout";
import { ErrorPage, HomePage, InvoicePage } from "./pages";

function App() {
  return (
    <div className="App">
      <SideNavBar />
      <HashRouter>
        <Routes>
          <Route path="/invoices/:id" element={<InvoicePage />} />
          <Route path="/invoices" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />

          {/* This must always be at the end */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
