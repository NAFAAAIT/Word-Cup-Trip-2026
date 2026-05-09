import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        // You could log to a remote service here
        // console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h2>Something went wrong.</h2>
                    <pre style={{ whiteSpace: 'pre-wrap', textAlign: 'left', maxWidth: '800px', margin: '1rem auto' }}>{String(this.state.error)}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
