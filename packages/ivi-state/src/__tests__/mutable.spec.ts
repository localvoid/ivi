import { mut, pipe } from "ivi-state";

describe(`mut`, () => {
  test(`should pass first argument to decorator`, () => {
    let _arg = 0;
    const m = (arg: number) => {
      _arg = arg;
    };
    const s = mut(m, (arg) => { /**/ });
    s(10);

    expect(_arg).toBe(10);
  });

  test(`should pass arguments`, () => {
    let _a = 0;
    let _b = 0;
    let _c = 0;
    const m = (arg: number) => { /**/ };
    const s = mut(m, (a, b: number, c: number) => {
      _a = a;
      _b = b;
      _c = c;
    });
    s(10, 20, 30);

    expect(_a).toBe(10);
    expect(_b).toBe(20);
    expect(_c).toBe(30);
  });

  test(`should pass return value to decorator as a second argument`, () => {
    let _ret = 0;
    const m = (arg: number, ret: number) => {
      _ret = ret;
    };
    const s = mut(m, () => 10);
    s(10);

    expect(_ret).toBe(10);
  });
});

describe(`pipe`, () => {
  test(`should pass arguments`, () => {
    let _a = 0;
    let _b = 0;
    let _c = 0;
    const m = () => { /**/ };
    const s = pipe(m, (a: number, b: number, c: number) => {
      _a = a;
      _b = b;
      _c = c;
    });
    s(10, 20, 30);

    expect(_a).toBe(10);
    expect(_b).toBe(20);
    expect(_c).toBe(30);
  });

  test(`should pass return value to decorator as a first argument`, () => {
    let _ret = 0;
    const m = (ret: number) => {
      _ret = ret;
    };
    const s = pipe(m, () => 10);
    s();

    expect(_ret).toBe(10);
  });
});
