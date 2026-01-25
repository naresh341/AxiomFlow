import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Store } from "./Store/Store.js";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={Store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
);
