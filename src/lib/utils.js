export function whatsappLink(message, number = "32470000000") {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(price) {
  return new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price);
}
