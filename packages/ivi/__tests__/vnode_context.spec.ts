import { context, fragment } from "ivi";
import * as h from "ivi-html";

test(`assigning children collection should raise an exception`, () => {
  expect(() => (
    context({},
      fragment(h.div(), h.div())!,
    )
  )).toThrowError("singular");
});
