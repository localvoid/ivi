import { setupScheduler, invalidate, InvalidateFlags } from "ivi";

test(`custom invalidator`, () => {
  let i = 0;
  setupScheduler((f) => {
    i++;
  });
  invalidate();

  expect(i).toBe(1);
});

test(`custom invalidator should receive undefined flags`, () => {
  let i = 0;
  let flags;
  setupScheduler((f) => {
    i++;
    flags = f;
  });
  invalidate();

  expect(i).toBe(1);
  expect(flags).toBe(undefined);
});

test(`custom invalidator should receive RequestSyncUpdate flags`, () => {
  let i = 0;
  let flags;
  setupScheduler((f) => {
    i++;
    flags = f;
  });
  invalidate(InvalidateFlags.RequestSyncUpdate);

  expect(i).toBe(1);
  expect(flags).toBe(InvalidateFlags.RequestSyncUpdate);
});
