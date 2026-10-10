// $1 234.56 ko'rinishida
export function money(n) {
  const sign = n < 0 ? '−' : ''
  const [int, dec] = Math.abs(n).toFixed(2).split('.')
  return sign + '$' + int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '.' + dec
}

// +$1 234.56 / −$1 234.56
export function signedMoney(n) {
  return (n >= 0 ? '+' : '') + money(n)
}

// +12.34% / −1.20%
export function signedPct(n) {
  return (n >= 0 ? '+' : '−') + Math.abs(n).toFixed(2) + '%'
}
