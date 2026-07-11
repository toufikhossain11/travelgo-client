export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// At least 8 characters, containing at least one letter and one number
export function isStrongPassword(value: string): boolean {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value);
}