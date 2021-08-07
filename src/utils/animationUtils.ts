export function clamp(value: number, lowerBound: number, upperBound: number): number {
  "worklet";
  return Math.min(Math.max(value, lowerBound), upperBound);
}
