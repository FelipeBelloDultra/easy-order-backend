import expressRateLimit from "express-rate-limit";

function calculateMinutes(minutes: number): number {
  return minutes * 60 * 1000;
}

export function requestRateLimiter(minutes: number = 10, limit: number = 200) {
  return expressRateLimit({
    windowMs: calculateMinutes(minutes),
    limit,
  });
}
