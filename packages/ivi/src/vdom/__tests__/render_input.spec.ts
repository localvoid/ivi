import * as h from "ivi-html";
import { startRender } from "./utils";

test(`<input>`, () => {
  startRender<HTMLInputElement>((r) => {
    const n = r(h.input());

    expect(n.tagName.toLowerCase()).toBe("input");
    expect(n.type).toBe("text");
  });
});

test(`<input value="abc">`, () => {
  startRender<HTMLInputElement>((r) => {
    const n = r(h.input("", { value: h.VALUE("abc") }));

    expect(n.value).toBe("abc");
  });
});

test(`<input type="checkbox">`, () => {
  startRender<HTMLInputElement>((r) => {
    const n = r(h.input("", { type: "checkbox" }));

    expect(n.tagName.toLowerCase()).toBe("input");
    expect(n.type).toBe("checkbox");
  });
});

test(`<input type="checkbox" checked="false">`, () => {
  startRender<HTMLInputElement>((r) => {
    const n = r(h.input("", { type: "checkbox", checked: h.CHECKED(false) }));

    expect(n.checked).toBe(false);
  });
});

test(`<input type="checkbox" checked="true">`, () => {
  startRender<HTMLInputElement>((r) => {
    const n = r(h.input("", { type: "checkbox", checked: h.CHECKED(true) }));

    expect(n.checked).toBe(true);
  });
});
