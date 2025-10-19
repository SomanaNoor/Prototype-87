// src/components/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    // Store the error; render() will show a fallback
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to console for developers & any external logger if present
    // (keeps your original hook but guards it so it never throws)
    try {
      if (typeof window.__COMPONENT_ERROR__ === "function") {
        window.__COMPONENT_ERROR__(error, errorInfo);
      }
    } catch (_) {}
    // Always log
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    // Clear the error and try to re-render children
    this.setState({ error: null });
  };

  renderDevFallback(error) {
    // Detailed view for development with stack trace
    return (
      <div style={{ minHeight: "100vh", padding: 24, background: "#0f172a", color: "#e5e7eb" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Something went wrong</h1>
        <p style={{ opacity: 0.85, marginBottom: 12 }}>
          An exception occurred while rendering this page. See details below.
        </p>

        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#111827",
            border: "1px solid #1f2937",
            borderRadius: 8,
            padding: 12,
            fontSize: 13,
            lineHeight: 1.4,
            overflowX: "auto",
          }}
        >
{String(error?.stack || error?.message || error)}
        </pre>

        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <button
            onClick={this.handleReset}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Reset view
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "transparent",
              color: "#93c5fd",
              border: "1px solid #1f2937",
              borderRadius: 8,
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }

  renderProdFallback() {
    // Simple, safe UI for production
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center p-8 max-w-md">
          <div className="flex justify-center items-center mb-2">
            {/* inline icon to avoid dependency on AppIcon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 32 33" fill="none">
              <path d="M16 28.5C22.6274 28.5 28 23.1274 28 16.5C28 9.87258 22.6274 4.5 16 4.5C9.37258 4.5 4 9.87258 4 16.5C4 23.1274 9.37258 28.5 16 28.5Z" stroke="#343330" strokeWidth="2" strokeMiterlimit="10" />
              <path d="M11.5 15.5C12.3284 15.5 13 14.8284 13 14C13 13.1716 12.3284 12.5 11.5 12.5C10.6716 12.5 10 13.1716 10 14C10 14.8284 10.6716 15.5 11.5 15.5Z" fill="#343330" />
              <path d="M20.5 15.5C21.3284 15.5 22 14.8284 22 14C22 13.1716 21.3284 12.5 20.5 12.5C19.6716 12.5 19 13.1716 19 14C19 14.8284 19.6716 15.5 20.5 15.5Z" fill="#343330" />
              <path d="M21 22.5C19.9625 20.7062 18.2213 19.5 16 19.5C13.7787 19.5 12.0375 20.7062 11 22.5" stroke="#343330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="flex flex-col gap-1 text-center">
            <h1 className="text-2xl font-medium text-neutral-800">Something went wrong</h1>
            <p className="text-neutral-600 text-base w-8/12 mx-auto">
              We encountered an unexpected error while processing your request.
            </p>
          </div>

          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              onClick={() => this.handleReset()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200 shadow-sm"
            >
              Reset view
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-neutral-200 hover:bg-neutral-300 text-neutral-900 font-medium py-2 px-4 rounded transition-colors duration-200"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { error } = this.state;

    if (error) {
      return import.meta.env.DEV ? this.renderDevFallback(error) : this.renderProdFallback();
    }

    return this.props.children;
  }
}

/*
import React from "react";
import Icon from "./AppIcon";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    error.__ErrorBoundary = true;
    window.__COMPONENT_ERROR__?.(error, errorInfo);
    // console.log("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state?.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="text-center p-8 max-w-md">
            <div className="flex justify-center items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="42px" height="42px" viewBox="0 0 32 33" fill="none">
                <path d="M16 28.5C22.6274 28.5 28 23.1274 28 16.5C28 9.87258 22.6274 4.5 16 4.5C9.37258 4.5 4 9.87258 4 16.5C4 23.1274 9.37258 28.5 16 28.5Z" stroke="#343330" strokeWidth="2" strokeMiterlimit="10" />
                <path d="M11.5 15.5C12.3284 15.5 13 14.8284 13 14C13 13.1716 12.3284 12.5 11.5 12.5C10.6716 12.5 10 13.1716 10 14C10 14.8284 10.6716 15.5 11.5 15.5Z" fill="#343330" />
                <path d="M20.5 15.5C21.3284 15.5 22 14.8284 22 14C22 13.1716 21.3284 12.5 20.5 12.5C19.6716 12.5 19 13.1716 19 14C19 14.8284 19.6716 15.5 20.5 15.5Z" fill="#343330" />
                <path d="M21 22.5C19.9625 20.7062 18.2213 19.5 16 19.5C13.7787 19.5 12.0375 20.7062 11 22.5" stroke="#343330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col gap-1 text-center">
              <h1 className="text-2xl font-medium text-neutral-800">Something went wrong</h1>
              <p className="text-neutral-600 text-base w w-8/12 mx-auto">We encountered an unexpected error while processing your request.</p>
            </div>
            <div className="flex justify-center items-center mt-6">
              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded flex items-center gap-2 transition-colors duration-200 shadow-sm"
              >
                <Icon name="ArrowLeft" size={18} color="#fff" />
                Back
              </button>
            </div>
          </div >
        </div >
      );
    }

    return this.props?.children;
  }
}

export default ErrorBoundary;*/