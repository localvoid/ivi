import {
  useResetJSDOM, useResetModules, useDOMElement, useHTML, useTest, useModule,
} from "ivi-jest";
import { Op } from "ivi";

useResetJSDOM();
useResetModules();
const c = useDOMElement();
const h = useHTML();
const portal = useModule<typeof import("ivi-portal")>("ivi-portal");
const t = useTest();
const _ = void 0;
const r = (op: Op) => t.render(op, c()).domNode;

test("portal", () => {
  const P = portal.portal((op) => h.div("portal-root", _, op));
  r([P.root, h.div("", _, h.div("main", _, P.entry("portal-entry")))]);

  expect(c()).toMatchSnapshot();
});
