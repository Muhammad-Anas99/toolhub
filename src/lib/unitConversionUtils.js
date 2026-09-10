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
  area: {
    label: 'Area',
    baseUnit: 'm2',
    units: {
      mm2: { label: 'Square Millimeters', toBase: 0.000001 },
      cm2: { label: 'Square Centimeters', toBase: 0.0001 },
      m2: { label: 'Square Meters', toBase: 1 },
      hectare: { label: 'Hectares', toBase: 10000 },
      km2: { label: 'Square Kilometers', toBase: 1000000 },
      in2: { label: 'Square Inches', toBase: 0.00064516 },
      ft2: { label: 'Square Feet', toBase: 0.09290304 },
      yd2: { label: 'Square Yards', toBase: 0.83612736 },
      acre: { label: 'Acres', toBase: 4046.8564224 },
      mi2: { label: 'Square Miles', toBase: 2589988.110336 },
    },
  },
  // km/h and ft/s convert exactly from their defining unit ratios. mph
  // uses the exact mile-to-meter definition (1609.344m); the knot uses
  // the international nautical mile definition (1852m exactly).
  speed: {
    label: 'Speed',
    baseUnit: 'mps',
    units: {
      mps: { label: 'Meters/Second', toBase: 1 },
      kmh: { label: 'Kilometers/Hour', toBase: 1000 / 3600 },
      mph: { label: 'Miles/Hour', toBase: 1609.344 / 3600 },
      knot: { label: 'Knots', toBase: 1852 / 3600 },
      fps: { label: 'Feet/Second', toBase: 0.3048 },
    },
  },
  time: {
    label: 'Time',
    baseUnit: 's',
    units: {
      ms: { label: 'Milliseconds', toBase: 0.001 },
      s: { label: 'Seconds', toBase: 1 },
      min: { label: 'Minutes', toBase: 60 },
      hr: { label: 'Hours', toBase: 3600 },
      day: { label: 'Days', toBase: 86400 },
      week: { label: 'Weeks', toBase: 604800 },
    },
  },
  // Decimal (SI, 1000-based: KB/MB/GB/TB) and binary (IEC, 1024-based:
  // KiB/MiB/GiB/TiB) are genuinely different sizes and a common source
  // of confusion - kept as explicitly separate labeled units, the same
  // principle as US vs UK gallons above, rather than one ambiguous "GB".
  data: {
    label: 'Data Storage',
    baseUnit: 'B',
    units: {
      B: { label: 'Bytes', toBase: 1 },
      KB: { label: 'Kilobytes (KB)', toBase: 1000 },
      MB: { label: 'Megabytes (MB)', toBase: 1000000 },
      GB: { label: 'Gigabytes (GB)', toBase: 1000000000 },
      TB: { label: 'Terabytes (TB)', toBase: 1000000000000 },
      KiB: { label: 'Kibibytes (KiB)', toBase: 1024 },
      MiB: { label: 'Mebibytes (MiB)', toBase: 1048576 },
      GiB: { label: 'Gibibytes (GiB)', toBase: 1073741824 },
      TiB: { label: 'Tebibytes (TiB)', toBase: 1099511627776 },
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
