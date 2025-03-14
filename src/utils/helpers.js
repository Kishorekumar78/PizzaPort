// Function to format currency to INR
export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "INR",
  }).format(value);
}

// Function to format date format
export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

// Function to calculate time left for the order to get delivered
export function calcMinutesLeft(dateStr) {
  const date1 = new Date().getTime();
  const date2 = new Date(dateStr).getTime();

  return Math.round((date2 - date1) / 60000);
}
