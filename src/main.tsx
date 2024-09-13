import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import Router from "./router/index.tsx";
import "./index.css";
import store from "./store/store.ts";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./socket/socketContext.tsx";

createRoot(document.getElementById("root")!).render(
  <React.Suspense>
    <Provider store={store}>
      <SocketProvider>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </SnackbarProvider>
      </SocketProvider>
    </Provider>
  </React.Suspense>
);
