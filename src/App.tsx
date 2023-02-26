import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { ErrorPage, HomePage, InvoicePage } from "./pages";

function App() {
  return (
    <div className="App">
      {/* Place SideNavBar here */}

      <Routes>
        <Route path="/invoices/:id" element={<InvoicePage />} />
        <Route path="/invoices" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />

        {/* This must always be at the end */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
