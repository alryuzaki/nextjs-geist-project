import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import jwt from 'jsonwebtoken';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${path}`;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export function generateToken(payload: object, expiresIn: string = '1h'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}
