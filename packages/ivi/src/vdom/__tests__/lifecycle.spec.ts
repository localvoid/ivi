import { Component, VNode, statelessComponent, withShouldUpdate, statefulComponent } from "ivi";
import * as h from "ivi-html";
import { startRender, checkLifecycle, lifecycleTouch } from "./utils";

const Static = withShouldUpdate(
  () => false,
  statelessComponent<VNode>((child) => child),
);

interface ComponentHooks<P> {
  construct?: (
    this: Component<P>,
    props: P,
  ) => void;
  shouldUpdate?: (
    this: Component<P>,
    oldProps: P,
    newProps: P,
  ) => boolean;
  propsChanged?: (
    this: Component<P>,
    oldProps: P,
    newProps: P,
  ) => void;
  attached?: (this: Component<P>) => void;
  detached?: (this: Component<P>) => void;
  updated?: (this: Component<P>) => void;
  invalidated?: (this: Component<P>) => void;
  render?: (this: Component<P>) => VNode;
}

interface LifecycleTesterProps {
  id: string;
  child: VNode;
  hooks: ComponentHooks<LifecycleTesterProps>;
}

const LifecycleTester = statefulComponent(class extends Component<LifecycleTesterProps> {
  constructor(props: LifecycleTesterProps) {
    super(props);
    lifecycleTouch(props.id, "constructor");
    if (props.hooks.construct) {
      props.hooks.construct.call(this, props);
    }
  }

  shouldUpdate(oldProps: LifecycleTesterProps, newProps: LifecycleTesterProps): boolean {
    lifecycleTouch(newProps.id, "shouldUpdate");
    if (newProps.hooks.shouldUpdate) {
      return newProps.hooks.shouldUpdate.call(this, oldProps, newProps);
    }
    return true;
  }

  propsChanged(oldProps: LifecycleTesterProps, newProps: LifecycleTesterProps): void {
    lifecycleTouch(newProps.id, "propsChanged");
    if (newProps.hooks.propsChanged) {
      newProps.hooks.propsChanged.call(this, oldProps, newProps);
    }
  }

  attached(): void {
    lifecycleTouch(this.props.id, "attached");
    if (this.props.hooks.attached) {
      this.props.hooks.attached.call(this);
    }
  }

  detached(): void {
    lifecycleTouch(this.props.id, "detached");
    if (this.props.hooks.detached) {
      this.props.hooks.detached.call(this);
    }
  }

  updated(): void {
    lifecycleTouch(this.props.id, "updated");
    if (this.props.hooks.updated) {
      this.props.hooks.updated.call(this);
    }
  }

  invalidated(): void {
    lifecycleTouch(this.props.id, "invalidated");
    if (this.props.hooks.invalidated) {
      this.props.hooks.invalidated.call(this);
    }
  }

  render() {
    lifecycleTouch(this.props.id, "render");
    if (this.props.hooks.render) {
      return this.props.hooks.render.call(this);
    }
    return this.props.child;
  }
});

function Lifecycle(
  id: string,
  hooks?: ComponentHooks<LifecycleTesterProps>,
): VNode<LifecycleTesterProps>;
function Lifecycle(
  id: string,
  child?: VNode,
): VNode<LifecycleTesterProps>;
function Lifecycle(
  id: string,
  hooks: ComponentHooks<LifecycleTesterProps>,
  child?: VNode,
): VNode<LifecycleTesterProps>;
function Lifecycle(
  id: string,
  p1?: ComponentHooks<LifecycleTesterProps> | VNode,
  p2?: VNode,
): VNode<LifecycleTesterProps> {
  if (arguments.length === 3) {
    return LifecycleTester({
      id: id,
      child: p2 as VNode,
      hooks: p1 as ComponentHooks<LifecycleTesterProps>,
    });
  } else if (arguments.length === 2) {
    if (p1!.constructor === VNode) {
      return LifecycleTester({
        id: id,
        child: p1 as VNode,
        hooks: {},
      });
    }
    return LifecycleTester({
      id: id,
      child: h.t(""),
      hooks: p1 as ComponentHooks<LifecycleTesterProps>,
    });
  }
  return LifecycleTester({
    id: id,
    child: h.t(""),
    hooks: {},
  });
}

test(`<C><div></C>`, () => {
  startRender((render) => {
    checkLifecycle((c) => {
      render(Lifecycle("1", h.div()));

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("1", "attached")).toBe(2);

      expect(c("1", "propsChanged")).toBe(-1);
      expect(c("1", "shouldUpdate")).toBe(-1);
      expect(c("1", "detached")).toBe(-1);
      expect(c("1", "updated")).toBe(-1);
      expect(c("1", "invalidated")).toBe(-1);
      expect(c("1", "shouldAugment")).toBe(-1);
    });
  });
});

test(`<C><div></C> => <div>`, () => {
  startRender((render) => {
    checkLifecycle((c) => {
      render(Lifecycle("1", h.div()));
      render(h.div());

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("1", "attached")).toBe(2);
      expect(c("1", "detached")).toBe(3);

      expect(c("1", "propsChanged")).toBe(-1);
      expect(c("1", "shouldUpdate")).toBe(-1);
      expect(c("1", "updated")).toBe(-1);
      expect(c("1", "invalidated")).toBe(-1);
      expect(c("1", "shouldAugment")).toBe(-1);
    });
  });
});

