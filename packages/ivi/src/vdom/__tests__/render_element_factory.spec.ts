import { element } from "ivi";
import * as h from "ivi-html";
import { startRender } from "./utils";

test(`<div></div>`, () => {
  startRender<HTMLElement>((r) => {
    const e = element(h.div());
    const n = r(e());

    expect(n.tagName.toLowerCase()).toBe("div");
  });
});

test(`predefined className: <div class="a"></div>`, () => {
  startRender<HTMLElement>((r) => {
    const e = element(h.div("a"));
    const n = r(e());

    expect(n.classList.length).toBe(1);
    expect(n.classList.contains("a")).toBeTruthy();
  });
});

test(`<div class="a"></div>`, () => {
  startRender<HTMLElement>((r) => {
    const e = element(h.div());
    const n = r(e("a"));

    expect(n.classList.length).toBe(1);
    expect(n.classList.contains("a")).toBeTruthy();
  });
});

test(`<div id="123"></div>`, () => {
  startRender<HTMLElement>((r) => {
    const e = element(h.div("", { id: "123" }));
    const n = r(e());

    expect(n.attributes.length).toBe(1);
    expect(n.getAttribute("id")).toBe("123");
  });
});

test(`render twice: <div id="123"></div>`, () => {
  startRender<HTMLElement>((r) => {
    const e = element(h.div("", { id: "123" }));
    r(e());
    const n = r(e());

    expect(n.tagName.toLowerCase()).toBe("div");
    expect(n.attributes.length).toBe(1);
    expect(n.getAttribute("id")).toBe("123");
  });
});
