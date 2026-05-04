import { Router } from 'express';
import { getPublicEnv } from './public-env.controller';

const router = Router();

router.get('/public-env', getPublicEnv);

export default router;

