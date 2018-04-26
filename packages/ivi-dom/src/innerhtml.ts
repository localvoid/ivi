import { Target, TARGET } from "ivi-vars";
import { FeatureFlags, FEATURES } from "ivi-core";
import { nodeInsertBefore } from "./shortcuts";

/**
 * setInnerHTML sets inner HTML for HTML and SVG elements.
 *
 * IE doesn't support native `innerHTML` on SVG elements.
 *
 * #quirks
 *
 * @param element DOM Element.
 * @param content Inner HTML content.
 * @param isSVG Element is SVG.
 */
export const setInnerHTML = (
  (TARGET & (Target.Cordova | Target.Electron | Target.Evergreen)) ||
  ((FEATURES & FeatureFlags.SVGInnerHTML) !== 0)
) ?
  function (element: Element, content: string, isSVG: boolean): void {
    element.innerHTML = content;
  } :
  function (element: Element, content: string, isSVG: boolean): void {
    // #msapp
    //
    // innerHTML should be invoked inside an unsafe context `MSApp.execUnsafeLocalFunction`
    // All details here: https://msdn.microsoft.com/en-us/library/windows/apps/hh767331.aspx

    // Doesn't work on SVG Elements in IE. Latest Edge versions are working fine.
    if (isSVG === false) {
      element.innerHTML = content;
    } else {
      setInnerSVG(element as SVGElement, content);
    }
  };

/**
 * Container for SVG Elements.
 *
 * #quirks
 */
let innerHTMLSVGContainer: HTMLDivElement | undefined;

/**
 * setInnerSVG sets innerHTML on SVG elements in browsers that doesn't support innerHTML on SVG elements.
 *
 * #quirks
 *
 * @param element SVG element.
 * @param content Inner HTML content.
 */
function setInnerSVG(element: SVGElement, content: string): void {
  if (innerHTMLSVGContainer === undefined) {
    innerHTMLSVGContainer = document.createElement("div");
  }
  element.textContent = "";
  innerHTMLSVGContainer.innerHTML = `<svg>${content}</svg>`;
  const svg = innerHTMLSVGContainer.firstChild;
  let c = svg!.firstChild;
  while (c !== null) {
    nodeInsertBefore(element, c, null);
    c = svg!.firstChild;
  }
}
