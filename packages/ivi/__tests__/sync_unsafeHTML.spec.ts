import * as h from "ivi-html";
import { startRender, checkDOMOps, domOps } from "./utils";

test(`<div> => <div unsafeHTML="<span>abc</span>"></div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div());
      const n = r(h.div().unsafeHTML("<span>abc</span>"));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
    });
  });
});

test(`<div unsafeHTML="<div>abc</div>"> => <div></div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().unsafeHTML("<div>abc</div>"));
      const n = r(h.div());

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
    });
  });
});

test(`<div unsafeHTML={ null }> => <div unsafeHTML="<span>abc</span>"></div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().unsafeHTML(null));
      const n = r(h.div().unsafeHTML("<span>abc</span>"));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });
});

test(`<div unsafeHTML="<div>abc</div>"> => <div unsafeHTML={ null }></div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().unsafeHTML("<div>abc</div>"));
      const n = r(h.div().unsafeHTML(null));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });
});

test(`<div unsafeHTML="<div>abc</div>"> => <div unsafeHTML="<span>abc</span>"></div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().unsafeHTML("<div>abc</div>"));
      const n = r(h.div().unsafeHTML("<span>abc</span>"));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });
});
