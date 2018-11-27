import { _ } from "ivi";
import * as h from "ivi-html";
import { startRender, checkDOMOps } from "./utils";

test(`<div></div> => <div>"abc"</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div());
      const n = r(h.div(_, _, "abc"));

      expect(n).toMatchInlineSnapshot(`
<div>
  abc
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

test(`<div></div> => <div>10</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div());
      const n = r(h.div(_, _, 10));

      expect(n).toMatchInlineSnapshot(`
<div>
  10
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

test(`<div>"abc"</div> => <div></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, "abc"));
      const n = r(h.div());

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

test(`<div>10</div> => <div></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, 10));
      const n = r(h.div());

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

test(`<div>"abc"</div> => <div>"abc"</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, "abc"));
      const n = r(h.div(_, _, "abc"));

      expect(n).toMatchInlineSnapshot(`
<div>
  abc
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

test(`<div>10</div> => <div>10</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, 10));
      const n = r(h.div(_, _, 10));

      expect(n).toMatchInlineSnapshot(`
<div>
  10
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

test(`<div>"abc"</div> => <div>"cde"</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, "abc"));
      const n = r(h.div(_, _, "cde"));

      expect(n).toMatchInlineSnapshot(`
<div>
  cde
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

test(`<div>""</div> => <div>"cde"</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, ""));
      const n = r(h.div(_, _, "cde"));

      expect(n).toMatchInlineSnapshot(`
<div>
  cde
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

test(`<div>"abc"</div> => <div>10</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, "abc"));
      const n = r(h.div(_, _, 10));

      expect(n).toMatchInlineSnapshot(`
<div>
  10
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

test(`<div>10</div> => <div>"abc"</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, 10));
      const n = r(h.div(_, _, "abc"));

      expect(n).toMatchInlineSnapshot(`
<div>
  abc
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

test(`<div>{ null }</div> => <div><div></div></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div());
      const n = r(h.div(_, _, h.div())) as HTMLElement;

      expect(n).toMatchInlineSnapshot(`
<div>
  <div />
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 2,
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`<div><div></div></div> => <div>{ null }</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, h.div()));
      const n = r(h.div(_, _, null));

      expect(n).toMatchInlineSnapshot(`<div />`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 2,
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`<div><div></div> => <div>"cde"</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, h.div()));
      const n = r(h.div(_, _, "cde"));

      expect(n).toMatchInlineSnapshot(`
<div>
  cde
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 1,
  "insertBefore": 3,
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`<div>"cde"</div> => <div><div></div></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, "cde"));
      const n = r(h.div(_, _, h.div()));

      expect(n).toMatchInlineSnapshot(`
<div>
  <div />
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 1,
  "insertBefore": 3,
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`<div></div> => <div><div></div></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div());
      const n = r(h.div(_, _, h.div()));

      expect(n).toMatchInlineSnapshot(`
<div>
  <div />
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 2,
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`<div><div></div></div> => <div></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, h.div()));
      const n = r(h.div());

      expect(n).toMatchInlineSnapshot(`<div />`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 2,
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

describe(`fragments`, () => {
  test(`different fragment length, 2 to 1`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [0, 1]);
        const v2 = h.div(_, _, [2]);

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
  "createTextNode": 3,
  "insertBefore": 4,
  "removeChild": 0,
  "replaceChild": 0,
}
`);
      });
    });
  });

  test(`different fragment length, 1 to 2`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [0]);
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
  "createTextNode": 3,
  "insertBefore": 4,
  "removeChild": 0,
  "replaceChild": 0,
}
`);
      });
    });
  });

  test(`from null to fragment`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, null);
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

  test(`from fragment to null`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [1, 2]);
        const v2 = h.div(_, _, null);

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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
      });
    });
  });

  test(`from div to fragment`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, h.div());
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
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 4,
  "removeChild": 1,
  "replaceChild": 0,
}
`);
      });
    });
  });

  test(`from fragment to div`, () => {
    startRender(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, [1, 2]);
        const v2 = h.div(_, _, h.div());

        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  <div />
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 4,
  "removeChild": 0,
  "replaceChild": 0,
}
`);
      });
    });
  });
});
