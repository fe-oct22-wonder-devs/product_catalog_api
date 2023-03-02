import fs from 'fs/promises';
import { SortOptions } from '../types/SortOptions';
import { Phone } from '../types/Phone';

export const getPhones = async(
  perPageNum: number,
  pageNum: number,
  sort: string,
) => {
  const phonesJSON = await fs.readFile('./src/data/phones.json', 'utf-8');
  let phones: Phone[] = JSON.parse(phonesJSON);

  if (!isNaN(perPageNum) && !isNaN(pageNum)) {
    const from = (pageNum - 1) * perPageNum;
    const to = from + perPageNum;

    phones = phones.slice(from, to);
  }

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

  return phones;
};
