import { $c, $h } from "../src/vdom/vnode_builder";
import { frag, render, LifecycleCounter, LifecycleMonitor, LifecycleTestComponent, StaticComponentTest } from "./utils";

const expect = chai.expect;

describe("lifecycle", () => {
    it("<C><div></C>", () => {
        const c = new LifecycleCounter();
        const m = new LifecycleMonitor(c);

        render<HTMLElement>($c(LifecycleTestComponent, {
            child: $h("div"),
            monitor: m,
        }));

        expect(m.construct).to.equal(0);
        expect(m.updateContext).to.equal(1);
        expect(m.render).to.equal(2);
        expect(m.didMount).to.equal(3);

        expect(m.isPropsChanged).to.equal(-1);
        expect(m.didReceiveNewProps).to.equal(-1);
        expect(m.didReceiveNewContext).to.equal(-1);
        expect(m.didUnmount).to.equal(-1);
        expect(m.willUpdate).to.equal(-1);
        expect(m.didUpdate).to.equal(-1);
        expect(m.didInvalidate).to.equal(-1);
    });

    it("<C><div></C> => <div>", () => {
        const f = frag();
        const c = new LifecycleCounter();
        const m = new LifecycleMonitor(c);

        render<HTMLElement>($c(LifecycleTestComponent, {
            child: $h("div"),
            monitor: m,
        }), f);
        render<HTMLElement>($h("div"), f);

        expect(m.construct).to.equal(0);
        expect(m.updateContext).to.equal(1);
        expect(m.render).to.equal(2);
        expect(m.didMount).to.equal(3);
        expect(m.didUnmount).to.equal(4);

        expect(m.isPropsChanged).to.equal(-1);
        expect(m.didReceiveNewProps).to.equal(-1);
        expect(m.didReceiveNewContext).to.equal(-1);
        expect(m.willUpdate).to.equal(-1);
        expect(m.didUpdate).to.equal(-1);
        expect(m.didInvalidate).to.equal(-1);
    });

    it("<div> => <C><div></C>", () => {
        const f = frag();
        const c = new LifecycleCounter();
        const m = new LifecycleMonitor(c);

        render<HTMLElement>($h("div"), f);
        render<HTMLElement>($c(LifecycleTestComponent, {
            child: $h("div"),
            monitor: m,
        }), f);

        expect(m.construct).to.equal(0);
        expect(m.updateContext).to.equal(1);
        expect(m.render).to.equal(2);
        expect(m.didMount).to.equal(3);

        expect(m.isPropsChanged).to.equal(-1);
        expect(m.didReceiveNewProps).to.equal(-1);
        expect(m.didReceiveNewContext).to.equal(-1);
        expect(m.didUnmount).to.equal(-1);
        expect(m.willUpdate).to.equal(-1);
        expect(m.didUpdate).to.equal(-1);
        expect(m.didInvalidate).to.equal(-1);
    });

    it("<C><C><div></C></C>", () => {
        const c = new LifecycleCounter();
        const m1 = new LifecycleMonitor(c);
        const m2 = new LifecycleMonitor(c);

        render<HTMLElement>($c(LifecycleTestComponent, {
            child: $c(LifecycleTestComponent, {
                child: $h("div"),
                monitor: m2,
            }),
            monitor: m1,
        }));

        expect(m1.construct).to.equal(0);
        expect(m1.updateContext).to.equal(1);
        expect(m1.render).to.equal(2);
        expect(m1.didMount).to.equal(6);

        expect(m2.construct).to.equal(3);
        expect(m2.updateContext).to.equal(4);
        expect(m2.render).to.equal(5);
        expect(m2.didMount).to.equal(7);

        expect(m1.isPropsChanged).to.equal(-1);
        expect(m1.didReceiveNewProps).to.equal(-1);
        expect(m1.didReceiveNewContext).to.equal(-1);
        expect(m1.didUnmount).to.equal(-1);
        expect(m1.willUpdate).to.equal(-1);
        expect(m1.didUpdate).to.equal(-1);
        expect(m1.didInvalidate).to.equal(-1);

        expect(m2.isPropsChanged).to.equal(-1);
        expect(m2.didReceiveNewProps).to.equal(-1);
        expect(m2.didReceiveNewContext).to.equal(-1);
        expect(m2.didUnmount).to.equal(-1);
        expect(m2.willUpdate).to.equal(-1);
        expect(m2.didUpdate).to.equal(-1);
        expect(m2.didInvalidate).to.equal(-1);
    });

    it("<C><C><div></C></C> => <div>", () => {
        const f = frag();
        const c = new LifecycleCounter();
        const m1 = new LifecycleMonitor(c);
        const m2 = new LifecycleMonitor(c);

        render<HTMLElement>($c(LifecycleTestComponent, {
            child: $c(LifecycleTestComponent, {
                child: $h("div"),
                monitor: m2,
            }),
            monitor: m1,
        }), f);
        render<HTMLElement>($h("div"), f);

        expect(m1.construct).to.equal(0);
        expect(m1.updateContext).to.equal(1);
        expect(m1.render).to.equal(2);
        expect(m1.didMount).to.equal(6);
        expect(m1.didUnmount).to.equal(9);

        expect(m2.construct).to.equal(3);
        expect(m2.updateContext).to.equal(4);
        expect(m2.render).to.equal(5);
        expect(m2.didMount).to.equal(7);
        expect(m2.didUnmount).to.equal(8);

        expect(m1.isPropsChanged).to.equal(-1);
        expect(m1.didReceiveNewProps).to.equal(-1);
        expect(m1.didReceiveNewContext).to.equal(-1);
        expect(m1.willUpdate).to.equal(-1);
        expect(m1.didUpdate).to.equal(-1);
        expect(m1.didInvalidate).to.equal(-1);

        expect(m2.isPropsChanged).to.equal(-1);
        expect(m2.didReceiveNewProps).to.equal(-1);
        expect(m2.didReceiveNewContext).to.equal(-1);
        expect(m2.willUpdate).to.equal(-1);
        expect(m2.didUpdate).to.equal(-1);
        expect(m2.didInvalidate).to.equal(-1);
    });

    it("<C><div></C> => <C><div></C>", () => {
        const f = frag();
        const c = new LifecycleCounter();
        const m = new LifecycleMonitor(c);

        render<HTMLElement>($c(LifecycleTestComponent, {
            child: $h("div"),
            monitor: m,
        }), f);

        render<HTMLElement>($c(LifecycleTestComponent, {
            child: $h("div"),
            monitor: m,
        }), f);

        expect(m.construct).to.equal(0);
        // updateContext is executed twice becasue LifecycleTestComponent is accessing `props` in updateContext.
        expect(m.updateContext).to.equal(6);
        expect(m.render).to.equal(8);
        expect(m.didMount).to.equal(3);
        expect(m.isPropsChanged).to.equal(4);
        expect(m.didReceiveNewProps).to.equal(5);
        expect(m.willUpdate).to.equal(7);
        expect(m.didUpdate).to.equal(9);

        expect(m.didReceiveNewContext).to.equal(-1);
        expect(m.didUnmount).to.equal(-1);
        expect(m.didInvalidate).to.equal(-1);
    });

    it("<S><C><div></C></S> => <S><C><div></C></S>", () => {
        const f = frag();
        const c = new LifecycleCounter();
        const m = new LifecycleMonitor(c);

        render<HTMLElement>($c(StaticComponentTest, $c(LifecycleTestComponent, {
            child: $h("div"),
            monitor: m,
        })), f);
        render<HTMLElement>($c(StaticComponentTest, $c(LifecycleTestComponent, {
            child: $h("div"),
            monitor: m,
        })), f);

        expect(m.construct).to.equal(0);
        expect(m.updateContext).to.equal(1);
        expect(m.render).to.equal(2);
        expect(m.didMount).to.equal(3);

        expect(m.isPropsChanged).to.equal(-1);
        expect(m.didReceiveNewProps).to.equal(-1);
        expect(m.didReceiveNewContext).to.equal(-1);
        expect(m.willUpdate).to.equal(-1);
        expect(m.didUpdate).to.equal(-1);
        expect(m.didUnmount).to.equal(-1);
        expect(m.didInvalidate).to.equal(-1);
    });
});
