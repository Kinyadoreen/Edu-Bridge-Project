const { describe, it, expect, vi } = require('vitest');
const { render, screen, fireEvent } = require('@testing-library/react');
const React = require('react');
const Button = require('../ui/Button.jsx');

describe('Button Component', () => {
  it('renders correctly', () => {
    render(React.createElement(Button, null, 'Click me'));
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(React.createElement(Button, { onClick: handleClick }, 'Click me'));
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(React.createElement(Button, { isLoading: true }, 'Submit'));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('is disabled when loading', () => {
    render(React.createElement(Button, { isLoading: true }, 'Submit'));
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies variant classes', () => {
    const { rerender } = render(React.createElement(Button, { variant: 'primary' }, 'Primary'));
    expect(screen.getByRole('button')).toHaveClass('bg-primary-600');

    rerender(React.createElement(Button, { variant: 'secondary' }, 'Secondary'));
    expect(screen.getByRole('button')).toHaveClass('border-primary-600');
  });
});
