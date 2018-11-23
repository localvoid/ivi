import { _, TrackByKey, key } from "ivi";
import * as h from "ivi-html";
import { startRender, checkDOMOps, Stateful } from "./utils";

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
  "removeChild": 0,
  "replaceChild": 0,
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
  "removeChild": 0,
  "replaceChild": 0,
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
  "removeChild": 1,
  "replaceChild": 0,
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
  "removeChild": 0,
  "replaceChild": 0,
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
  "removeChild": 1,
  "replaceChild": 0,
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
  "removeChild": 0,
  "replaceChild": 0,
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
  "removeChild": 1,
  "replaceChild": 0,
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
  "removeChild": 0,
  "replaceChild": 0,
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
  "removeChild": 2,
  "replaceChild": 0,
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
  "removeChild": 0,
  "replaceChild": 0,
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
  "removeChild": 1,
  "replaceChild": 0,
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
  "removeChild": 0,
  "replaceChild": 0,
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
  "removeChild": 1,
  "replaceChild": 0,
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
  "removeChild": 0,
  "replaceChild": 0,
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
  "removeChild": 1,
  "replaceChild": 0,
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
  "removeChild": 1,
  "replaceChild": 0,
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
      });
    });
  });
});
