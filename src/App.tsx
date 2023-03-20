import { HashRouter, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks/redux";
import { ErrorPage, HomePage, InvoicePage } from "./pages";
import { SideNavBar } from "./layout";
import "./App.scss";

function App() {
  const theme: string = useAppSelector((state) => state.theme.value);

  return (
    <div className={`App ${theme}`}>
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
