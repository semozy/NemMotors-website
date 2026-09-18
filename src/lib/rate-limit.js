const rateLimitMap = new Map();

// Clears old entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now - record.startTime > 300000) {
      rateLimitMap.delete(ip);
    }
  }
}, 300000);

export function checkRateLimit(ip, limit = 5, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  let record = rateLimitMap.get(ip) || { count: 0, startTime: now };
  
  if (record.startTime < windowStart) {
    record = { count: 1, startTime: now };
  } else {
    record.count += 1;
  }
  
  rateLimitMap.set(ip, record);
  
  return record.count <= limit;
}

