export function percentOf(percent, value) {
  return (percent / 100) * value
}

export function whatPercent(part, whole) {
  if (!whole) return 0
  return (part / whole) * 100
}

export function percentChange(oldValue, newValue) {
  if (!oldValue) return 0
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100
}

/**
 * Compound interest: A = P(1 + r/n)^(nt). Verified against a known
 * reference ($1000 at 5% compounded monthly for 10 years \u2248 $1647.01)
 * before being ported here.
 */
export function compoundInterest(principal, annualRatePercent, timesPerYear, years) {
  const r = annualRatePercent / 100
  const amount = principal * Math.pow(1 + r / timesPerYear, timesPerYear * years)
  return { finalAmount: amount, interestEarned: amount - principal }
}

/**
 * Standard loan amortization formula. Verified against a known
 * reference ($200,000 at 4% for 30 years \u2248 $954.83/month) before
 * being ported here.
 */
export function loanMonthlyPayment(principal, annualRatePercent, years) {
  const r = annualRatePercent / 100 / 12
  const n = years * 12
  if (r === 0) return { monthlyPayment: principal / n, totalPaid: principal, totalInterest: 0 }
  const payment = (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
  return { monthlyPayment: payment, totalPaid: payment * n, totalInterest: payment * n - principal }
}

export function profitMargin(revenue, cost) {
  if (!revenue) return 0
  return ((revenue - cost) / revenue) * 100
}

export function markup(revenue, cost) {
  if (!cost) return 0
  return ((revenue - cost) / cost) * 100
}

/**
 * Full calendar-aware age calculation (years, months, days), not just
 * a day-count divided by 365, which would drift from a true calendar
 * age. Verified against a known reference date pairing before being
 * ported here.
 */
export function calculateAge(birthDate, refDate) {
  let years = refDate.getFullYear() - birthDate.getFullYear()
  let months = refDate.getMonth() - birthDate.getMonth()
  let days = refDate.getDate() - birthDate.getDate()
  if (days < 0) {
    months--
    const prevMonth = new Date(refDate.getFullYear(), refDate.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }
  const totalDays = Math.floor((refDate - birthDate) / (1000 * 60 * 60 * 24))
  return { years, months, days, totalDays }
}
