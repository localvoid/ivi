import { startRender, checkDOMOps, domOps } from "./utils";
import * as h from "./utils/html";

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
