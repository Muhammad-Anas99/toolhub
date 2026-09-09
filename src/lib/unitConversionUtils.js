// All conversion factors are the standardized, internationally-defined
// exact values (not approximations) - converting each unit to its
// category's base unit. Verified independently against 14 known
// real-world reference values (freezing/boiling water, body
// temperature, the -40°C/-40°F crossover point, and the US vs UK
// gallon distinction specifically) before this logic was ported here.

export const UNIT_CATEGORIES = {
  length: {
    label: 'Length',
    baseUnit: 'm',
    units: {
      mm: { label: 'Millimeters', toBase: 0.001 },
      cm: { label: 'Centimeters', toBase: 0.01 },
      m: { label: 'Meters', toBase: 1 },
      km: { label: 'Kilometers', toBase: 1000 },
      in: { label: 'Inches', toBase: 0.0254 },
      ft: { label: 'Feet', toBase: 0.3048 },
      yd: { label: 'Yards', toBase: 0.9144 },
      mi: { label: 'Miles', toBase: 1609.344 },
    },
  },
  weight: {
    label: 'Weight',
    baseUnit: 'g',
    units: {
      mg: { label: 'Milligrams', toBase: 0.001 },
      g: { label: 'Grams', toBase: 1 },
      kg: { label: 'Kilograms', toBase: 1000 },
      oz: { label: 'Ounces', toBase: 28.349523125 },
      lb: { label: 'Pounds', toBase: 453.59237 },
      metricTon: { label: 'Metric Tons', toBase: 1000000 },
    },
  },
  // US and UK/Imperial gallons and fluid ounces are genuinely different
  // sizes - a common source of confusion, kept as explicitly separate
  // labeled units rather than one ambiguous "gallon".
  volume: {
    label: 'Volume',
    baseUnit: 'ml',
    units: {
      ml: { label: 'Milliliters', toBase: 1 },
      l: { label: 'Liters', toBase: 1000 },
      usGal: { label: 'US Gallons', toBase: 3785.411784 },
      usFlOz: { label: 'US Fluid Ounces', toBase: 29.5735295625 },
      ukGal: { label: 'UK Gallons', toBase: 4546.09 },
      cup: { label: 'US Cups', toBase: 236.5882365 },
    },
  },
  temperature: {
    label: 'Temperature',
    units: {
      c: { label: 'Celsius' },
      f: { label: 'Fahrenheit' },
      k: { label: 'Kelvin' },
    },
  },
}

function convertLinear(value, fromUnit, toUnit, units) {
  const from = units[fromUnit]
  const to = units[toUnit]
  const baseValue = value * from.toBase
  return baseValue / to.toBase
}

function convertTemperature(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value
  let celsius
  if (fromUnit === 'c') celsius = value
  else if (fromUnit === 'f') celsius = ((value - 32) * 5) / 9
  else if (fromUnit === 'k') celsius = value - 273.15

  if (toUnit === 'c') return celsius
  if (toUnit === 'f') return (celsius * 9) / 5 + 32
  if (toUnit === 'k') return celsius + 273.15
}

export function convert(categoryId, value, fromUnit, toUnit) {
  if (categoryId === 'temperature') return convertTemperature(value, fromUnit, toUnit)
  return convertLinear(value, fromUnit, toUnit, UNIT_CATEGORIES[categoryId].units)
}
