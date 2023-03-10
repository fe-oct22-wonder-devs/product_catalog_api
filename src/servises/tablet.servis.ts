import fs from 'fs/promises';
import { SortOptions } from '../types/SortOptions';
import { Phone } from '../types/Phone';

export const findMany = async(
  perPageNum: number,
  pageNum: number,
  sort: string,
) => {
  const phonesJSON = await fs.readFile('./src/data/tablets.json', 'utf-8');
  let tablets: Phone[] = JSON.parse(phonesJSON);

  if (!isNaN(perPageNum) && !isNaN(pageNum)) {
    const from = (pageNum - 1) * perPageNum;
    const to = from + perPageNum;

    tablets = tablets.slice(from, to);
  }

  if (sort !== 'undefined') {
    tablets.sort((p1, p2): number => {
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

  return tablets;
};

export const checkLength = async() => {
  const phonesJSON = await fs.readFile('./src/data/tablets.json', 'utf-8');
  const tablets: Phone[] = JSON.parse(phonesJSON);

  return tablets.length;
};

export const findOne = async(id: string) => {
  const tabletsInfoJSON = await fs
    .readFile('./src/data/tablets/tabletsInfo.json', 'utf-8');
  const tabletsInfo: Phone[] = JSON.parse(tabletsInfoJSON);

  const tabletsJSON = await fs
    .readFile('./src/data/tablets.json', 'utf-8');
  const tablets: Phone[] = JSON.parse(tabletsJSON);

  const tabletInfo = tabletsInfo.find(tablet => tablet.id === id);
  const tabletSmall = tablets.find(tablet => tablet.phoneId === id);

  return [tabletInfo, tabletSmall];
};
