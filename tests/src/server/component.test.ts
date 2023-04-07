import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import {
  component, getProps, useEffect, useLayoutEffect, useIdleEffect,
  useState, useReducer, useMemo,
  renderToString,
} from "ivi/server";

describe("ssr: component", () => {
  test(`basic`, () => {
    const T = component(() => {
      return () => "a";
    });
    strictEqual(
      renderToString(T()),
      `a`,
    );
  });

  test(`getProps`, () => {
    let _props;
    const T = component<number>((c) => {
      _props = getProps(c);
      return (i) => i;
    });
    strictEqual(
      renderToString(T(1)),
      `1`,
    );
    strictEqual(_props, 1);
  });

  test(`useEffect`, () => {
    let i = 0;
    const T = component<number>((c) => {
      useEffect(c, () => {
        i++;
      })();
      return () => "a";
    });
    strictEqual(
      renderToString(T(1)),
      `a`,
    );
    strictEqual(i, 0);
  });

  test(`useLayoutEffect`, () => {
    let i = 0;
    const T = component<number>((c) => {
      useLayoutEffect(c, () => {
        i++;
      })();
      return () => "a";
    });
    strictEqual(
      renderToString(T(1)),
      `a`,
    );
    strictEqual(i, 0);
  });

  test(`useIdleEffect`, () => {
    let i = 0;
    const T = component<number>((c) => {
      useIdleEffect(c, () => {
        i++;
      })();
      return () => "a";
    });
    strictEqual(
      renderToString(T(1)),
      `a`,
    );
    strictEqual(i, 0);
  });

  test(`useState`, () => {
    const T = component<number>((c) => {
      const [state, _] = useState(c, 2);
      return () => state();
    });
    strictEqual(
      renderToString(T(1)),
      `2`,
    );
  });

  test(`useReducer`, () => {
    let _i = 0;
    const T = component<number>((c) => {
      const [state, _] = useReducer(c, 2, () => { _i++; return 3; });
      return () => state();
    });
    strictEqual(
      renderToString(T(1)),
      `2`,
    );
    strictEqual(_i, 0);
  });

  test(`useMemo`, () => {
    let _i = 0;
    const T = component<number>(() => {
      const memo = useMemo<number, number>(() => { _i++; return false; }, (i) => i);
      return (i) => memo(i);
    });
    strictEqual(
      renderToString(T(2)),
      `2`,
    );
    strictEqual(_i, 0);
  });
});
