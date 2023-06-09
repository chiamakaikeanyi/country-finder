import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import EmptyState from "./components/EmptyState/EmptyState";
import Header from "./components/Header/Header";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./ErrorBoundary";
import useNetworkStatus from "./hooks/useNetworkStatus";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import "./App.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 60 minutes
    },
  },
});

function App() {
  const { isOnline } = useNetworkStatus();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <div className="container" data-testid="app_container">
              <a href="#main" className="skip-to-main-content">
                Skip to main content
              </a>
              <Header />
              <main id="main" className="main-content">
                {isOnline ? (
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:countryCode" element={<Details />} />
                    <Route
                      path="*"
                      element={
                        <EmptyState message="An error occured. Please try again." />
                      }
                    />
                  </Routes>
                ) : (
                  <EmptyState message="No internet connection" />
                )}
              </main>
            </div>
          </BrowserRouter>
        </ThemeProvider>

        {/* Add React Query Devtools only in development */}
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