test(`<div> => <C><div></C>`, () => {
  startRender((render) => {
    checkLifecycle((c) => {
      render(h.div());
      render(Lifecycle("1", h.div()));

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("1", "attached")).toBe(2);

      expect(c("1", "propsChanged")).toBe(-1);
      expect(c("1", "shouldUpdate")).toBe(-1);
      expect(c("1", "detached")).toBe(-1);
      expect(c("1", "updated")).toBe(-1);
      expect(c("1", "invalidated")).toBe(-1);
      expect(c("1", "shouldAugment")).toBe(-1);
    });
  });
});

test(`<div></div> => <div><C><div></C></div>`, () => {
  startRender((render) => {
    checkLifecycle((c) => {
      render(h.div());
      render(h.div().c(Lifecycle("1", h.div())));

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("1", "attached")).toBe(2);

      expect(c("1", "propsChanged")).toBe(-1);
      expect(c("1", "shouldUpdate")).toBe(-1);
      expect(c("1", "detached")).toBe(-1);
      expect(c("1", "updated")).toBe(-1);
      expect(c("1", "invalidated")).toBe(-1);
      expect(c("1", "shouldAugment")).toBe(-1);
    });
  });
});

test(`<div><C><div></C></div> => <div></div>`, () => {
  startRender((render) => {
    checkLifecycle((c) => {
      render(h.div().c(Lifecycle("1", h.div())));
      render(h.div());

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("1", "attached")).toBe(2);
      expect(c("1", "detached")).toBe(3);

      expect(c("1", "propsChanged")).toBe(-1);
      expect(c("1", "shouldUpdate")).toBe(-1);
      expect(c("1", "updated")).toBe(-1);
      expect(c("1", "invalidated")).toBe(-1);
      expect(c("1", "shouldAugment")).toBe(-1);
    });
  });
});

test(`<C><C><div></C></C>`, () => {
  startRender((render) => {
    checkLifecycle((c) => {
      render(Lifecycle("1", Lifecycle("2", h.div())));

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("2", "constructor")).toBe(2);
      expect(c("2", "render")).toBe(3);
      expect(c("1", "attached")).toBe(4);
      expect(c("2", "attached")).toBe(5);

      expect(c("1", "propsChanged")).toBe(-1);
      expect(c("1", "shouldUpdate")).toBe(-1);
      expect(c("1", "detached")).toBe(-1);
      expect(c("1", "updated")).toBe(-1);
      expect(c("1", "invalidated")).toBe(-1);
      expect(c("1", "shouldAugment")).toBe(-1);

      expect(c("2", "shouldUpdate")).toBe(-1);
      expect(c("2", "propsChanged")).toBe(-1);
      expect(c("2", "detached")).toBe(-1);
      expect(c("2", "updated")).toBe(-1);
      expect(c("2", "invalidated")).toBe(-1);
      expect(c("2", "shouldAugment")).toBe(-1);
    });
  });
});

test(`<C><C><div></C></C> => <div>`, () => {
  startRender((render) => {
    checkLifecycle((c) => {
      render(Lifecycle("1", Lifecycle("2", h.div())));
      render(h.div());

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("2", "constructor")).toBe(2);
      expect(c("2", "render")).toBe(3);
      expect(c("1", "attached")).toBe(4);
      expect(c("2", "attached")).toBe(5);
      expect(c("2", "detached")).toBe(6);
      expect(c("1", "detached")).toBe(7);

      expect(c("1", "propsChanged")).toBe(-1);
      expect(c("1", "shouldUpdate")).toBe(-1);
      expect(c("1", "updated")).toBe(-1);
      expect(c("1", "invalidated")).toBe(-1);
      expect(c("1", "shouldAugment")).toBe(-1);

      expect(c("2", "propsChanged")).toBe(-1);
      expect(c("2", "shouldUpdate")).toBe(-1);
      expect(c("2", "updated")).toBe(-1);
      expect(c("2", "invalidated")).toBe(-1);
      expect(c("2", "shouldAugment")).toBe(-1);
    });
  });
});

test(`<C><div></C> => <C><div></C>`, () => {
  startRender((render) => {
    checkLifecycle((c) => {
      render(Lifecycle("1", h.div()));
      render(Lifecycle("1", h.div()));

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "attached")).toBe(2);
      expect(c("1", "propsChanged")).toBe(3);
      expect(c("1", "shouldUpdate")).toBe(4);
      expect(c("1", "render")).toBe(5); // 1
      expect(c("1", "updated")).toBe(6);

      expect(c("1", "render", false)).toBe(1);

      expect(c("1", "detached")).toBe(-1);
      expect(c("1", "invalidated")).toBe(-1);
      expect(c("1", "shouldAugment")).toBe(-1);
    });
  });
});

test(`<S><C><div></C></S> => <S><C><div></C></S>`, () => {
  startRender((render) => {
    checkLifecycle((c) => {
      render(Static(Lifecycle("1", h.div())));
      render(Static(Lifecycle("1", h.div())));

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("1", "attached")).toBe(2);

      expect(c("1", "updated")).toBe(-1);

      expect(c("1", "propsChanged")).toBe(-1);
      expect(c("1", "shouldUpdate")).toBe(-1);

      expect(c("1", "detached")).toBe(-1);
      expect(c("1", "invalidated")).toBe(-1);
      expect(c("1", "shouldAugment")).toBe(-1);
    });
  });
});
