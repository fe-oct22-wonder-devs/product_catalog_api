import express from 'express';
import { getPhones } from '../servises/user.servis';

export const getAll = async(req: express.Request, res: express.Response) => {
  const { limit, offset } = req.query;

  const limitNum = Number(limit);
  const offsetNum = Number(offset);

  try {
    const phones = await getPhones(limitNum, offsetNum);

    res.send(phones);
  } catch (e) {
    res.statusCode = 404;
    res.send();
  }
};
