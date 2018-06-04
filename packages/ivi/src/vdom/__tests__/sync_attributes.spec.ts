import * as h from "ivi-html";
import { startRender } from "./utils";

describe(`sync element attributes`, () => {
  test(`undefined => {}`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div());
      const n = r(h.div("", {}));

      expect(n.attributes).toHaveLength(0);
    });
  });

  test(`{} => undefined`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", {}));
      const n = r(h.div());

      expect(n.attributes).toHaveLength(0);
    });
  });

  test(`{} => {}`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", {}));
      const n = r(h.div("", {}));

      expect(n.attributes).toHaveLength(0);
    });
  });

  test(`undefined => { title: "1" }`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div());
      const n = r(h.div("", { title: "1" }));

      expect(n.attributes).toHaveLength(1);
      expect(n.getAttribute("title")).toBe("1");
    });
  });

  test(`{} => { title: "1" }`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", {}));
      const n = r(h.div("", { title: "1" }));

      expect(n.attributes).toHaveLength(1);
      expect(n.getAttribute("title")).toBe("1");
    });
  });

  test(`{ title: "1" } => { title: "2" }`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", { title: "1" }));
      const n = r(h.div("", { title: "2" }));

      expect(n.getAttribute("title")).toBe("2");
    });
  });

  test(`{ title: "1" } => { title: undefined }`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", { title: "1" }));
      const n = r(h.div("", { title: undefined }));

      expect(n.attributes.length).toBe(0);
    });
  });

  test(`{ bool: false } => { bool: true }`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", { bool: false }));
      const n = r(h.div("", { bool: true }));

      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("bool")).toBe("");
    });
  });

  test(`{} => { title: "2", tabIndex: 2 }`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", {}));
      const n = r(h.div("", {
        title: "2",
        tabIndex: 2,
      }));

      expect(n.attributes).toHaveLength(2);
      expect(n.getAttribute("title")).toBe("2");
      expect(n.getAttribute("tabIndex")).toBe("2");
    });
  });

  test(`{ title: "1" } => { title: "2", tabIndex: 2 }`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", {
        title: "1",
      }));
      const n = r(h.div("", {
        title: "2",
        tabIndex: 2,
      }));

      expect(n.attributes).toHaveLength(2);
      expect(n.getAttribute("title")).toBe("2");
      expect(n.getAttribute("tabIndex")).toBe("2");
    });
  });

  test(`{ title: "1", tabIndex: 1 } => { title: "2", tabIndex: 2 }`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", {
        title: "1",
        tabIndex: 1,
      }));
      const n = r(h.div("", {
        title: "2",
        tabIndex: 2,
      }));

      expect(n.attributes).toHaveLength(2);
      expect(n.getAttribute("title")).toBe("2");
      expect(n.getAttribute("tabIndex")).toBe("2");
    });
  });

  test(`{ title: "1", tabIndex: 1 } => { title: "1", tabIndex: 1 }`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", {
        title: "1",
        tabIndex: 1,
      }));
      const n = r(h.div("", {
        title: "1",
        tabIndex: 1,
      }));

      expect(n.attributes).toHaveLength(2);
      expect(n.getAttribute("title")).toBe("1");
      expect(n.getAttribute("tabIndex")).toBe("1");
    });
  });

  test(`{ title: "1", tabIndex: 1 } => { title: "2" }`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", {
        title: "1",
        tabIndex: 1,
      }));
      const n = r(h.div("", {
        title: "2",
      }));

      expect(n.attributes).toHaveLength(2);
      expect(n.getAttribute("title")).toBe("2");
      expect(n.getAttribute("tabIndex")).toBe("1");
    });
  });

  test(`{ title: "1", tabIndex: 1 } => { title: "2", lang: "en" }`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", {
        title: "1",
        tabIndex: 1,
      }));
      const n = r(h.div("", {
        title: "2",
        lang: "en",
      }));

      expect(n.attributes).toHaveLength(3);
      expect(n.getAttribute("title")).toBe("2");
      expect(n.getAttribute("lang")).toBe("en");
      expect(n.getAttribute("tabIndex")).toBe("1");
    });
  });

  test(`{ title: "1", tabIndex: 1 } => { lang: "en" }`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", {
        title: "1",
        tabIndex: 1,
      }));
      const n = r(h.div("", {
        lang: "en",
      }));

      expect(n.attributes).toHaveLength(3);
      expect(n.getAttribute("lang")).toBe("en");
      expect(n.getAttribute("title")).toBe("1");
      expect(n.getAttribute("tabIndex")).toBe("1");
    });
  });

  test(`{ title: "1", tabIndex: 1 } => {}`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", {
        title: "1",
        tabIndex: 1,
      }));
      const n = r(h.div("", {}));

      expect(n.attributes).toHaveLength(2);
      expect(n.getAttribute("title")).toBe("1");
      expect(n.getAttribute("tabIndex")).toBe("1");
    });
  });

  test(`{ title: "1", tabIndex: 1 } => undefined`, () => {
    startRender<HTMLElement>((r) => {
      r(h.div("", {
        title: "1",
        tabIndex: 1,
      }));
      const n = r(h.div());

      expect(n.attributes).toHaveLength(2);
      expect(n.getAttribute("title")).toBe("1");
      expect(n.getAttribute("tabIndex")).toBe("1");
    });
  });
});
