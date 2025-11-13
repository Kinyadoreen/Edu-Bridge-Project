const { describe, it, expect, vi } = require('vitest');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const React = require('react');
const { BrowserRouter } = require('react-router-dom');
const { QueryClient, QueryClientProvider } = require('@tanstack/react-query');
const Login = require('../Login.jsx');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderWithProviders = (component) => {
  return render(
    React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(BrowserRouter, null, component)
    )
  );
};

describe('Login Page', () => {
  it('renders login form', () => {
    renderWithProviders(React.createElement(Login));

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderWithProviders(React.createElement(Login));

    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toBeInvalid();
    });
  });

  it('submits form with valid data', async () => {
    renderWithProviders(React.createElement(Login));

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });
});
