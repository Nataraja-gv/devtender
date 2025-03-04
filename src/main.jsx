import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store } from "./utils/reduxStore.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <App />
    </SnackbarProvider>
  </Provider>
);
