const { ModuleMocker } = require("jest-mock");
const { installCommonGlobals } = require("jest-util");
const { JestFakeTimers } = require("@jest/fake-timers");
const { JSDOM, VirtualConsole } = require("jsdom");

class JSDomEnvironment {
  constructor(config, options = {}) {
    this.dom = new JSDOM(
      "<!DOCTYPE html>",
      {
        pretendToBeVisual: true,
        runScripts: "dangerously",
        url: config.testURL,
        virtualConsole: new VirtualConsole().sendTo(
          options.console || console
        ),
        resources: options.resources,
        ...config.testEnvironmentOptions,
      },
    );

    this.global = this.dom.window.document.defaultView;
    // Node's error-message stack size is limited at 10, but it's pretty useful
    // to see more than that when a test fails.
    this.global.Error.stackTraceLimit = 100;
    installCommonGlobals(this.global, config.globals);

    // Report uncaught errors.
    this.errorEventListener = event => {
      if (userErrorListenerCount === 0 && event.error) {
        process.emit("uncaughtException", event.error);
      }
    };
    this.global.addEventListener("error", this.errorEventListener);

    // However, don't report them as uncaught if the user listens to 'error' event.
    // In that case, we assume the might have custom error handling logic.
    const originalAddListener = this.global.addEventListener;
    const originalRemoveListener = this.global.removeEventListener;
    let userErrorListenerCount = 0;
    this.global.addEventListener = function (name) {
      if (name === "error") {
        userErrorListenerCount++;
      }
      return originalAddListener.apply(this, arguments);
    };
    this.global.removeEventListener = function (name) {
      if (name === "error") {
        userErrorListenerCount--;
      }
      return originalRemoveListener.apply(this, arguments);
    };

    this.moduleMocker = new ModuleMocker(this.global);

    const timerConfig = {
      idToRef: (id) => id,
      refToId: (ref) => ref,
    };

    this.fakeTimers = new JestFakeTimers({
      config,
      global: this.global,
      moduleMocker: this.moduleMocker,
      timerConfig,
    });
  }

  setup() {
    return Promise.resolve();
  }

  teardown() {
    if (this.fakeTimers) {
      this.fakeTimers.dispose();
    }
    if (this.global) {
      if (this.errorEventListener) {
        this.global.removeEventListener("error", this.errorEventListener);
      }
      // Dispose "document" to prevent "load" event from triggering.
      Object.defineProperty(this.global, "document", { value: undefined });
      this.global.close();
    }
    this.errorEventListener = undefined;
    this.global = undefined;
    this.dom = undefined;
    this.fakeTimers = undefined;
    return Promise.resolve();
  }

  runScript(script) {
    if (this.dom) {
      return this.dom.runVMScript(script);
    }
    return null;
  }
}

module.exports = JSDomEnvironment;
