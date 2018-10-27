import { InvalidateFlags } from "ivi";

describe(`scheduler`, () => {
  /* tslint:disable:whitespace */
  let ivi: typeof import("ivi");

  beforeEach(async () => {
    jest.resetModules();
    ivi = await import("ivi");
  });

  test(`raise an exception when scheduler isn't configured`, () => {
    expect(() => { ivi.update(); }).toThrowError("Scheduler");
  });

  test(`custom invalidator`, () => {
    let i = 0;
    ivi.setupScheduler(f => {
      i++;
    });
    ivi.update();

    expect(i).toBe(1);
  });

  test(`custom invalidator should receive undefined flags`, () => {
    let i = 0;
    let flags;
    ivi.setupScheduler(f => {
      i++;
      flags = f;
    });
    ivi.update();

    expect(i).toBe(1);
    expect(flags).toBe(undefined);
  });

  test(`custom invalidator should receive RequestSyncUpdate flags`, () => {
    let i = 0;
    let flags;
    ivi.setupScheduler(f => {
      i++;
      flags = f;
    });
    ivi.update(InvalidateFlags.RequestSyncUpdate);

    expect(i).toBe(1);
    expect(flags).toBe(InvalidateFlags.RequestSyncUpdate);
  });
});
