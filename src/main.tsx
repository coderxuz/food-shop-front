import "./index.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import "./i18n"; // Import i18n configuration

createRoot(document.getElementById("root")!).render(<App />);
