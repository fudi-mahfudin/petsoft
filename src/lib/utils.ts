import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms = 1000) {
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return Promise.resolve();
}

export function errorChance(posibility = 0.1, message = 'Error chance message') {
  if (Math.random() < posibility) {
    throw new Error(message);
  }
}
