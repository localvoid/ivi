// import * as h from "ivi-html";
// import { startRender, checkDOMOps, domOps } from "./utils";

// test(`<div>""</div> => <div>"abc"</div>`, () => {
//   startRender(r => {
//     checkDOMOps(c => {
//       r(h.div().t(""));
//       const n = r(h.div().t("abc"));

//       expect(n).toMatchSnapshot();
//       expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
//     });
//   });
// });

// test(`<div>"abc"</div> => <div>""</div>`, () => {
//   startRender(r => {
//     checkDOMOps(c => {
//       r(h.div().t("abc"));
//       const n = r(h.div().t(""));

//       expect(n).toMatchSnapshot();
//       expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
//     });
//   });
// });

// test(`<div></div> => <div>"abc"</div>`, () => {
//   startRender(r => {
//     checkDOMOps(c => {
//       r(h.div());
//       const n = r(h.div().t("abc"));

//       expect(n).toMatchSnapshot();
//       expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
//     });
//   });
// });

// test(`<div>"abc"</div> => <div>""</div>`, () => {
//   startRender(r => {
//     checkDOMOps(c => {
//       r(h.div().t("abc"));
//       const n = r(h.div());

//       expect(n).toMatchSnapshot();
//       expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
//     });
//   });
// });
