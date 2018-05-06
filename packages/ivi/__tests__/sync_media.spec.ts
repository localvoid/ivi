import { startRender, checkDOMOps, domOps } from "./utils";
import * as h from "./utils/html";

test(`<audio> => <video>`, () => {
  startRender<HTMLMediaElement>((r) => {
    checkDOMOps((c) => {
      r(h.audio());
      const b = r(h.video());

      expect(b.tagName.toLowerCase()).toBe("video");
      expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
    });
  });
});
