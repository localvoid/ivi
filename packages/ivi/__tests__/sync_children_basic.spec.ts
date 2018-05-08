import * as h from "ivi-html";
import { startRender, checkDOMOps, domOps } from "./utils";

test(`<div></div> => <div>"abc"</div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div());
      const n = r(h.div().c("abc"));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 1, 0, 2, 0, 0));
    });
  });
});

test(`<div></div> => <div>10</div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div());
      const n = r(h.div().c(10));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 1, 0, 2, 0, 0));
    });
  });
});

test(`<div>"abc"</div> => <div></div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c("abc"));
      const n = r(h.div());

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 1, 0, 2, 0, 0));
    });
  });
});

test(`<div>10</div> => <div></div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(10));
      const n = r(h.div());

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 1, 0, 2, 0, 0));
    });
  });
});

test(`<div>"abc"</div> => <div>"abc"</div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c("abc"));
      const n = r(h.div().c("abc"));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 1, 0, 2, 0, 0));
    });
  });
});

test(`<div>10</div> => <div>10</div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(10));
      const n = r(h.div().c(10));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 1, 0, 2, 0, 0));
    });
  });
});

test(`<div>"abc"</div> => <div>"cde"</div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c("abc"));
      const n = r(h.div().c("cde"));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 1, 0, 2, 0, 0));
    });
  });
});

test(`<div>""</div> => <div>"cde"</div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(""));
      const n = r(h.div().c("cde"));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 1, 0, 2, 0, 0));
    });
  });
});

test(`<div>"abc"</div> => <div>10</div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c("abc"));
      const n = r(h.div().c(10));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 1, 0, 2, 0, 0));
    });
  });
});

test(`<div>10</div> => <div>"abc"</div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(10));
      const n = r(h.div().c("abc"));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 1, 0, 2, 0, 0));
    });
  });
});

test(`<div>{ null }</div> => <div><div></div></div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div());
      const n = r(h.div().c(h.div())) as HTMLElement;

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(2, 0, 0, 0, 2, 0, 0));
    });
  });
});

test(`<div><div></div></div> => <div>{ null }</div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(h.div()));
      const n = r(h.div().c(null));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(2, 0, 0, 0, 2, 0, 0));
    });
  });
});

test(`<div><div></div> => <div>"cde"</div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(h.div()));
      const n = r(h.div().c("cde"));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(2, 0, 1, 0, 2, 1, 0));
    });
  });
});

test(`<div>"cde"</div> => <div><div></div></div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c("cde"));
      const n = r(h.div().c(h.div()));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(2, 0, 1, 0, 2, 1, 0));
    });
  });
});

test(`<div></div> => <div><div></div></div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div());
      const n = r(h.div().c(h.div()));

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(2, 0, 0, 0, 2, 0, 0));
    });
  });
});

test(`<div><div></div></div> => <div></div>`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      r(h.div().c(h.div()));
      const n = r(h.div());

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(2, 0, 0, 0, 2, 0, 0));
    });
  });
});

test(`raise an exception when VNode is used multiple times`, () => {
  startRender((r) => {
    const v1 = h.div();
    const v2 = h.div();
    r(v1);
    r(v2);

    expect(() => r(v1)).toThrowError();
  });
});
