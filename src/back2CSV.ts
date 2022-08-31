import data from '../data/data.json';
import fs from 'fs';

const string = JSON.parse(JSON.stringify(data));
type Data = Array<object>;
const keys = Object.keys(data[0]);

const commaSeparatedString = [
  keys.join(','),
  string
    .map((row: { [x: string]: any }) =>
      keys.map((key) => row[key]).join(',')
    )
    .join('\n'),
].join('\n');
fs.writeFileSync(
  './data/na-consent-updated.csv',
  commaSeparatedString,
  {
    encoding: 'utf8',
  }
);
