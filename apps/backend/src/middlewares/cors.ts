import cors from 'cors';

export const corsMiddleware = () =>
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [];

      if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error('Not allowed by CORS'));
    },
  });
