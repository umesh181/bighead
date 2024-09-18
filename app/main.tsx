import React from "react";
import ReactDOM from "react-dom/client";


import { ThemeProvider } from "@/components/theme-provider";
import App from "next/app";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
