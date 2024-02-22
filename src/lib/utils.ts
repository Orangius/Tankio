import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mapValue(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  // First, normalize the value to the range [0, 1]
  let normalizedValue = (value - inMin) / (inMax - inMin)

  // Then, map the normalized value to the output range
  let mappedValue = normalizedValue * (outMax - outMin) + outMin

  return mappedValue
}
