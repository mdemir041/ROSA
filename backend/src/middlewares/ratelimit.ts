// @ts-nocheck
import { RateLimit } from 'koa2-ratelimit';

export default (config: any, { strapi }: any) => {
  return async (ctx: any, next: any) => {
    // Only apply to specific routes or globally for POST requests
    if (ctx.request.method === 'POST') {
      const limiter = RateLimit.middleware({
        interval: { min: 1 }, // 1 minute
        max: 5, // limit each IP to 5 requests per interval
        message: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.',
      });
      return limiter(ctx, next);
    }
    await next();
  };
};
