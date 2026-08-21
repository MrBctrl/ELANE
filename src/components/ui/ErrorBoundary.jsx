import { Component } from "react";
import Button from "./Button";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ÉLANE render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ivory flex items-center justify-center px-24">
          <div className="text-center max-w-[420px]">
            <h1 className="font-heading text-h3 text-heading">Something went quietly wrong</h1>
            <p className="text-body-sm text-muted mt-16">
              We hit a snag rendering this page. Refreshing usually fixes it.
            </p>
            <Button variant="primary" className="mt-32" onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
