'use client'

import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught:', error, info)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center">
          <p className="text-4xl mb-4">😬</p>
          <h2 className="text-lg font-bold text-ink mb-2">Something went wrong</h2>
          <p className="text-base text-ink-muted mb-4">Try refreshing the page.</p>
          <button
            className="px-4 py-3 bg-brand-500 text-white rounded-lg text-sm font-semibold hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
