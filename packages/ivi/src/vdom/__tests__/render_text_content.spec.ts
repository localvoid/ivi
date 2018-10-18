import { startRender, checkDOMOps } from "./utils";
import * as h from "ivi-html";

test(`<div>""</div>`, () => {
  checkDOMOps(c => {
    startRender(r => {
      const v = h.div().t("");
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div>"abc"</div>`, () => {
  checkDOMOps(c => {
    startRender(r => {
      const v = h.div().t("abc");
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div>10</div>`, () => {
  checkDOMOps(c => {
    startRender(r => {
      const v = h.div().t(10);
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});
