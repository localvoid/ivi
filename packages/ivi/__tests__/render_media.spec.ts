import * as h from "ivi-html";
import { startRender } from "./utils";

test(`<audio>`, () => {
  startRender<HTMLAudioElement>((r) => {
    const n = r(h.audio());
    expect(n.tagName.toLowerCase()).toBe("audio");
  });
});
