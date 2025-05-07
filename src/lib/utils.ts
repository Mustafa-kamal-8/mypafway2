import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



let debounceTimer: NodeJS.Timeout;

export function debounce(callback: () => void, timeout = 5000) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(callback, timeout);
}
