import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import AppError from '@shared/errors/AppError';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 5, // Number of points
  duration: 1, // Per second(s)
  keyPrefix: 'rateLimit',
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  }
}
