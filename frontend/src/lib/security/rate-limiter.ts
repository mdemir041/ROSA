interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const tracker = new Map<string, RateLimitRecord>();

export function checkRateLimit(identifier: string, limit = 5, windowMs = 60000): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = tracker.get(identifier);

  if (!record || now > record.resetTime) {
    tracker.set(identifier, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0 };
  }

  record.count += 1;
  tracker.set(identifier, record);
  return { success: true, remaining: limit - record.count };
}
