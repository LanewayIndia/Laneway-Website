import { Request, Response } from 'express';
import { env } from '../../config/env';

export const getPublicEnv = (req: Request, res: Response) => {
  res.json({
    supabaseUrl: env.public.supabaseUrl,
    supabaseAnonKey: env.public.supabaseAnonKey,
    apiUrl: env.public.apiUrl,
    siteUrl: env.public.siteUrl,
    cloudinaryCloudName: env.cloudinary.cloudName,
  });
};

