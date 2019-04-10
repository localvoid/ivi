describe(`sync element attributes`, () => {
  const _ = void 0;
  let ivi: typeof import("ivi");
  let h: typeof import("ivi-html");
  let s: typeof import("ivi-svg");
  let iviTest: typeof import("ivi-test");

  beforeEach(async () => {
    jest.resetModules();
    ivi = await import("ivi");
    h = await import("ivi-html");
    s = await import("ivi-svg");
    iviTest = await import("ivi-test");
  });

  test(`undefined => {}`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(h.div());
      const n = r(h.div(_, {}))!;

      expect(n.attributes).toMatchInlineSnapshot(`NamedNodeMap {}`);
    });
  });

  test(`{} => undefined`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(h.div(_, {}));
      const n = r(h.div())!;

      expect(n.attributes).toMatchInlineSnapshot(`NamedNodeMap {}`);
    });
  });

  test(`{} => {}`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(h.div(_, {}));
      const n = r(h.div(_, {}))!;

      expect(n.attributes).toMatchInlineSnapshot(`NamedNodeMap {}`);
    });
  });

  test(`undefined => { title: "1" }`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(h.div());
      const n = r(h.div(_, { title: "1" }))!;

      expect(n.attributes).toMatchInlineSnapshot(`
NamedNodeMap {
  "title": "1",
}
`);
    });
  });

  test(`{} => { title: "1" }`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(h.div(_, {}));
      const n = r(h.div(_, { title: "1" }))!;

      expect(n.attributes).toMatchInlineSnapshot(`
NamedNodeMap {
  "title": "1",
}
`);
    });
  });

  test(`{ title: "1" } => { title: "2" }`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(h.div(_, { title: "1" }));
      const n = r(h.div(_, { title: "2" }))!;

      expect(n.attributes).toMatchInlineSnapshot(`
NamedNodeMap {
  "title": "2",
}
`);
    });
  });

  test(`{ title: "1" } => { title: undefined }`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(h.div(_, { title: "1" }));
      const n = r(h.div(_, { title: undefined }))!;

      expect(n.attributes).toMatchInlineSnapshot(`NamedNodeMap {}`);
    });
  });

  test(`{ bool: false } => { bool: true }`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(h.div(_, { bool: false }));
      const n = r(h.div(_, { bool: true }))!;

      expect(n.attributes).toMatchInlineSnapshot(`
NamedNodeMap {
  "bool": "",
}
`);
    });
  });

  test(`{} => { title: "2", tabIndex: 2 }`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(h.div(_, {}));
      const n = r(
        h.div(_, {
          title: "2",
          tabIndex: 2
        })
      )!;

      expect(n.attributes).toMatchInlineSnapshot(`
NamedNodeMap {
  "tabindex": "2",
  "title": "2",
}
`);
    });
  });

  test(`{ title: "1" } => { title: "2", tabIndex: 2 }`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(
        h.div(_, {
          title: "1"
        })
      );
      const n = r(
        h.div(_, {
          title: "2",
          tabIndex: 2
        })
      )!;

      expect(n.attributes).toMatchInlineSnapshot(`
NamedNodeMap {
  "tabindex": "2",
  "title": "2",
}
`);
    });
  });

  test(`{ title: "1", tabIndex: 1 } => { title: "2", tabIndex: 2 }`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(
        h.div(_, {
          title: "1",
          tabIndex: 1
        })
      );
      const n = r(
        h.div(_, {
          title: "2",
          tabIndex: 2
        })
      )!;

      expect(n.attributes).toMatchInlineSnapshot(`
NamedNodeMap {
  "tabindex": "2",
  "title": "2",
}
`);
    });
  });

  test(`{ title: "1", tabIndex: 1 } => { title: "1", tabIndex: 1 }`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(
        h.div(_, {
          title: "1",
          tabIndex: 1
        })
      );
      const n = r(
        h.div(_, {
          title: "1",
          tabIndex: 1
        })
      )!;

      expect(n.attributes).toMatchInlineSnapshot(`
NamedNodeMap {
  "tabindex": "1",
  "title": "1",
}
`);
    });
  });

  test(`{ title: "1", tabIndex: 1 } => { title: "2" }`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(
        h.div(_, {
          title: "1",
          tabIndex: 1
        })
      );
      const n = r(
        h.div(_, {
          title: "2"
        })
      )!;

      expect(n.attributes).toMatchInlineSnapshot(`
NamedNodeMap {
  "title": "2",
}
`);
    });
  });

  test(`{ title: "1", tabIndex: 1 } => { title: "2", lang: "en" }`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(
        h.div(_, {
          title: "1",
          tabIndex: 1
        })
      );
      const n = r(
        h.div(_, {
          title: "2",
          lang: "en"
        })
      )!;

      expect(n.attributes).toMatchInlineSnapshot(`
NamedNodeMap {
  "lang": "en",
  "title": "2",
}
`);
    });
  });

  test(`{ title: "1", tabIndex: 1 } => { lang: "en" }`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(
        h.div(_, {
          title: "1",
          tabIndex: 1
        })
      );
      const n = r(
        h.div(_, {
          lang: "en"
        })
      )!;

      expect(n.attributes).toMatchInlineSnapshot(`
NamedNodeMap {
  "lang": "en",
}
`);
    });
  });

  test(`{ title: "1", tabIndex: 1 } => {}`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(
        h.div(_, {
          title: "1",
          tabIndex: 1
        })
      );
      const n = r(h.div(_, {}))!;

      expect(n.attributes).toMatchInlineSnapshot(`NamedNodeMap {}`);
    });
  });

  test(`{ title: "1", tabIndex: 1 } => undefined`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(
        h.div(_, {
          title: "1",
          tabIndex: 1
        })
      );
      const n = r(h.div())!;

      expect(n.attributes).toMatchInlineSnapshot(`NamedNodeMap {}`);
    });
  });

  test(`should throw error when transition from basic value to attribute directive`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(s.circle("", { "xml:text": "abc" }));
      expect(() => { r(s.circle("", { "xml:text": s.XML_ATTR("") })); }).toThrowError();
    });
  });

  test(`should throw error when transition from attribute directive to basic value`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      r(s.circle("", { "xml:text": s.XML_ATTR("") }));
      expect(() => { r(s.circle("", { "xml:text": "abc" })); }).toThrowError();
    });
  });

  describe(`svg`, () => {
    test(`{ "xml:text": "" } => { "xml:text": "" }`, () => {
      iviTest.testRenderDOM<HTMLElement>(r => {
        r(s.circle("", { "xml:text": s.XML_ATTR("") }));
        const n = r(s.circle("", { "xml:text": s.XML_ATTR("") }))!;

        expect(n.attributes).toHaveLength(1);
        expect(n.getAttributeNS(ivi.XML_NAMESPACE, "text")).toBe("");
      });
    });

    test(`{ "xlink:text": "" } => { "xlink:text": "" }`, () => {
      iviTest.testRenderDOM<HTMLElement>(r => {
        r(s.circle("", { "xlink:text": s.XLINK_ATTR("") }));
        const n = r(s.circle("", { "xlink:text": s.XLINK_ATTR("") }))!;

        expect(n.attributes).toHaveLength(1);
        expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "text")).toBe("");
      });
    });

    test(`{ "xml:text": "abc" } => { "xml:text": "abc" }`, () => {
      iviTest.testRenderDOM<HTMLElement>(r => {
        r(s.circle("", { "xml:text": s.XML_ATTR("abc") }));
        const n = r(s.circle("", { "xml:text": s.XML_ATTR("abc") }))!;

        expect(n.attributes).toHaveLength(1);
        expect(n.getAttributeNS(ivi.XML_NAMESPACE, "text")).toBe("abc");
      });
    });

    test(`{ "xml:text": "abc" } => { "xml:text": undefined }`, () => {
      iviTest.testRenderDOM<HTMLElement>(r => {
        r(s.circle("", { "xml:text": s.XML_ATTR("abc") }));
        const n = r(s.circle("", { "xml:text": void 0 }))!;

        expect(n.attributes).toHaveLength(0);
      });
    });
  });
});
