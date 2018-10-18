import { t } from "ivi";
import * as h from "ivi-html";
import { startRender, checkDOMOps, domOps } from "./utils";

test(`#1`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div().c(
        t("a"),
        t("b").k(0),
        t("c").k(1),
        t("d"),
      ));
      const b = r(h.div().c(
        t("a"),
        t("b").k(0),
        t("c").k(1),
        t("e").k(2),
        t("d"),
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 6, 0, 7, 0, 1));
    });
  });
});

test(`#2`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div().c(
        t("a"),
        t("b").k(0),
        t("c").k(1),
        t("d"),
      ));
      const b = r(h.div().c(
        t("a"),
        t("b").k(0),
        t("d"),
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 5, 0, 6, 0, 2));
    });
  });
});

test(`#3`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div().c(
        t("a"),
        t("b").k(0),
        t("c").k(1),
        t("d"),
      ));
      const b = r(h.div().c(
        t("a"),
        t("c").k(1),
        t("b").k(0),
        t("d"),
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 4, 0, 6, 0, 0));
    });
  });
});

test(`#4`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div().c(
        t("a"),
        t("b").k(0),
        t("e"),
        t("c").k(1),
        t("d"),
      ));
      const b = r(h.div().c(
        t("a"),
        t("c").k(1),
        t("e"),
        t("b").k(0),
        t("d"),
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 5, 0, 8, 0, 0));
    });
  });
});

test(`#5`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div().c(
        t("a").k(0),
        t("b"),
        t("c"),
        t("d").k(1),
      ));
      const b = r(h.div().c(
        null,
        t("b"),
        t("c"),
        null,
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 4, 0, 5, 0, 2));
    });
  });
});

test(`#6`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div().c(
        null,
        t("b"),
        t("c"),
        null,
      ));
      const b = r(h.div().c(
        t("a").k(0),
        t("b"),
        t("c"),
        t("d").k(1),
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 4, 0, 5, 0, 0));
    });
  });
});

test(`#7`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div().c(
        null,
        t("b"),
        t("c"),
        null,
      ));
      const b = r(h.div().c(
        t("a").k(0),
        t("b"),
        t("c"),
        t("d").k(1),
        t("e").k(2),
        t("f").k(3),
        t("g").k(4),
        t("h").k(5),
        t("i").k(6),
        t("j").k(7),
        t("k").k(8),
        t("l").k(9),
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 12, 0, 13, 0, 0));
    });
  });
});

test(`#8`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div().c(
        h.div(),
        t("a"),
        t("b").k(0),
        t("e"),
        t("c").k(1),
        t("d"),
        h.div(),
      ));
      const b = r(h.div().c(
        t("a"),
        t("c").k(1),
        t("e"),
        t("b").k(0),
        t("d"),
      ));

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(3, 0, 8, 0, 11, 1, 4));
    });
  });
});
