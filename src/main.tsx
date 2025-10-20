import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Analytics } from "@vercel/analytics/react";
import "./i18n.ts";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Analytics />
    <Toaster richColors position="top-right" />
  </>
);
