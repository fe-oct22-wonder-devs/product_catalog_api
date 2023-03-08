import express from 'express';
import { checkLength,
  findOne,
  findMany,
  findHotPrice } from '../servises/phone.servis';

export const getMany = async(req: express.Request, res: express.Response) => {
  const { perPage, page, sort } = req.query;

  const perPageNum = Number(perPage);
  const pageNum = Number(page);
  const sortStr = String(sort);

  try {
    const phones = await findMany(perPageNum, pageNum, sortStr);

    res.send(phones);
  } catch (e) {
    res.statusCode = 404;
    res.send();
  }
};

export const getLength = async(req: express.Request, res: express.Response) => {
  try {
    const phonesLength = await checkLength();

    res.json(phonesLength);
  } catch (e) {
    res.sendStatus(404);
  }
};

export const getOne = async(req: express.Request, res: express.Response) => {
  const { phoneId } = req.params;

  try {
    const phonesLength = await findOne(phoneId);

    res.send(phonesLength);
  } catch (e) {
    res.sendStatus(404);
  }
};

export const getHotPrices = async(
  req: express.Request,
  res: express.Response,
) => {
  const { length } = req.query;

  const hotLength = Number(length);

  try {
    const phones = await findHotPrice(+hotLength);

    res.send(phones);
  } catch (e) {
    res.sendStatus(404);
  }
};
