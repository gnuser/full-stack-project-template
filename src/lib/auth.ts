import bcrypt from "bcryptjs";

// Hash password using bcrypt (more secure than SHA-256)
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10); // 10 rounds of salting
}

// Compare password with stored hash
export function verifyPassword(
  password: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}
