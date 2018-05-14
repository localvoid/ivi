import { Component, VNode, statelessComponent, statefulComponent, fragment } from "ivi";
import * as h from "ivi-html";
import { startRender, checkDOMOps, domOps } from "./utils";

const Stateless = statelessComponent<VNode>(
  (child) => child,
);

const Stateful = statefulComponent(class extends Component<VNode> {
  render() {
    return this.props;
  }
});

test(`#1`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      const v1 = (
        h.span()
      );
      const v2 = (
        Stateful(
          h.div(),
        )
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#2`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      const v1 = (
        Stateful(
          h.div(),
        )
      );
      const v2 = (
        h.div()
      );

      const a = r(v1);
      const b = r(v2);

      expect(a).not.toBe(b);
      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#3`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      const v1 = (
        h.div()
      );
      const v2 = (
        Stateful(
          h.div(),
        )
      );

      const a = r(v1);
      const b = r(v2);

      expect(a).not.toBe(b);
      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#4`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      const v1 = (
        Stateful(
          h.div(),
        )
      );
      const v2 = (
        h.span()
      );

      r(v1);
      const n = r(v2);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#5`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      const v1 = (
        Stateful(
          h.div(),
        )
      );
      const v2 = (
        Stateful(
          h.div(),
        )
      );

      const a = r(v1);
      const b = r(v2);

      expect(a).toBe(b);
      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#6`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      const v1 = (
        Stateful(
          Stateful(
            h.div(),
          ),
        )
      );
      const v2 = (
        h.span()
      );

      r(v1);
      const b = r(v2);

      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#7`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      const v1 = (
        h.span()
      );
      const v2 = (
        Stateful(
          Stateful(
            h.div(),
          ),
        )
      );

      r(v1);
      const b = r(v2);

      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#8`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      const v1 = (
        Stateful(
          Stateful(
            h.div(),
          ),
        )
      );
      const v2 = (
        Stateful(
          Stateful(
            h.div(),
          ),
        )
      );

      const a = r(v1);
      const b = r(v2);

      expect(a).toBe(b);
      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#9`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      const v1 = (
        h.span()
      );
      const v2 = (
        Stateless(
          h.div(),
        )
      );

      r(v1);
      const b = r(v2);

      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#10`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      const v1 = (
        Stateless(
          h.div(),
        )
      );
      const v2 = (
        h.div()
      );

      const a = r(v1);
      const b = r(v2);

      expect(a).not.toBe(b);
      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#11`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      const v1 = (
        h.div()
      );
      const v2 = (
        Stateless(
          h.div(),
        )
      );

      const a = r(v1);
      const b = r(v2);

      expect(a).not.toBe(b);
      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#12`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      const v1 = (
        Stateless(
          h.div(),
        )
      );
      const v2 = (
        h.span()
      );

      r(v1);
      const b = r(v2);

      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#13`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      const v1 = (
        Stateless(
          h.div(),
        )
      );
      const v2 = (
        Stateless(
          h.div(),
        )
      );

      const a = r(v1);
      const b = r(v2);

      expect(a).toBe(b);
      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#14`, () => {
  startRender((r) => {
    checkDOMOps((c) => {
      const v1 = (
        Stateless(
          Stateless(
            h.div(),
          ),
        )
      );
      const v2 = (
        h.span()
      );

      r(v1);
      const b = r(v2);

      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#15`, () => {
  startRender<HTMLElement>((r) => {
    checkDOMOps((c) => {
      const v1 = (
        h.span()
      );
      const v2 = (
        Stateless(
          Stateless(
            h.div(),
          ),
        )
      );

      r(v1);
      const b = r(v2);

      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#16`, () => {
  startRender<HTMLElement>((r) => {
    checkDOMOps((c) => {
      const v1 = (
        Stateless(
          Stateless(
            h.div(),
          ),
        )
      );
      const v2 = (
        Stateless(
          Stateless(
            h.div(),
          ),
        )
      );

      const a = r(v1);
      const b = r(v2);

      expect(a).toBe(b);
      expect(b).toMatchSnapshot();
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });
});

test(`#17`, () => {
  startRender<HTMLElement>((r) => {
    checkDOMOps((c) => {
      const v1 = (
        Stateful(
          h.div(),
        )
      );
      const v2 = (
        Stateless(
          h.div(),
        )
      );

      const a = r(v1);
      const b = r(v2);

      expect(a).not.toBe(b);
      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#18`, () => {
  startRender<HTMLElement>((r) => {
    checkDOMOps((c) => {
      const v1 = (
        Stateless(
          h.div(),
        )
      );
      const v2 = (
        Stateful(
          h.div(),
        )
      );

      const a = r(v1);
      const b = r(v2);

      expect(a).not.toBe(b);
      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#19`, () => {
  startRender<HTMLElement>((r) => {
    checkDOMOps((c) => {
      const v1 = (
        Stateful(
          Stateful(
            h.div(),
          ),
        )
      );
      const v2 = (
        Stateless(
          Stateless(
            h.div(),
          ),
        )
      );

      const a = r(v1);
      const b = r(v2);

      expect(a).not.toBe(b);
      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`#20`, () => {
  startRender<HTMLElement>((r) => {
    checkDOMOps((c) => {
      const v1 = (
        Stateless(
          Stateless(
            h.div(),
          ),
        )
      );
      const v2 = (
        Stateful(
          Stateful(
            h.div(),
          ),
        )
      );

      const a = r(v1);
      const b = r(v2);

      expect(a).not.toBe(b);
      expect(b).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`stateless component should raise an exception when render function returns children collection`, () => {
  startRender<HTMLElement>((r) => {
    const v1 = (
      Stateless(
        h.div(),
      )
    );
    const v2 = (
      Stateless(
        fragment(
          h.div(),
          h.div(),
        )!,
      )
    );

    r(v1);
    expect(() => { r(v2); }).toThrowError("singular");
  });
});

test(`stateful component should raise an exception when render function returns children collection`, () => {
  startRender<HTMLElement>((r) => {
    const v1 = (
      Stateful(
        h.div(),
      )
    );
    const v2 = (
      Stateful(
        fragment(
          h.div(),
          h.div(),
        )!,
      )
    );

    r(v1);
    expect(() => { r(v2); }).toThrowError("singular");
  });
});
