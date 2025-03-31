export function mathMod(dividend, divisor) {
  // Handle division by zero
  if (divisor === 0) {
    throw new Error("Division by zero");
  }

  // Get the regular modulo result
  const remainder = dividend % divisor;

  // If remainder is non-negative, return it as is
  // If remainder is negative, add divisor to make it positive
  return remainder >= 0 ? remainder : remainder + Math.abs(divisor);
}
