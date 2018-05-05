import { render } from "./utils";
import * as h from "./utils/html";

test(`<audio>`, () => {
  const n = render<HTMLAudioElement>(h.audio());
  expect(n.tagName.toLowerCase()).toBe("audio");
});
