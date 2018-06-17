import { update } from "ivi";
import * as h from "ivi-html";
import { AUTOFOCUS } from "ivi-scheduler";
import { startRender } from "./utils";

test(`autofocus should set focus on an element`, () => {
  startRender((r) => {
    const n = r(h.input("", { autofocus: AUTOFOCUS(true) }));
    update();
    expect(document.activeElement).toBe(n);
  });
});
