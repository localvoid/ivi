import * as h from "ivi-html";
import { testRenderDOM } from "ivi-test";

test(`<audio>`, () => {
  testRenderDOM<HTMLAudioElement>(r => {
    const n = r(h.audio())!;
    expect(n.tagName.toLowerCase()).toBe("audio");
  });
});
