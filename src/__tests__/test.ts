//testa om färgsättningsfunktioner funkar
//om null, NaN eller undefined skickas in

import { Country } from '../types/main';
import { findMin } from '../utils/numberUtils';

// test('length test', () => {
//   const test = [1, 2, 3, 4];
//   expect(test.length).toBe(4);
// });

test('test for null, undefined', () => {
  const array = [1, 2, 3, 4, null, NaN];
  const max = array
    .map((x) => {
      if (Number.isNaN(x)) {
        return 0;
      } else {
        return x;
      }
    })
    .reduce((acc: any, curr: any) => (acc > curr ? acc : curr), 0);

  expect(max).toBe(4);
});

// test('test findMin', () => {
//   const array = [0.03, 0.005, 0.2, 4, null, NaN];
//   const min = findMin(array, (x: Country) => {
//     if (Number.isNaN(x.deaths)) {
//       return 0;
//     } else {
//       return x.deaths;
//     }
//   });

//   expect(max).toBe(4);
// });

export {};
