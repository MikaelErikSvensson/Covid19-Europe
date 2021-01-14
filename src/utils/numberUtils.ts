import { Country } from '../types/main';

export const formatNumbers = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const formatPercentage = (number: number) => {
  return number.toString() + '%';
};

export const findMax = (array: Country[], f: (x: Country) => number) => {
  const result = array.map(f);
  return result.reduce((acc, curr) => (acc > curr ? acc : curr), 0);
};
