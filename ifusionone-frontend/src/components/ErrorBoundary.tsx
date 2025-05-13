// ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Caught by ErrorBoundary:", error, info)
  }

  render() {
    if (this.state.hasError) {
      // Now this runs inside the single BrowserRouter
      console.log('ErrorBoundary: Redirecting to /error')
       window.location.href = '/error'
    }
    return this.props.children
  }
}

export default ErrorBoundary
