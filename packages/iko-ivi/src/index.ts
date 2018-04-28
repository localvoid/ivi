import { ObjectAssertion, addAssertionType, AssertionError, errMsg, r, e } from "iko";
import { rt } from "rtext-writer";
import { VNode } from "ivi";
import { VNodeWrapper, toSnapshot } from "ivi-test";

declare module "iko" {
  interface Assertion<T> {
    toBeVNode(): VNodeAssertion;
  }

  function expect(obj: VNodeWrapper): VNodeAssertion;
  function expect(obj: VNode): VNodeAssertion;
}

/**
 * VNodeAssertion
 */
export class VNodeAssertion extends ObjectAssertion<VNodeWrapper> {
  constructor(obj: VNodeWrapper) {
    super(obj, "VNode");
  }

  /**
   * toSnapshot serializes VNode to snapshot.
   *
   * @returns this instance.
   */
  toSnapshot(): string {
    return toSnapshot(this.obj.vnode);
  }

  /**
   * toBeText checks that VNode is representing a Text node.
   *
   * @returns this instance.
   */
  toBeText(): this {
    const received = this.obj;
    const pass = received.isText();
    if (!pass) {
      const message = errMsg()
        .matcherHint("toBeText", "received", "")
        .info(`Expected ${this.type} to be a Text node:\n`)
        .info("  ", r(received), "\n");

      throw new AssertionError(message.compose(), this.toBeText);
    }

    return this;
  }

  /**
   * notToBeText checks that VNode is not representing a Text node.
   *
   * @returns this instance.
   */
  notToBeText(): this {
    const received = this.obj;
    const pass = !received.isText();
    if (!pass) {
      const message = errMsg()
        .matcherHint("notToBeText", "received", "")
        .info(`Expected ${this.type} not to be a Text node\n`);

      throw new AssertionError(message.compose(), this.notToBeText);
    }

    return this;
  }

  /**
   * toBeElement checks that VNode is representing an Element node.
   *
   * @returns this instance.
   */
  toBeElement(): this {
    const received = this.obj;
    const pass = received.isElement();
    if (!pass) {
      const message = errMsg()
        .matcherHint("toBeElement", "received", "")
        .info(`Expected ${this.type} to be an Element node:\n`)
        .info("  ", r(received), "\n");

      throw new AssertionError(message.compose(), this.toBeElement);
    }

    return this;
  }

  /**
   * notToBeElement checks that VNode is not representing an Element node.
   *
   * @returns this instance.
   */
  notToBeElement(): this {
    const received = this.obj;
    const pass = !received.isElement();
    if (!pass) {
      const message = errMsg()
        .matcherHint("notToBeElement", "received", "")
        .info(`Expected ${this.type} not to be an Element node\n`);

      throw new AssertionError(message.compose(), this.notToBeElement);
    }

    return this;
  }

  /**
   * toBeComponent checks that VNode is representing a Component.
   *
   * @returns this instance.
   */
  toBeComponent(): this {
    const received = this.obj;
    const pass = received.isComponent();
    if (!pass) {
      const message = errMsg()
        .matcherHint("toBeComponent", "received", "")
        .info(`Expected ${this.type} to be a Component node:\n`)
        .info("  ", r(received), "\n");

      throw new AssertionError(message.compose(), this.toBeComponent);
    }

    return this;
  }

  /**
   * notToBeComponent checks that VNode is not representing a Component.
   *
   * @returns this instance.
   */
  notToBeComponent(): this {
    const received = this.obj;
    const pass = !received.isComponent();
    if (!pass) {
      const message = errMsg()
        .matcherHint("notToBeComponent", "received", "")
        .info(`Expected ${this.type} not to be a Component node\n`);

      throw new AssertionError(message.compose(), this.notToBeComponent);
    }

    return this;
  }

  /**
   * toBeStatefulComponent checks that VNode is representing a Stateful component.
   *
   * @returns this instance.
   */
  toBeStatefulComponent(): this {
    const received = this.obj;
    const pass = received.isStatefulComponent();
    if (!pass) {
      const message = errMsg()
        .matcherHint("toBeStatefulComponent", "received", "")
        .info(`Expected ${this.type} to be a Stateful component node:\n`)
        .info("  ", r(received), "\n");

      throw new AssertionError(message.compose(), this.toBeStatefulComponent);
    }

    return this;
  }

