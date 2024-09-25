import { MsalProvider } from "@azure/msal-react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { pca } from "../src/utils/config/msalConfig.ts";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MsalProvider instance={pca}>
    <StrictMode>
      <App />
    </StrictMode>
  </MsalProvider>
);
