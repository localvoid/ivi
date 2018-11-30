import * as h from "ivi-html";
import { testRenderDOM } from "ivi-test";
import { checkDOMOps } from "./utils";

test(`<audio> => <video>`, () => {
  testRenderDOM<HTMLMediaElement>(r => {
    checkDOMOps(c => {
      r(h.audio());
      const b = r(h.video())!;

      expect(b.tagName.toLowerCase()).toBe("video");
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 2,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});
