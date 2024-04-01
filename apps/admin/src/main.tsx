import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./features/Error/ErrorBoundary";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import css
import "antd/dist/antd.min.css";
import "./overiseStyle/style.min.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          retry: false, // disable retry,
          refetchOnWindowFocus: false, // disable refetch on window focus,
          keepPreviousData: true, // keep previous data if query
          staleTime: 10000, // time cache data fetching,
      },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
);
