export function formatQty(qty) {
  if (qty % 1 === 0) return String(qty)
  const fractions = { 0.25: '¼', 0.5: '½', 0.75: '¾' }
  return fractions[qty] ?? qty.toFixed(1)
}

export function formatEntries(entries) {
  return entries
    .map((e) => `${formatQty(e.qty)}${e.unit ? ' ' + e.unit : ''}`)
    .join(' + ')
}
