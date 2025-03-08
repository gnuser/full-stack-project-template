import { createHash } from "node:crypto";

// Hash password using SHA-256
export function hashPassword(password: string): string {
  return createHash("sha256").update(`${password}`).digest("hex");
}

// Compare password with stored hash
export function verifyPassword(
  password: string,
  hashedPassword: string
): boolean {
  const inputHash = hashPassword(password);
  return inputHash === hashedPassword;
}
