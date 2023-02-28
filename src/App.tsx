import { HashRouter, Route, Routes } from "react-router-dom";
import { ErrorPage, HomePage, InvoicePage } from "./pages";
import "./App.scss";

function App() {
  return (
    <div className="App">
      {/* Place SideNavBar here */}
      <h1>Fix pipeline</h1>
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
