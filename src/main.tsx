import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import PortfolioShell from "./PortfolioShell";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PortfolioShell />
  </StrictMode>
);
