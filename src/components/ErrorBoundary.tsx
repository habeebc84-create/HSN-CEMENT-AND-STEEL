import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-slate-950 text-slate-100 font-sans">
          <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl text-center space-y-6 max-w-sm w-full mx-4">
            <h1 className="text-2xl font-black text-white">Error Occurred</h1>
            <p className="text-slate-400 text-sm">Page broken. An error occurred.</p>
            <button
              onClick={this.handleReload}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-3 rounded-xl transition flex items-center justify-center"
            >
              Okay
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
