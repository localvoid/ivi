import { render } from "./utils";
import * as h from "./utils/html";
import { Component } from "../src/vdom/component";
import { statelessComponent, component } from "../src/vdom/vnode_factories";
import { VNode } from "../src/vdom/vnode";

const Stateless = statelessComponent<VNode>(
  (child) => child,
);

const Stateful = component(class extends Component<VNode> {
  render() {
    return this.props;
  }
});

test(`<Stateless><div></div></Stateless>`, () => {
  const v = Stateless(
    h.div(),
  );
  const n = render<HTMLElement>(v);

  expect(n.tagName.toLowerCase()).toBe("div");
});

test("<Stateless><Stateless><div></div></Stateless></Stateless>", () => {
  const v = Stateless(
    Stateless(
      h.div(),
    ),
  );
  const n = render<HTMLElement>(v);

  expect(n.tagName.toLowerCase()).toBe("div");
});

test(`<Stateful><div></div></Stateful>`, () => {
  const v = Stateful(
    h.div(),
  );
  const n = render<HTMLElement>(v);

  expect(n.tagName.toLowerCase()).toBe("div");
});

test(`<Stateful><Stateful><div></div></Stateful></Stateful>`, () => {
  const v = Stateful(
    Stateful(
      h.div(),
    ),
  );
  const n = render<HTMLElement>(v);

  expect(n.tagName.toLowerCase()).toBe("div");
});

test("<Stateless><Stateful><div></div></Stateful></Stateless>", () => {
  const v = Stateless(
    Stateful(
      h.div(),
    ),
  );
  const n = render<HTMLElement>(v);

  expect(n.tagName.toLowerCase()).toBe("div");
});

test("<Stateful><Stateless><div></div></Stateless></Stateful>", () => {
  const v = Stateful(
    Stateless(
      h.div(),
    ),
  );
  const n = render<HTMLElement>(v);

  expect(n.tagName.toLowerCase()).toBe("div");
});
