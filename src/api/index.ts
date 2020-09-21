import express from 'express';
import { router as config } from './config';

export const router = express.Router();

router.use('/config', config);