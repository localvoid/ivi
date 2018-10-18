import { fragment, connect } from "ivi";
import * as h from "ivi-html";
import { startRender } from "./utils";

test(`connect should raise an exception when render function returns children collection`, () => {
  startRender<HTMLElement>(r => {
    const Connector = connect(
      () => 1, props => fragment(
        h.div(),
        h.div(),
      )!,
    );
    expect(() => { r(Connector()); }).toThrowError("singular");
  });
});
