import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// No StrictMode — prevents double-invoke of effects that causes visual glitches
createRoot(document.getElementById("root")).render(<App />);