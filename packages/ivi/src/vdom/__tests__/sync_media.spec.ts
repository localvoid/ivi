import * as h from "ivi-html";
import { startRender, checkDOMOps, domOps } from "./utils";

test(`<audio> => <video>`, () => {
  startRender<HTMLMediaElement>(r => {
    checkDOMOps(c => {
      r(h.audio());
      const b = r(h.video());

      expect(b.tagName.toLowerCase()).toBe("video");
      expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
    });
  });
});
