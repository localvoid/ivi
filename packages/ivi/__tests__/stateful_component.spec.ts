import { Component, statefulComponent } from "ivi";
import * as h from "ivi-html";
import { startRender } from "./utils";

abstract class DivComponent<T> extends Component<T> {
  render() {
    return h.div();
  }
}

test(`props should be passed to constructor`, () => {
  startRender((r) => {
    const c = statefulComponent(class extends DivComponent<number> {
      constructor(props: number) {
        expect(props).toBe(1337);
        super(props);
      }
    });
    r(c(1337));
  });
});

test(`props should be passed to newPropsReceived hook`, () => {
  startRender((r) => {
    const c = statefulComponent(class extends DivComponent<number> {
      newPropsReceived(a: number, b: number) {
        expect(a).toBe(1337);
        expect(b).toBe(1338);
      }
    });
    r(c(1337));
    r(c(1338));
  });
});

test(`props should be passed to shouldUpdate hook`, () => {
  startRender((r) => {
    const c = statefulComponent(class extends DivComponent<number> {
      shouldUpdate(a: number, b: number) {
        expect(a).toBe(1337);
        expect(b).toBe(1338);
        return true;
      }
    });
    r(c(1337));
    r(c(1338));
  });
});

test(`props should be available when attached hook is invoked`, () => {
  startRender((r) => {
    const c = statefulComponent(class extends DivComponent<number> {
      attached() {
        expect(this.props).toBe(1337);
      }
    });
    r(c(1337));
  });
});

test(`props should be available when detached hook is invoked`, () => {
  startRender((r) => {
    const c = statefulComponent(class extends DivComponent<number> {
      detached() {
        expect(this.props).toBe(1337);
      }
    });
    r(c(1337));
  });
});

test(`props should be available when updated hook is invoked`, () => {
  startRender((r) => {
    const c = statefulComponent(class extends DivComponent<number> {
      updated() {
        expect(this.props).toBe(1337);
      }
    });
    r(c(1337));
  });
});
