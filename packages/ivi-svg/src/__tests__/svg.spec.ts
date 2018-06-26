import { VNode, VNodeFlags } from "ivi";
import * as s from "ivi-svg";

const ELEMENTS: { [name: string]: (className?: string, attrs?: {}, style?: {}) => VNode<any> } = {
  "a": s.a,
  "animate": s.animate,
  "animateColor": s.animateColor,
  "animateMotion": s.animateMotion,
  "animateTransform": s.animateTransform,
  "circle": s.circle,
  "clipPath": s.clipPath,
  "defs": s.defs,
  "desc": s.desc,
  "discard": s.discard,
  "ellipse": s.ellipse,
  "feBlend": s.feBlend,
  "feColorMatrix": s.feColorMatrix,
  "feComponentTransfer": s.feComponentTransfer,
  "feComposite": s.feComposite,
  "feConvolveMatrix": s.feConvolveMatrix,
  "feDiffuseLighting": s.feDiffuseLighting,
  "feDisplacementMap": s.feDisplacementMap,
  "feDistantLight": s.feDistantLight,
  "feDropShadow": s.feDropShadow,
  "feFlood": s.feFlood,
  "feFuncA": s.feFuncA,
  "feFuncB": s.feFuncB,
  "feFuncG": s.feFuncG,
  "feFuncR": s.feFuncR,
  "feGaussianBlur": s.feGaussianBlur,
  "feImage": s.feImage,
  "feMerge": s.feMerge,
  "feMergeNode": s.feMergeNode,
  "feMorphology": s.feMorphology,
  "feOffset": s.feOffset,
  "fePointLight": s.fePointLight,
  "feSpecularLighting": s.feSpecularLighting,
  "feSpotLight": s.feSpotLight,
  "feTile": s.feTile,
  "feTurbulence": s.feTurbulence,
  "filter": s.filter,
  "foreignObject": s.foreignObject,
  "g": s.g,
  "hatch": s.hatch,
  "hatchpath": s.hatchpath,
  "image": s.image,
  "line": s.line,
  "linearGradient": s.linearGradient,
  "marker": s.marker,
  "mask": s.mask,
  "mesh": s.mesh,
  "meshgradient": s.meshgradient,
  "meshpatch": s.meshpatch,
  "meshrow": s.meshrow,
  "metadata": s.metadata,
  "mpath": s.mpath,
  "path": s.path,
  "pattern": s.pattern,
  "polygon": s.polygon,
  "polyline": s.polyline,
  "radialGradient": s.radialGradient,
  "rect": s.rect,
  "set": s.set,
  "solidcolor": s.solidcolor,
  "stop": s.stop,
  "svg": s.svg,
  "symbol": s.symbol,
  "text": s.text,
  "textPath": s.textPath,
  "title": s.title,
  "tspan": s.tspan,
  "use": s.use,
  "view": s.view,
};

describe("SVG Elements", () => {
  describe("tag name", () => {
    for (const name of Object.keys(ELEMENTS)) {
      const factory = ELEMENTS[name];
      test(`${name}`, () => {
        const n = factory();
        expect(n._t).toBe(name);
      });
    }
  });

  describe("class name", () => {
    for (const name of Object.keys(ELEMENTS)) {
      const factory = ELEMENTS[name];
      test(`${name}`, () => {
        const n = factory("abc");
        expect(n._cs).toBe("abc");
      });
    }
  });

  describe("attributes", () => {
    for (const name of Object.keys(ELEMENTS)) {
      const factory = ELEMENTS[name];
      const ATTRS = {};
      test(`${name}`, () => {
        const n = factory("", ATTRS);
        expect(n._p).toBe(ATTRS);
      });
    }
  });

  describe("styles", () => {
    for (const name of Object.keys(ELEMENTS)) {
      const factory = ELEMENTS[name];
      const STYLES = {};
      test(`${name}`, () => {
        const n = factory("", void 0, STYLES);
        expect(n._s).toBe(STYLES);
      });
    }
  });

  describe("svg flag", () => {
    for (const name of Object.keys(ELEMENTS)) {
      const factory = ELEMENTS[name];
      test(`${name}`, () => {
        const n = factory();
        expect((n._f & VNodeFlags.SvgElement) !== 0).toBe(true);
      });
    }
  });

  test(`unique tag id`, () => {
    const index = new Map<number, string>();
    for (const name of Object.keys(ELEMENTS)) {
      const factory = ELEMENTS[name];
      const n = factory();
      const tagId = (n._f & VNodeFlags.ElementIdMask);
      expect(index.get(tagId)).toBeUndefined();
      index.set(tagId, n._t as string);
    }
  });
});
