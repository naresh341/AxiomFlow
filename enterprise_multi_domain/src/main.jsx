import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Store } from "./Store/Store.js";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import GlobalNotificationModal from "./Components/MiniComponent/GlobalNotificationModal.jsx";
import "react-loading-skeleton/dist/skeleton.css";
const primeReactConfig = {
  ripple: true,
  hideOverlaysOnDocumentScrolling: true,
};
createRoot(document.getElementById("root")).render(
  <PrimeReactProvider value={primeReactConfig}>
    <BrowserRouter>
      <Provider store={Store}>
        <ThemeProvider>
          <App />
          <GlobalNotificationModal />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
    ,
  </PrimeReactProvider>,
);
