import { _, TrackByKey, key } from "ivi";
import * as h from "ivi-html";
import { testRenderDOM } from "ivi-test";
import { checkDOMOps, Stateless, Static, Stateful } from "./utils";

const i = (n: number) => key(n, n);
const k = (...is: number[]) => h.div(_, _, TrackByKey(is.map(i)));

test(`#1`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0);
      const v2 = k(0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
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

test(`#2`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(0, 1, 2);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
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
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#3`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k();
      const v2 = k(0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
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

test(`#4`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0);
      const v2 = k(0, 1);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
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

test(`0 => 0 1 2`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0);
      const v2 = k(0, 1, 2);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
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
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#6`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0);
      const v2 = k(1);

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
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 1,
}
`);
    });
  });
});

test(`0 => 1 0`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0);
      const v2 = k(1, 0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  1
  0
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

test(`#8`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0);
      const v2 = k(0, 1);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
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

test(`#9`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0);
      const v2 = k(1, 2, 0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  1
  2
  0
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 3,
  "insertBefore": 4,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#10`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0);
      const v2 = k(0, 1, 2);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
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
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#13`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0);
      const v2 = k(1, 0, 2);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  1
  0
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
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#14`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(2);
      const v2 = k(0, 1, 2, 3, 4);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
  2
  3
  4
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 5,
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

test(`#16`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(1, 2);
      const v2 = k(0, 1, 2);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
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
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#17`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1);
      const v2 = k(0, 1, 2);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
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
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#18`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 2);
      const v2 = k(0, 1, 2);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
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
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#19`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(2, 3);
      const v2 = k(0, 1, 2, 3);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
  2
  3
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#20`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1);
      const v2 = k(0, 1, 2, 3);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
  2
  3
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#21`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(1, 2);
      const v2 = k(0, 1, 2, 3);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
  2
  3
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#22`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(1, 3);
      const v2 = k(0, 1, 2, 3, 4);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
  2
  3
  4
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 5,
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

test(`#23`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(2, 5);
      const v2 = k(0, 1, 2, 3, 4, 5, 6, 7);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
  2
  3
  4
  5
  6
  7
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 8,
  "insertBefore": 9,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#24`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(1, 3);
      const v2 = k(0, 1, 2, 3);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
  2
  3
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#25`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 2);
      const v2 = k(0, 1, 2, 3);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
  2
  3
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#26`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(2, 5);
      const v2 = k(0, 1, 2, 3, 4, 5);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
  2
  3
  4
  5
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 6,
  "insertBefore": 7,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#27`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 3);
      const v2 = k(0, 1, 2, 3, 4, 5);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
  2
  3
  4
  5
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 6,
  "insertBefore": 7,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#34`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0);
      const v2 = k();

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
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 1,
}
`);
    });
  });
});

test(`#35`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1);
      const v2 = k(1);

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

test(`#36`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1);
      const v2 = k(0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
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

test(`#37`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(1, 2);

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
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#38`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(0, 1);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 3,
  "insertBefore": 4,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#39`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(0, 2);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
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
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#43`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1);
      const v2 = k();

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
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 1,
}
`);
    });
  });
});

test(`#44`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(2);

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
  "nodeValue": 0,
  "removeChild": 2,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#45`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(0, 1);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 3,
  "insertBefore": 4,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#46`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3);
      const v2 = k(2, 3);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  2
  3
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
  "insertBefore": 5,
  "nodeValue": 0,
  "removeChild": 2,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#47`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3);
      const v2 = k(0, 1);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
  "insertBefore": 5,
  "nodeValue": 0,
  "removeChild": 2,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#48`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3);
      const v2 = k(1, 2);

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
  "createTextNode": 4,
  "insertBefore": 5,
  "nodeValue": 0,
  "removeChild": 2,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#49`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3);
      const v2 = k(0, 3);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  3
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
  "insertBefore": 5,
  "nodeValue": 0,
  "removeChild": 2,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#51`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4, 5);
      const v2 = k(0, 1, 2, 4);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
  2
  4
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 6,
  "insertBefore": 7,
  "nodeValue": 0,
  "removeChild": 2,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

// moves
test(`#57`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1);
      const v2 = k(1, 0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  1
  0
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 2,
  "insertBefore": 4,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#58`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3);
      const v2 = k(3, 2, 1, 0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  3
  2
  1
  0
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
  "insertBefore": 8,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#59`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3);
      const v2 = k(0, 2, 3, 1);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  2
  3
  1
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#60`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3);
      const v2 = k(3, 0, 1, 2);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  3
  0
  1
  2
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#61`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3);
      const v2 = k(1, 0, 2, 3);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  1
  0
  2
  3
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#62`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3);
      const v2 = k(2, 0, 1, 3);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  2
  0
  1
  3
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#63`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3);
      const v2 = k(0, 1, 3, 2);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
  3
  2
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#64`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3);
      const v2 = k(0, 2, 3, 1);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  2
  3
  1
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#66`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4, 5, 6);
      const v2 = k(2, 1, 0, 3, 4, 5, 6);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  2
  1
  0
  3
  4
  5
  6
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 7,
  "insertBefore": 10,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#67`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4, 5, 6);
      const v2 = k(0, 3, 4, 1, 2, 5, 6);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  3
  4
  1
  2
  5
  6
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 7,
  "insertBefore": 10,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#68`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4, 5, 6);
      const v2 = k(0, 2, 3, 5, 6, 1, 4);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  2
  3
  5
  6
  1
  4
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 7,
  "insertBefore": 10,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#69`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4, 5, 6);
      const v2 = k(0, 1, 5, 3, 2, 4, 6);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  1
  5
  3
  2
  4
  6
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 7,
  "insertBefore": 10,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#70`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
      const v2 = k(8, 1, 3, 4, 5, 6, 0, 7, 2, 9);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  8
  1
  3
  4
  5
  6
  0
  7
  2
  9
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 10,
  "insertBefore": 14,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#71`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
      const v2 = k(9, 5, 0, 7, 1, 2, 3, 4, 6, 8);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  9
  5
  0
  7
  1
  2
  3
  4
  6
  8
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 10,
  "insertBefore": 14,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#72`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1);
      const v2 = k(2, 1, 0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  2
  1
  0
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 3,
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

test(`#73`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1);
      const v2 = k(1, 0, 2);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  1
  0
  2
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 3,
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

test(`#74`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(3, 0, 2, 1);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  3
  0
  2
  1
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#75`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(0, 2, 1, 3);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  2
  1
  3
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#76`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(0, 2, 3, 1);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
  2
  3
  1
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#77`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(1, 2, 3, 0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  1
  2
  3
  0
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
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

test(`#78`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4);
      const v2 = k(5, 4, 3, 2, 1, 0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  5
  4
  3
  2
  1
  0
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 6,
  "insertBefore": 11,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#79`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4);
      const v2 = k(5, 4, 3, 6, 2, 1, 0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  5
  4
  3
  6
  2
  1
  0
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 7,
  "insertBefore": 12,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#80`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4);
      const v2 = k(5, 4, 3, 6, 2, 1, 0, 7);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  5
  4
  3
  6
  2
  1
  0
  7
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 8,
  "insertBefore": 13,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#81`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(1, 0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  1
  0
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 3,
  "insertBefore": 5,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#82`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(2, 0, 1);
      const v2 = k(1, 0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  1
  0
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 3,
  "insertBefore": 5,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#83`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(7, 0, 1, 8, 2, 3, 4, 5, 9);
      const v2 = k(7, 5, 4, 8, 3, 2, 1, 0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  7
  5
  4
  8
  3
  2
  1
  0
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 9,
  "insertBefore": 15,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#84`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(7, 0, 1, 8, 2, 3, 4, 5, 9);
      const v2 = k(5, 4, 8, 3, 2, 1, 0, 9);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  5
  4
  8
  3
  2
  1
  0
  9
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 9,
  "insertBefore": 15,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#85`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(7, 0, 1, 8, 2, 3, 4, 5, 9);
      const v2 = k(7, 5, 4, 3, 2, 1, 0, 9);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  7
  5
  4
  3
  2
  1
  0
  9
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 9,
  "insertBefore": 15,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#86`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(7, 0, 1, 8, 2, 3, 4, 5, 9);
      const v2 = k(5, 4, 3, 2, 1, 0, 9);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  5
  4
  3
  2
  1
  0
  9
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 9,
  "insertBefore": 15,
  "nodeValue": 0,
  "removeChild": 2,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#87`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(7, 0, 1, 8, 2, 3, 4, 5, 9);
      const v2 = k(5, 4, 3, 2, 1, 0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  5
  4
  3
  2
  1
  0
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 9,
  "insertBefore": 15,
  "nodeValue": 0,
  "removeChild": 3,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#88`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0);
      const v2 = k(1);

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
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 1,
}
`);
    });
  });
});

test(`#89`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0);
      const v2 = k(1, 2);

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
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 1,
}
`);
    });
  });
});

test(`#90`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 2);
      const v2 = k(1);

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
  "createTextNode": 3,
  "insertBefore": 4,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 1,
}
`);
    });
  });
});

test(`#91`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 2);
      const v2 = k(1, 2);

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
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#92`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 2);
      const v2 = k(2, 1);

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
  "createTextNode": 3,
  "insertBefore": 4,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#93`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(3, 4, 5);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  3
  4
  5
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 6,
  "insertBefore": 7,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 1,
}
`);
    });
  });
});

test(`#94`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(2, 4, 5);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  2
  4
  5
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 5,
  "insertBefore": 6,
  "nodeValue": 0,
  "removeChild": 2,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#95`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4, 5);
      const v2 = k(6, 7, 8, 9, 10, 11);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  6
  7
  8
  9
  10
  11
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 12,
  "insertBefore": 13,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 1,
}
`);
    });
  });
});

test(`#96`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4, 5);
      const v2 = k(6, 1, 7, 3, 4, 8);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  6
  1
  7
  3
  4
  8
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 9,
  "insertBefore": 10,
  "nodeValue": 0,
  "removeChild": 3,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#97`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4, 5);
      const v2 = k(6, 7, 3, 8);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  6
  7
  3
  8
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 9,
  "insertBefore": 10,
  "nodeValue": 0,
  "removeChild": 5,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#98`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(3, 2, 1);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  3
  2
  1
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
  "insertBefore": 6,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#99`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2);
      const v2 = k(2, 1, 3);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  2
  1
  3
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
  "insertBefore": 6,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#100`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(1, 2, 0);
      const v2 = k(2, 1, 3);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  2
  1
  3
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
  "insertBefore": 6,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#101`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(1, 2, 0);
      const v2 = k(3, 2, 1);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  3
  2
  1
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
  "insertBefore": 6,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#102`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4, 5);
      const v2 = k(6, 1, 3, 2, 4, 7);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  6
  1
  3
  2
  4
  7
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 8,
  "insertBefore": 10,
  "nodeValue": 0,
  "removeChild": 2,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#103`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4, 5);
      const v2 = k(6, 1, 7, 3, 2, 4);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  6
  1
  7
  3
  2
  4
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 8,
  "insertBefore": 10,
  "nodeValue": 0,
  "removeChild": 2,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#104`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3, 4, 5);
      const v2 = k(6, 7, 3, 2, 4);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  6
  7
  3
  2
  4
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 8,
  "insertBefore": 10,
  "nodeValue": 0,
  "removeChild": 3,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`#105`, () => {
  testRenderDOM(r => {
    checkDOMOps(c => {
      const v1 = k(0, 2, 3, 4, 5);
      const v2 = k(6, 1, 7, 3, 2, 4);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  6
  1
  7
  3
  2
  4
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 8,
  "insertBefore": 10,
  "nodeValue": 0,
  "removeChild": 2,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

describe(`Components`, () => {
  test(`move component nodes`, () => {
    testRenderDOM(r => {
      checkDOMOps(c => {
        const v1 = h.div(
          _,
          _,
          TrackByKey([key(0, Stateless(h.h1())), key(1, Stateless(h.h2()))])
        );
        const v2 = h.div(
          _,
          _,
          TrackByKey([key(1, Stateless(h.h2())), key(0, Stateless(h.h1()))])
        );

        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  <h2 />
  <h1 />
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 3,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 4,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`move static component nodes`, () => {
    testRenderDOM(r => {
      checkDOMOps(c => {
        const v1 = h.div(
          _,
          _,
          TrackByKey([key(0, Static(h.h1())), key(1, Static(h.h2()))])
        );
        const v2 = h.div(
          _,
          _,
          TrackByKey([key(1, Static(h.h2())), key(0, Static(h.h1()))])
        );

        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  <h2 />
  <h1 />
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 3,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 4,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`move static component node with null root`, () => {
    testRenderDOM(r => {
      checkDOMOps(c => {
        const v1 = h.div(
          _,
          _,
          TrackByKey([key(0, Static(h.h1())), key(1, Static(null))])
        );
        const v2 = h.div(
          _,
          _,
          TrackByKey([key(1, Static(null)), key(0, Static(h.h1()))])
        );

        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  <h1 />
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 0,
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

  test(`move static component nodes with nested components`, () => {
    testRenderDOM(r => {
      checkDOMOps(c => {
        const v1 = h.div(
          _,
          _,
          TrackByKey([
            key(0, Stateless(Static(h.div(_, _, Stateful(0))))),
            key(1, Stateless(Static(h.div(_, _, Stateful(1)))))
          ])
        );
        const v2 = h.div(
          _,
          _,
          TrackByKey([
            key(1, Stateless(Static(h.div(_, _, Stateful(1))))),
            key(0, Stateless(Static(h.div(_, _, Stateful(0)))))
          ])
        );

        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  <div>
    1
  </div>
  <div>
    0
  </div>
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 3,
  "createElementNS": 0,
  "createTextNode": 2,
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

  test(`move fragments`, () => {
    testRenderDOM(r => {
      checkDOMOps(c => {
        const v1 = h.div(_, _, TrackByKey([key(0, [1, 2]), key(1, [3, 4])]));
        const v2 = h.div(_, _, TrackByKey([key(1, [3, 4]), key(0, [1, 2])]));

        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  3
  4
  1
  2
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
  "insertBefore": 7,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`move fragments wrapped into static components`, () => {
    testRenderDOM(r => {
      checkDOMOps(c => {
        const v1 = h.div(
          _,
          _,
          TrackByKey([key(0, Static([1, 2])), key(1, Static([3, 4]))])
        );
        const v2 = h.div(
          _,
          _,
          TrackByKey([key(1, Static([3, 4])), key(0, Static([1, 2]))])
        );

        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  3
  4
  1
  2
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
  "insertBefore": 7,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`move TrackByKey nodes`, () => {
    testRenderDOM(r => {
      checkDOMOps(c => {
        const v1 = h.div(
          _,
          _,
          TrackByKey([
            key(0, TrackByKey([key(0, 0), key(1, 1)])),
            key(1, TrackByKey([key(0, 3), key(1, 4)]))
          ])
        );
        const v2 = h.div(
          _,
          _,
          TrackByKey([
            key(1, TrackByKey([key(1, 4), key(0, 3)])),
            key(0, TrackByKey([key(1, 1), key(0, 0)]))
          ])
        );

        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`
<div>
  4
  3
  1
  0
</div>
`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 4,
  "insertBefore": 8,
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
