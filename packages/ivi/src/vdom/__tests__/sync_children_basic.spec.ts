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
  "createTextNode": 2,
  "insertBefore": 3,
  "removeChild": 1,
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
  "createTextNode": 2,
  "insertBefore": 3,
  "removeChild": 1,
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

// test(`should throw error when children shape is different (different length)`, () => {
//   startRender(r => {
//     checkDOMOps(c => {
//       r(h.div(_, _, [h.div(), h.div()]));
//       expect(() => r(h.div(_, _, [h.div()]))).toThrowError("children");
//     });
//   });
// });

// test(`should throw error when children shape is different (different deep array length)`, () => {
//   startRender(r => {
//     checkDOMOps(c => {
//       r(h.div(_, _, [h.div(), [h.div()]]));
//       expect(() => r(h.div(_, _, [h.div(), [h.div(), h.div()]]))).toThrowError("children");
//     });
//   });
// });

// test(`should throw error when children shape is different (deep array to non-array)`, () => {
//   startRender(r => {
//     checkDOMOps(c => {
//       r(h.div(_, _, [h.div(), [h.div()]]));
//       expect(() => r(h.div(_, _, [h.div(), h.div()]))).toThrowError("children");
//     });
//   });
// });

// test(`should throw error when children shape is different (deep non-array to array)`, () => {
//   startRender(r => {
//     checkDOMOps(c => {
//       r(h.div(_, _, [h.div(), h.div()]));
//       expect(() => r(h.div(_, _, [h.div(), [h.div()]]))).toThrowError("children");
//     });
//   });
// });

// test(`should throw error when children shape is different (array to non-array)`, () => {
//   startRender(r => {
//     checkDOMOps(c => {
//       r(h.div(_, _, [h.div()]));
//       expect(() => r(h.div(_, _, h.div()))).toThrowError("children");
//     });
//   });
// });

// test(`should throw error when children shape is different (non-array to array)`, () => {
//   startRender(r => {
//     checkDOMOps(c => {
//       r(h.div(_, _, h.div()));
//       expect(() => r(h.div(_, _, [h.div()]))).toThrowError("children");
//     });
//   });
// });
