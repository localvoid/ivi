import * as h from "ivi-html";
import { query, queryAll, q } from "../src/query";
import { VNodeWrapper } from "../src/vdom";

describe("src/query.ts", () => {
  const tree = new VNodeWrapper(h.div().c(h.span(), h.span()), null, {});

  describe("one", () => {
    test("div", () => {
      const result = query(tree, q.div().match);
      expect(result).toBe(null);
    });

    test("span", () => {
      const result = query(tree, q.span().match);
      expect(result!.getTagName()).toBe("span");
    });
  });

  describe("many", () => {
    test("div", () => {
      const result = queryAll(tree, q.div().match);
      expect(result.length).toBe(0);
    });

    test("span", () => {
      const result = queryAll(tree, q.span().match);
      expect(result.length).toBe(2);
    });
  });
});
