import { lsq2 } from "../velocity_tracker";

test(`Linear polynomial to line`, () => {
  const x = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0];
  const y = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];

  const v = lsq2(x, y);
  expect(v).toBe(0);
});

test(`Linear polynomial to sloped line (1b)`, () => {
  const x = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0];
  const y = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0];

  const v = lsq2(x, y);
  expect(v).toBe(1);
});

test(`Linear polynomial to sloped line (0.5b)`, () => {
  const x = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0];
  const y = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

  const v = lsq2(x, y);
  expect(v).toBe(0.5);
});
