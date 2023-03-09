import express from 'express';
import * as phoneControllers from '../controllers/phone.controller';

export const router = express.Router();
router.get('/', phoneControllers.getMany);
router.get('/discount', phoneControllers.getHotPrices);
router.get('/length', phoneControllers.getLength);
router.get('/:phoneId', phoneControllers.getOne);
