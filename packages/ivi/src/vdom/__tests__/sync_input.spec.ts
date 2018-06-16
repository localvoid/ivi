import * as h from "ivi-html";
import { startRender, checkDOMOps } from "./utils";

test(`<input> => <input type="checkbox">`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.input());
      const n = r(h.input("", { type: "checkbox" }));

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<input> => <input value="cde">`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.input());
      const n = r(h.input("", { value: h.VALUE("cde") }));

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<input value="abc"> => <input value="cde">`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.input("", { value: h.VALUE("abc") }));
      const n = r(h.input("", { value: h.VALUE("cde") }));

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<input value="abc"> => <input>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.input("", { value: h.VALUE("abc") }));
      const n = r(h.input());

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<input type="checkbox"> => <input type="checkbox" checked=true>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.input("", { type: "checkbox" }));
      const n = r(h.input("", { type: "checkbox", checked: h.CHECKED(true) }));

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<input type="checkbox" checked=true> => <input type="checkbox" checked=false>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.input("", { type: "checkbox", checked: h.CHECKED(true) }));
      const n = r(h.input("", { type: "checkbox", checked: h.CHECKED(false) }));

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<input type="checkbox" checked=true> => <input type="checkbox">`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.input("", { type: "checkbox", checked: h.CHECKED(true) }));
      const n = r(h.input("", { type: "checkbox" }));

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});
