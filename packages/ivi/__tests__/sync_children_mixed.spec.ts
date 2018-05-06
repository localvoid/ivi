import { startRender, checkDOMOps, domOps } from "./utils";
import * as h from "./utils/html";

test(`#1`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(
        h.t("a"),
        h.t("b").k(0),
        h.t("c").k(1),
        h.t("d"),
      ));
      const b = r(h.div().c(
        h.t("a"),
        h.t("b").k(0),
        h.t("c").k(1),
        h.t("e").k(2),
        h.t("d"),
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 6, 0, 7, 0, 1));
    });
  });
});

test(`#2`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(
        h.t("a"),
        h.t("b").k(0),
        h.t("c").k(1),
        h.t("d"),
      ));
      const b = r(h.div().c(
        h.t("a"),
        h.t("b").k(0),
        h.t("d"),
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 5, 0, 6, 0, 2));
    });
  });
});

test(`#3`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(
        h.t("a"),
        h.t("b").k(0),
        h.t("c").k(1),
        h.t("d"),
      ));
      const b = r(h.div().c(
        h.t("a"),
        h.t("c").k(1),
        h.t("b").k(0),
        h.t("d"),
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 4, 0, 6, 0, 0));
    });
  });
});

test(`#4`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(
        h.t("a"),
        h.t("b").k(0),
        h.t("e"),
        h.t("c").k(1),
        h.t("d"),
      ));
      const b = r(h.div().c(
        h.t("a"),
        h.t("c").k(1),
        h.t("e"),
        h.t("b").k(0),
        h.t("d"),
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 5, 0, 8, 0, 0));
    });
  });
});

test(`#5`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(
        h.t("a").k(0),
        h.t("b"),
        h.t("c"),
        h.t("d").k(1),
      ));
      const b = r(h.div().c(
        null,
        h.t("b"),
        h.t("c"),
        null,
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 4, 0, 5, 0, 2));
    });
  });
});

test(`#6`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(
        null,
        h.t("b"),
        h.t("c"),
        null,
      ));
      const b = r(h.div().c(
        h.t("a").k(0),
        h.t("b"),
        h.t("c"),
        h.t("d").k(1),
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 4, 0, 5, 0, 0));
    });
  });
});

test(`#7`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(
        null,
        h.t("b"),
        h.t("c"),
        null,
      ));
      const b = r(h.div().c(
        h.t("a").k(0),
        h.t("b"),
        h.t("c"),
        h.t("d").k(1),
        h.t("e").k(2),
        h.t("f").k(3),
        h.t("g").k(4),
        h.t("h").k(5),
        h.t("i").k(6),
        h.t("j").k(7),
        h.t("k").k(8),
        h.t("l").k(9),
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 12, 0, 13, 0, 0));
    });
  });
});

test(`#8`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(
        h.div(),
        h.t("a"),
        h.t("b").k(0),
        h.t("e"),
        h.t("c").k(1),
        h.t("d"),
        h.div(),
      ));
      const b = r(h.div().c(
        h.t("a"),
        h.t("c").k(1),
        h.t("e"),
        h.t("b").k(0),
        h.t("d"),
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(3, 0, 8, 0, 11, 1, 4));
    });
  });
});
