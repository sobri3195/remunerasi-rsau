export const formatCurrencyIDR = (value = 0) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(value) || 0);

export const formatPercent = (value = 0, digits = 2) => `${Number(value || 0).toFixed(digits)}%`;
