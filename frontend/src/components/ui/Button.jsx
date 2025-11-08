import { cn } from '../../utils/helpers.js';

export default function Button({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className, 
  disabled,
  ...props 
}) {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
