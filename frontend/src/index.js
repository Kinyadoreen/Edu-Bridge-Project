const React = require('react');
const ReactDOM = require('react-dom/client');
const { BrowserRouter } = require('react-router-dom');
const { Provider } = require('react-redux');
const { QueryClient, QueryClientProvider } = require('@tanstack/react-query');
const { ReactQueryDevtools } = require('@tanstack/react-query-devtools');
const store = require('./redux/store.js');
require('./index.css');
const App = require('./App.jsx');

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      Provider,
      { store },
      React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(
          BrowserRouter,
          null,
          React.createElement(App, null),
          React.createElement(ReactQueryDevtools, { initialIsOpen: false })
        )
      )
    )
  )
);
