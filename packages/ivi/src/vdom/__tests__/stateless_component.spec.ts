import { statelessComponent, withShouldUpdate } from "ivi";
import * as h from "ivi-html";
import { startRender } from "./utils";

test(`props should be passed to render hook`, () => {
  startRender(r => {
    let a = -1;
    const c = statelessComponent<number>(props => {
      a = props;
      return h.div().c(props);
    },
    );

    r(c(1337));

    expect(a).toBe(1337);
  });
});

test(`props should be passed to shouldUpdate hook`, () => {
  startRender(r => {
    let a = -1;
    let b = -1;

    const c = withShouldUpdate<number>(
      (oldProps, newProps) => {
        a = oldProps;
        b = newProps;
        return true;
      },
      statelessComponent<number>(props => h.div().c(props),
      ),
    );

    r(c(1337));
    r(c(1338));

    expect(a).toBe(1337);
    expect(b).toBe(1338);
  });
});
