export function formatRevenue(quantity) {
  const options = { style: 'currency', currency: 'USD' };
  const numberFormat = new Intl.NumberFormat('en-US', options);
  return numberFormat.format(quantity);
}