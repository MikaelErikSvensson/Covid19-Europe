//testa om färgsättningsfunktioner funkar
//om null, NaN eller undefined skickas in

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

export {};
