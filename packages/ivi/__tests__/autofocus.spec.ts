import { update } from "ivi";
import * as h from "ivi-html";
import { startRender } from "./utils";

test(`autofocus with a true value should set focus on an element`, () => {
  startRender((r) => {
    const n = r(h.input().autofocus(true));
    update();
    expect(document.activeElement).toBe(n);
  });
});

test(`autofocus with a false value shouldn't set focus on an element`, () => {
  startRender((r) => {
    const n = r(h.input().autofocus(false));
    update();
    expect(document.activeElement).not.toBe(n);
  });
});
