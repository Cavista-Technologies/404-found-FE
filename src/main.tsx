import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { ToastProvider } from "./components/toast/toastProvider.tsx";
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastProvider>
        <App />
        </ToastProvider>
      </BrowserRouter>
    </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
