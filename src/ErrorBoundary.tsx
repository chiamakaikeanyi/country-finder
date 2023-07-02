import React, { Component, ErrorInfo } from "react";
import type { ReactNode } from "react";

import EmptyState from "./components/EmptyState/EmptyState";

interface IProps {
  children?: ReactNode;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): IState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // TODO: When building a real app, logging error to a reporting service like Rollbar is better
    console.error(
      "-------------- Error caught in error boundary -------------------"
    );
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <EmptyState message="An error occured. Please try again." />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
