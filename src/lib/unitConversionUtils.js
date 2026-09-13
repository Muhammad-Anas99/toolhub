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
  // PSI derives from the exact pound-force (4.4482216152605 N) and
  // square inch (0.00064516 m2) definitions. Atmosphere is the exact
  // standard-atmosphere definition (101325 Pa); Torr is exactly
  // 1/760th of that, by definition. Verified against the well-known
  // reference that 1 atm is approximately 14.696 psi.
  pressure: {
    label: 'Pressure',
    baseUnit: 'pa',
    units: {
      pa: { label: 'Pascals', toBase: 1 },
      kpa: { label: 'Kilopascals', toBase: 1000 },
      bar: { label: 'Bar', toBase: 100000 },
      psi: { label: 'PSI', toBase: 6894.757293168361 },
      atm: { label: 'Atmospheres', toBase: 101325 },
      torr: { label: 'Torr (mmHg)', toBase: 133.32236842105263 },
    },
  },
  // The calorie here is the exact thermochemical calorie (4.184 J).
  // BTU is the exact International Table definition. Watt-hour and
  // kWh follow directly from power x time. Verified against the
  // well-known reference that 1 kWh is approximately 3412 BTU.
  energy: {
    label: 'Energy',
    baseUnit: 'j',
    units: {
      j: { label: 'Joules', toBase: 1 },
      kj: { label: 'Kilojoules', toBase: 1000 },
      cal: { label: 'Calories', toBase: 4.184 },
      kcal: { label: 'Kilocalories', toBase: 4184 },
      wh: { label: 'Watt-hours', toBase: 3600 },
      kwh: { label: 'Kilowatt-hours', toBase: 3600000 },
      btu: { label: 'BTU', toBase: 1055.05585262 },
    },
  },
  // Mechanical horsepower is exactly 550 ft*lbf/s; metric horsepower
  // (PS) is exactly 75 kgf*m/s. Verified against the well-known
  // reference that 1 hp is approximately 0.7457 kW.
  power: {
    label: 'Power',
    baseUnit: 'w',
    units: {
      w: { label: 'Watts', toBase: 1 },
      kw: { label: 'Kilowatts', toBase: 1000 },
      hp: { label: 'Horsepower', toBase: 745.6998715822702 },
      ps: { label: 'Metric Horsepower (PS)', toBase: 735.49875 },
      btuh: { label: 'BTU/hour', toBase: 0.2930710701722222 },
    },
  },
  // Radian is the SI base unit for angle, so it's used as the internal
  // base here rather than degree. Verified that 360 degrees converts
  // to exactly one full turn, the standard cross-check for this kind
  // of conversion table.
  angle: {
    label: 'Angle',
    baseUnit: 'rad',
    units: {
      deg: { label: 'Degrees', toBase: 0.017453292519943295 },
      rad: { label: 'Radians', toBase: 1 },
      grad: { label: 'Gradians', toBase: 0.015707963267948967 },
      turn: { label: 'Turns', toBase: 6.283185307179586 },
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
