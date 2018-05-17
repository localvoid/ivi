import { update, autofocus } from "ivi";
import * as h from "ivi-html";
import { startRender } from "./utils";

test(`autofocus should set focus on an element`, () => {
  startRender((r) => {
    const n = r(autofocus(h.input()));
    update();
    expect(document.activeElement).toBe(n);
  });
});
