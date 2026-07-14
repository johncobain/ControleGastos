import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/Home/Home.tsx";
import People from "../pages/People/People.tsx";
import Transactions from "../pages/Transactions/Transactions.tsx";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/people"
            element={<People />}
          />
          <Route
            path="/transactions"
            element={<Transactions />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}