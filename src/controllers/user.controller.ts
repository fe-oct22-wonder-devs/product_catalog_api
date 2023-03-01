import express from 'express';
import { getPhones } from '../servises/user.servis';

export const getAll = async(req: express.Request, res: express.Response) => {
  const { perPage, page, sort } = req.query;

  const perPageNum = Number(perPage);
  const pageNum = Number(page);
  const sortStr = String(sort);

  try {
    const phones = await getPhones(perPageNum, pageNum, sortStr);

    res.send(phones);
  } catch (e) {
    res.statusCode = 404;
    res.send();
  }
};
