import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Context } from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <Context.Provider basename="/gemini-clone/" value={{}}>
    <App />
  </Context.Provider>
);
