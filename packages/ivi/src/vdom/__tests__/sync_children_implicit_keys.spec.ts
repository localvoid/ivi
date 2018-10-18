import * as h from "ivi-html";
import { startRender, checkDOMOps, domOps } from "./utils";

test(`<div></div> => <div><div></div><div></div></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div()
      );
      const v2 = (
        h.div().c(
          h.div(),
          h.div(),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toEqual(domOps(3, 0, 0, 0, 3, 0, 0));
    });
  });
});

test(`<div><div></div><div></div></div> => <div></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div(),
          h.div(),
        )
      );
      const v2 = (
        h.div()
      );

      r(v1);
      const b = r(v2);

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(3, 0, 0, 0, 3, 0, 0));
    });
  });
});

test(`<div>123</div> => <div><h1></h1><h2></h2></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(123)
      );
      const v2 = (
        h.div().c(
          h.h1(),
          h.h2(),
        )
      );

      r(v1);
      const b = r(v2);

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(3, 0, 1, 0, 3, 1, 0));
    });
  });
});

test(`<div><h1></h1><h2></h2></div> => <div>123</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.h1(),
          h.h2(),
        )
      );
      const v2 = (
        h.div().c(123)
      );

      r(v1);
      const b = r(v2);

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(3, 0, 1, 0, 3, 1, 1));
    });
  });
});

test(`<div><h1></h1><h2></h2></div> => <div><div></div></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.h1(),
          h.h2(),
        )
      );
      const v2 = (
        h.div().c(
          h.div(),
        )
      );

      r(v1);
      const b = r(v2);

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(4, 0, 0, 0, 3, 1, 1));
    });
  });
});

test(`<div><h1></h1></div> => <div><h2></h2></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.h1(),
        )
      );
      const v2 = (
        h.div().c(
          h.h2(),
        )
      );

      r(v1);
      const b = r(v2);

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(3, 0, 0, 0, 2, 1, 0));
    });
  });
});

test(`<div><div></div></div> => <div><h1></h1><h2></h2></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = (
        h.div().c(
          h.div(),
        )
      );
      const v2 = (
        h.div().c(
          h.h1(),
          h.h2(),
        )
      );

      r(v1);
      const b = r(v2);

      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(4, 0, 0, 0, 3, 1, 0));
    });
  });
});
