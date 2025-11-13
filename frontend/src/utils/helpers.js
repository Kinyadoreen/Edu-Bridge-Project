const { clsx } = require('clsx');
const { twMerge } = require('tailwind-merge');

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

module.exports = {
  cn,
  formatDate,
  truncateText
};