  /**
   * notToBeStatefulComponent checks that VNode is not representing a Stateful component.
   *
   * @returns this instance.
   */
  notToBeStatefulComponent(): this {
    const received = this.obj;
    const pass = !received.isStatefulComponent();
    if (!pass) {
      const message = errMsg()
        .matcherHint("notToBeStatefulComponent", "received", "")
        .info(`Expected ${this.type} not to be a Stateful component node\n`);

      throw new AssertionError(message.compose(), this.notToBeStatefulComponent);
    }

    return this;
  }

  /**
   * toBeStatelessComponent checks that VNode is representing a Stateless component.
   *
   * @returns this instance.
   */
  toBeStatelessComponent(): this {
    const received = this.obj;
    const pass = received.isStatelessComponent();
    if (!pass) {
      const message = errMsg()
        .matcherHint("toBeStatelessComponent", "received", "")
        .info(`Expected ${this.type} to be a Stateless component node:\n`)
        .info("  ", r(received), "\n");

      throw new AssertionError(message.compose(), this.toBeStatelessComponent);
    }

    return this;
  }

  /**
   * notToBeStatelessComponent checks that VNode is not representing a Stateless component.
   *
   * @returns this instance.
   */
  notToBeStatelessComponent(): this {
    const received = this.obj;
    const pass = !received.isStatelessComponent();
    if (!pass) {
      const message = errMsg()
        .matcherHint("notToBeStatelessComponent", "received", "")
        .info(`Expected ${this.type} not to be a Stateless component node\n`);

      throw new AssertionError(message.compose(), this.notToBeStatelessComponent);
    }

    return this;
  }

  /**
   * toBeContextComponent checks that VNode is representing a Context component.
   *
   * @returns this instance.
   */
  toBeContextComponent(): this {
    const received = this.obj;
    const pass = received.isContextComponent();
    if (!pass) {
      const message = errMsg()
        .matcherHint("toBeContextComponent", "received", "")
        .info(`Expected ${this.type} to be a Context component node:\n`)
        .info("  ", r(received), "\n");

      throw new AssertionError(message.compose(), this.toBeContextComponent);
    }

    return this;
  }

  /**
   * notToBeContextComponent checks that VNode is not representing a Context component.
   *
   * @returns this instance.
   */
  notToBeContextComponent(): this {
    const received = this.obj;
    const pass = !received.isContextComponent();
    if (!pass) {
      const message = errMsg()
        .matcherHint("notToBeContextComponent", "received", "")
        .info(`Expected ${this.type} not to be a Context component node\n`);

      throw new AssertionError(message.compose(), this.notToBeContextComponent);
    }

    return this;
  }

  /**
   * toBeConnectComponent checks that VNode is representing a Connect component.
   *
   * @returns this instance.
   */
  toBeConnectComponent(): this {
    const received = this.obj;
    const pass = received.isConnectComponent();
    if (!pass) {
      const message = errMsg()
        .matcherHint("toBeConnectComponent", "received", "")
        .info(`Expected ${this.type} to be a Connect component node:\n`)
        .info("  ", r(received), "\n");

      throw new AssertionError(message.compose(), this.toBeConnectComponent);
    }

    return this;
  }

  /**
   * notToBeConnectComponent checks that VNode is not representing a Connect component.
   *
   * @returns this instance.
   */
  notToBeConnectComponent(): this {
    const received = this.obj;
    const pass = !received.isConnectComponent();
    if (!pass) {
      const message = errMsg()
        .matcherHint("notToBeConnectComponent", "received", "")
        .info(`Expected ${this.type} to be a Connect component node\n`);

      throw new AssertionError(message.compose(), this.notToBeConnectComponent);
    }

    return this;
  }

