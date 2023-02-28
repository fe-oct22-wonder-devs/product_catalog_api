import fs from "fs/promises";

export const getPhones = async (limit: number, offset: number) => {
  const phonesJSON = await fs.readFile('./src/data/phones.json', 'utf-8')
  let phones = JSON.parse(phonesJSON);

  if (limit && offset) {
    const from = offset;
    const to = from + limit;

    phones = phones.slice(from, to);
  }

  return phones
}
