import fs from 'fs/promises';
import { SortOptions } from '../types/SortOptions';
import { Phone } from '../types/Phone';

export const findMany = async(
  perPageNum: number,
  pageNum: number,
  sort: string,
) => {
  const phonesJSON = await fs.readFile('./src/data/phones.json', 'utf-8');
  let phones: Phone[] = JSON.parse(phonesJSON);

  if (sort !== 'undefined') {
    phones.sort((p1, p2): number => {
      switch (sort) {
        case SortOptions.Newest:
          return p2.year - p1.year;

        case SortOptions.Alphabetically:
          return p1.name.localeCompare(p2.name);

        case SortOptions.Cheapest:
          return p1.price - p2.price;

        default:
          return 1;
      }
    });
  }

  if (!isNaN(perPageNum) && !isNaN(pageNum)) {
    const from = (pageNum - 1) * perPageNum;
    const to = from + perPageNum;

    phones = phones.slice(from, to);
  }

  return phones;
};

export const checkLength = async() => {
  const phonesJSON = await fs.readFile('./src/data/phones.json', 'utf-8');
  const phones: Phone[] = JSON.parse(phonesJSON);

  return phones.length;
};

export const findOne = async(id: string) => {
  const phonesJSON = await fs.readFile('./src/data/phones.json', 'utf-8');
  const phones: Phone[] = JSON.parse(phonesJSON);

  return phones.find(phone => phone.id === id);
};

export const findHotPrice = async(amount: number) => {
  const phonesJSON = await fs.readFile('./src/data/phones.json', 'utf-8');
  let phones: Phone[] = JSON.parse(phonesJSON);

  phones.sort((p1, p2): number => {
    return (p2.fullPrice - p2.price) - (p1.fullPrice - p1.price);
  });

  if (amount) {
    phones = phones.slice(0, amount);
  }

  return phones;
};
