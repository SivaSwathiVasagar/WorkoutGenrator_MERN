import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import "./App.css";
import App from "./App";
//IMPORT BrowserRouter and rename it to Router
import { BrowserRouter as Router } from "react-router-dom";

//Wrap the App Component with the Router component to enable the router features
const root = createRoot(document.getElementById("root")); // Replace 'root' with your root element ID

root.render(
  <Router>
    <App />
  </Router>
);
