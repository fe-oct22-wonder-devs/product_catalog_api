import express from 'express';
import * as userControllers from '../controllers/user.controller';

export const router = express.Router();
router.get('/', userControllers.getMany);
router.get('/length', userControllers.getLength);
router.get('/:phoneId', userControllers.getOne);
