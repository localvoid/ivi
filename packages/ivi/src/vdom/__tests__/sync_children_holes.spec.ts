import { _, TrackByKey, key } from "ivi";
import * as h from "ivi-html";
import { startRender, checkDOMOps, Stateful, Static } from "./utils";

describe(`update children lists with holes`, () => {
  test(`single child from null to null`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [null]);
        const v2 = h.div(_, _, [null]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`<div />`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 1,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`single child from null to 1`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [null]);
        const v2 = h.div(_, _, [1]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 1,
  "insertBefore": 2,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`single child from 1 to null`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [1]);
        const v2 = h.div(_, _, [null]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`<div />`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 1,
  "insertBefore": 2,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`first child from null to 1`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [null, 2]);
        const v2 = h.div(_, _, [1, 2]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
  2
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`first child from 1 to null`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [1, 2]);
        const v2 = h.div(_, _, [null, 2]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  2
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`second child from null to 2`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [1, null]);
        const v2 = h.div(_, _, [1, 2]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
  2
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`second child from 2 to null`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [1, 2]);
        const v2 = h.div(_, _, [1, null]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`both children from null`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [null, null]);
        const v2 = h.div(_, _, [1, 2]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
  2
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`both children to null`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [1, 2]);
        const v2 = h.div(_, _, [null, null]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`<div />`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 2,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`single stateful component root from null to 1`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [Stateful(null)]);
        const v2 = h.div(_, _, [Stateful(1)]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 1,
  "insertBefore": 2,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`single stateful component root from 1 to null`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [Stateful(1)]);
        const v2 = h.div(_, _, [Stateful(null)]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`<div />`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 1,
  "insertBefore": 2,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`first stateful component root from null to 1`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [Stateful(null), Stateful(2)]);
        const v2 = h.div(_, _, [Stateful(1), Stateful(2)]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
  2
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`first stateful component root from 1 to null`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [Stateful(1), Stateful(2)]);
        const v2 = h.div(_, _, [Stateful(null), Stateful(2)]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  2
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`second stateful component root from null to 2`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [Stateful(1), Stateful(null)]);
        const v2 = h.div(_, _, [Stateful(1), Stateful(2)]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
  2
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`second stateful component root from 2 to null`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [Stateful(1), Stateful(2)]);
        const v2 = h.div(_, _, [Stateful(1), Stateful(null)]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`move stateful component and replace root from 2 to null`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(
          _,
          _,
          TrackByKey([key(1, Stateful(1)), key(2, Stateful(2))])
        );
        const v2 = h.div(
          _,
          _,
          TrackByKey([key(2, Stateful(null)), key(1, Stateful(1))])
        );
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`move stateful component and replace root from null to 2`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(
          _,
          _,
          TrackByKey([key(1, Stateful(1)), key(2, Stateful(null))])
        );
        const v2 = h.div(
          _,
          _,
          TrackByKey([key(2, Stateful(2)), key(1, Stateful(1))])
        );
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  2
  1
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`TrackByKey nodes mixed with basic nodes should be removed`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [1, TrackByKey([key(0, 0)])]);
        const v2 = h.div(_, _, [1, null]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`TrackByKey null nodes mixed with basic nodes should be removed when TrackByKey is removed`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [1, TrackByKey([key(2, 2)])]);
        const v2 = h.div(_, _, [1, null]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`TrackByKey null nodes mixed with basic nodes should be removed when TrackByKey has an empty array`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [1, TrackByKey([key(2, 2)])]);
        const v2 = h.div(_, _, [1, TrackByKey([])]);
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`move static component with null node`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(
          _,
          _,
          TrackByKey([
            key(1, Static(1)),
            key(2, Static(2)),
            key(3, Static(null))
          ])
        );
        const v2 = h.div(
          _,
          _,
          TrackByKey([
            key(3, Static(null)),
            key(1, Static(1)),
            key(2, Static(2))
          ])
        );
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
  2
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`move static fragment with null nodes`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(
          _,
          _,
          TrackByKey([
            key(1, Static(1)),
            key(2, Static(2)),
            key(3, Static([null, null]))
          ])
        );
        const v2 = h.div(
          _,
          _,
          TrackByKey([
            key(3, Static([null, null])),
            key(1, Static(1)),
            key(2, Static(2))
          ])
        );
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  1
  2
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 3,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`move static element with null fragments`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v0 = h.div(_, _, [null, null]);

        const v1 = h.div(_, _, TrackByKey([key(1, 1), key(2, 2), key(3, v0)]));
        const v2 = h.div(_, _, TrackByKey([key(3, v0), key(1, 1), key(2, 2)]));
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  <div />
  1
  2
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 5,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`move static fragment with stateful component and null node`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v0 = h.div(_, _, [Stateful(1), null]);

        const v1 = h.div(_, _, TrackByKey([key(1, 1), key(2, 2), key(3, v0)]));
        const v2 = h.div(_, _, TrackByKey([key(3, v0), key(1, 1), key(2, 2)]));
        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  <div>
    1
  </div>
  1
  2
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 3,
  "insertBefore": 6,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });
});
