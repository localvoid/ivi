import { $c, $h } from "../src/vdom/vnode";
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
        expect(m.attached).to.equal(3);

        expect(m.isPropsChanged).to.equal(-1);
        expect(m.newPropsReceived).to.equal(-1);
        expect(m.newContextReceived).to.equal(-1);
        expect(m.detached).to.equal(-1);
        expect(m.beforeUpdate).to.equal(-1);
        expect(m.updated).to.equal(-1);
        expect(m.invalidated).to.equal(-1);
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
        expect(m.attached).to.equal(3);
        expect(m.detached).to.equal(4);

        expect(m.isPropsChanged).to.equal(-1);
        expect(m.newPropsReceived).to.equal(-1);
        expect(m.newContextReceived).to.equal(-1);
        expect(m.beforeUpdate).to.equal(-1);
        expect(m.updated).to.equal(-1);
        expect(m.invalidated).to.equal(-1);
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
        expect(m.attached).to.equal(3);

        expect(m.isPropsChanged).to.equal(-1);
        expect(m.newPropsReceived).to.equal(-1);
        expect(m.newContextReceived).to.equal(-1);
        expect(m.detached).to.equal(-1);
        expect(m.beforeUpdate).to.equal(-1);
        expect(m.updated).to.equal(-1);
        expect(m.invalidated).to.equal(-1);
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
        expect(m1.attached).to.equal(6);

        expect(m2.construct).to.equal(3);
        expect(m2.updateContext).to.equal(4);
        expect(m2.render).to.equal(5);
        expect(m2.attached).to.equal(7);

        expect(m1.isPropsChanged).to.equal(-1);
        expect(m1.newPropsReceived).to.equal(-1);
        expect(m1.newContextReceived).to.equal(-1);
        expect(m1.detached).to.equal(-1);
        expect(m1.beforeUpdate).to.equal(-1);
        expect(m1.updated).to.equal(-1);
        expect(m1.invalidated).to.equal(-1);

        expect(m2.isPropsChanged).to.equal(-1);
        expect(m2.newPropsReceived).to.equal(-1);
        expect(m2.newContextReceived).to.equal(-1);
        expect(m2.detached).to.equal(-1);
        expect(m2.beforeUpdate).to.equal(-1);
        expect(m2.updated).to.equal(-1);
        expect(m2.invalidated).to.equal(-1);
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
        expect(m1.attached).to.equal(6);
        expect(m1.detached).to.equal(9);

        expect(m2.construct).to.equal(3);
        expect(m2.updateContext).to.equal(4);
        expect(m2.render).to.equal(5);
        expect(m2.attached).to.equal(7);
        expect(m2.detached).to.equal(8);

        expect(m1.isPropsChanged).to.equal(-1);
        expect(m1.newPropsReceived).to.equal(-1);
        expect(m1.newContextReceived).to.equal(-1);
        expect(m1.beforeUpdate).to.equal(-1);
        expect(m1.updated).to.equal(-1);
        expect(m1.invalidated).to.equal(-1);

        expect(m2.isPropsChanged).to.equal(-1);
        expect(m2.newPropsReceived).to.equal(-1);
        expect(m2.newContextReceived).to.equal(-1);
        expect(m2.beforeUpdate).to.equal(-1);
        expect(m2.updated).to.equal(-1);
        expect(m2.invalidated).to.equal(-1);
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
        // updateContext is executed twice because LifecycleTestComponent is accessing `props` in updateContext.
        expect(m.updateContext).to.equal(7); // 1
        expect(m.render).to.equal(8); // 2
        expect(m.attached).to.equal(3);
        expect(m.isPropsChanged).to.equal(4);
        expect(m.newPropsReceived).to.equal(5);
        expect(m.beforeUpdate).to.equal(6);
        expect(m.updated).to.equal(9);

        expect(m.newContextReceived).to.equal(-1);
        expect(m.detached).to.equal(-1);
        expect(m.invalidated).to.equal(-1);
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
        expect(m.attached).to.equal(3);

        expect(m.isPropsChanged).to.equal(-1);
        expect(m.newPropsReceived).to.equal(-1);
        expect(m.newContextReceived).to.equal(-1);
        expect(m.beforeUpdate).to.equal(-1);
        expect(m.updated).to.equal(-1);
        expect(m.detached).to.equal(-1);
        expect(m.invalidated).to.equal(-1);
    });
});
