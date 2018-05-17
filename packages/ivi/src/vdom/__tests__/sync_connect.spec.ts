import { fragment, connect } from "ivi";
import * as h from "ivi-html";
import { startRender } from "./utils";

test(`connect should raise an exception when render function returns children collection`, () => {
  startRender<HTMLElement>((r) => {
    let i = 0;
    const Connector = connect(
      () => i++,
      (props) => (i === 1) ?
        h.div() :
        fragment(
          h.div(),
          h.div(),
        )!,
    );

    r(Connector());
    expect(() => { r(Connector()); }).toThrowError("singular");
  });
});
