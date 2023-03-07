import express from 'express';
import { checkLength, findOne, findMany } from '../servises/tablet.servis';

export const getMany = async(req: express.Request, res: express.Response) => {
  const { perPage, page, sort } = req.query;

  const perPageNum = Number(perPage);
  const pageNum = Number(page);
  const sortStr = String(sort);

  try {
    const tablets = await findMany(perPageNum, pageNum, sortStr);

    res.send(tablets);
  } catch (e) {
    res.statusCode = 404;
    res.send();
  }
};

export const getLength = async(req: express.Request, res: express.Response) => {
  try {
    const tabletsLength = await checkLength();

    res.json(tabletsLength);
  } catch (e) {
    res.sendStatus(404);
  }
};

export const getOne = async(req: express.Request, res: express.Response) => {
  const { tabletId } = req.params;

  try {
    const phonesLength = await findOne(tabletId);

    res.send(phonesLength);
  } catch (e) {
    res.sendStatus(404);
  }
};
