import {
  Component, VNode, statelessComponent, component, getComponentInstanceFromVNode, isComponentAttached,
} from "ivi";
import * as h from "ivi-html";
import { startRender } from "./utils";

const Stateless = statelessComponent<VNode>(
  (child) => child,
);

const Stateful = component(class extends Component<VNode> {
  render() {
    return this.props;
  }
});

test(`<Stateless><div></div></Stateless>`, () => {
  startRender<HTMLElement>((r) => {
    const v = Stateless(
      h.div(),
    );
    const n = r(v);

    expect(n.tagName.toLowerCase()).toBe("div");
  });
});

test(`<Stateless><Stateless><div></div></Stateless></Stateless>`, () => {
  startRender<HTMLElement>((r) => {
    const v = Stateless(
      Stateless(
        h.div(),
      ),
    );
    const n = r(v);

    expect(n.tagName.toLowerCase()).toBe("div");
  });
});

test(`<Stateful><div></div></Stateful>`, () => {
  startRender<HTMLElement>((r) => {
    const v = Stateful(
      h.div(),
    );
    const n = r(v);

    expect(n.tagName.toLowerCase()).toBe("div");
  });
});

test(`<Stateful><Stateful><div></div></Stateful></Stateful>`, () => {
  startRender<HTMLElement>((r) => {
    const v = Stateful(
      Stateful(
        h.div(),
      ),
    );
    const n = r(v);

    expect(n.tagName.toLowerCase()).toBe("div");
  });
});

test(`<Stateless><Stateful><div></div></Stateful></Stateless>`, () => {
  startRender<HTMLElement>((r) => {
    const v = Stateless(
      Stateful(
        h.div(),
      ),
    );
    const n = r(v);

    expect(n.tagName.toLowerCase()).toBe("div");
  });
});

test(`<Stateful><Stateless><div></div></Stateless></Stateful>`, () => {
  startRender<HTMLElement>((r) => {
    const v = Stateful(
      Stateless(
        h.div(),
      ),
    );
    const n = r(v);

    expect(n.tagName.toLowerCase()).toBe("div");
  });
});

test(`stateful component should be in attached state when it is rendered into the document`, () => {
  startRender<HTMLElement>((r) => {
    const v = Stateful(
      h.div(),
    );
    r(v);
    const c = getComponentInstanceFromVNode(v);

    expect(isComponentAttached(c!)).toBeTruthy();
  });
});

test(`stateful component should be in detached state when it is removed from the document`, () => {
  startRender<HTMLElement>((r) => {
    const v = Stateful(
      h.div(),
    );
    r(v);
    r(h.div());
    const c = getComponentInstanceFromVNode(v);

    expect(isComponentAttached(c!)).toBeFalsy();
  });
});
