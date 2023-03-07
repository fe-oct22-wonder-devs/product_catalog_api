import express from 'express';
import * as tabletControllers from '../controllers/tablet.controller';

export const router = express.Router();
router.get('/', tabletControllers.getMany);
router.get('/length', tabletControllers.getLength);
router.get('/:tabletId', tabletControllers.getOne);
