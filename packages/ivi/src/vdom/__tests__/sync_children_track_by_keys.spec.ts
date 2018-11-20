import { _, TrackByKey, key } from "ivi";
import * as h from "ivi-html";
import { startRender, checkDOMOps } from "./utils";
import {} from "../operations";

const i = (n: number) => key(n, n);
const k = (...is: number[]) => h.div(_, _, TrackByKey(is.map(i)));

test(`#1`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#2`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#3`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#4`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`0 => 0 1 2`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#6`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`0 => 1 0`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#8`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#9`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#10`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#13`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#14`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#16`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#17`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#18`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#19`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#20`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#21`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#22`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#23`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#24`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#25`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#26`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#27`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#34`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#35`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#36`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#37`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#38`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#39`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#43`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#44`, () => {
  startRender(r => {
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
  "removeChild": 2,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#45`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#46`, () => {
  startRender(r => {
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
  "removeChild": 2,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#47`, () => {
  startRender(r => {
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
  "removeChild": 2,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#48`, () => {
  startRender(r => {
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
  "removeChild": 2,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#49`, () => {
  startRender(r => {
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
  "removeChild": 2,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#51`, () => {
  startRender(r => {
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
  "removeChild": 2,
  "replaceChild": 0,
}
`);
    });
  });
});

// moves
test(`#57`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#58`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#59`, () => {
  startRender(r => {
    checkDOMOps(c => {
      const v1 = k(0, 1, 2, 3);
      const v2 = k(0, 2, 3, 0);

      r(v1);
      const n = r(v2);

      expect(n).toMatchInlineSnapshot(`
<div>
  0
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
  "createTextNode": 5,
  "insertBefore": 6,
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#60`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#61`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#62`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#63`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#64`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#66`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#67`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#68`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#69`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#70`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#71`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#72`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#73`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#74`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#75`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#76`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#77`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#78`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#79`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#80`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#81`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#82`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#83`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#84`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#85`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#86`, () => {
  startRender(r => {
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
  "removeChild": 2,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#87`, () => {
  startRender(r => {
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
  "removeChild": 3,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#88`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#89`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#90`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#91`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#92`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#93`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#94`, () => {
  startRender(r => {
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
  "removeChild": 2,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#95`, () => {
  startRender(r => {
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
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#96`, () => {
  startRender(r => {
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
  "removeChild": 3,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#97`, () => {
  startRender(r => {
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
  "removeChild": 5,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#98`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#99`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#100`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#101`, () => {
  startRender(r => {
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
  "removeChild": 1,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#102`, () => {
  startRender(r => {
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
  "removeChild": 2,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#103`, () => {
  startRender(r => {
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
  "removeChild": 2,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#104`, () => {
  startRender(r => {
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
  "removeChild": 3,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`#105`, () => {
  startRender(r => {
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
  "removeChild": 2,
  "replaceChild": 0,
}
`);
    });
  });
});
