/**
 * useDOMElement creates a DOM element and attaches to the document body.
 *
 * @example
 *
 *     const container = useDOMElement();
 *     test(() => {
 *       expect(container().tagName).toBe("div");
 *     });
 *
 * @param tagName DOM Element tag name.
 * @returns DOM Element getter function.
 */
export function useDOMElement(tagName: string = "div") {
  let el: HTMLElement;
  beforeEach(() => {
    el = document.createElement(tagName);
    document.body.appendChild(el);
  });
  afterEach(() => {
    document.body.removeChild(el);
  });

  return () => el;
}