  /**
   * toHaveTagName checks that VNode has a matching tag name.
   *
   * @param tagName Tag name.
   * @returns this instance.
   */
  toHaveTagName(tagName: string): this {
    const received = this.obj.getTagName();
    const expected = tagName;
    const pass = received === expected;
    if (!pass) {
      const message = errMsg()
        .matcherHint("toHaveTagName")
        .info(rt`Expected ${this.type} to have tag name ${e(expected)}, instead received ${r(received)}\n`);

      throw new AssertionError(message.compose(), this.toHaveTagName);
    }

    return this;
  }

  /**
   * notToHaveTagName checks that VNode does not have a matching tag name.
   *
   * @param tagName Tag name.
   * @returns this instance.
   */
  notToHaveTagName(tagName: string): this {
    const received = this.obj.getTagName();
    const expected = tagName;
    const pass = received !== expected;
    if (!pass) {
      const message = errMsg()
        .matcherHint("notToHaveTagName")
        .info(rt`Expected ${this.type} not to have tag name ${e(expected)}\n`);

      throw new AssertionError(message.compose(), this.notToHaveTagName);
    }

    return this;
  }

  /**
   * toHaveKey checks that VNode has matching key.
   *
   * @param key Key.
   * @returns this instance.
   */
  toHaveKey(key: any): this {
    const received = this.obj.getKey();
    const expected = key;
    const pass = received === expected;
    if (!pass) {
      const message = errMsg()
        .matcherHint("toHaveKey")
        .info(rt`Expected ${this.type} to have key ${e(expected)}, instead received ${r(received)}\n`);

      throw new AssertionError(message.compose(), this.toHaveKey);
    }

    return this;
  }

  /**
   * notToHaveKey checks that VNode does not have a matching key.
   *
   * @param key Key.
   * @returns this instance.
   */
  notToHaveKey(key: any): this {
    const received = this.obj.getKey();
    const expected = key;
    const pass = received !== expected;
    if (!pass) {
      const message = errMsg()
        .matcherHint("notToHaveKey")
        .info(rt`Expected ${this.type} not to have key ${e(expected)}\n`);

      throw new AssertionError(message.compose(), this.notToHaveKey);
    }

    return this;
  }

  /**
   * toHaveClassName checks that VNode has matching class name.
   *
   * @param className Class name.
   * @returns this instance.
   */
  toHaveClassName(className: string): this {
    const received = this.obj.getClassName();
    const expected = className;
    const pass = received === expected;
    if (!pass) {
      const message = errMsg()
        .matcherHint("toHaveClassName")
        .info(rt`Expected ${this.type} to have class name ${e(expected)}, instead received ${r(received)}\n`);

      throw new AssertionError(message.compose(), this.toHaveClassName);
    }

    return this;
  }

  /**
   * notToHaveClassName checks that VNode does not have a matching class name.
   *
   * @param className Class name.
   * @returns this instance.
   */
  notToHaveClassName(className: string): this {
    const received = this.obj.getClassName();
    const expected = className;
    const pass = received !== expected;
    if (!pass) {
      const message = errMsg()
        .matcherHint("notToHaveClassName")
        .info(rt`Expected ${this.type} not to have class name ${e(expected)}\n`);

      throw new AssertionError(message.compose(), this.notToHaveClassName);
    }

    return this;
  }
}

/**
 * enableIviSupport patches iko library and adds support for ivi library.
 */
export function enableIviSupport() {
  addAssertionType((obj: any) => {
    if (typeof obj === "object") {
      if (obj instanceof VNodeWrapper) {
        return new VNodeAssertion(obj);
      }
      if (obj instanceof VNode) {
        return new VNodeAssertion(new VNodeWrapper(obj, null, {}));
      }
    }
    return undefined;
  });

  ObjectAssertion.prototype.toBeVNode = function (): VNodeAssertion {
    const received = this.obj;
    const pass = typeof received === "object" && (received instanceof VNode || received instanceof VNodeWrapper);

    if (!pass) {
      const message = errMsg()
        .matcherHint("toBeVNode", "received", "")
        .info(`Expected ${this.type} to have VNode type:\n`)
        .info("  ", r(received), "\n");

      throw new AssertionError(message.compose(), this.toBeVNode);
    }

    return this as any as VNodeAssertion;
  };
}
