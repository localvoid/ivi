import {
  clock, scheduleMicrotask, scheduleTask, currentFrameRead, currentFrameWrite, currentFrameAfter, nextFrameWrite,
  nextFrameAfter,
} from "../src/index";
import { expect } from "iko";

describe("scheduler", () => {
  describe("execution order", () => {
    it("microtasks before tasks", (done) => {
      let i = 0;
      scheduleTask(() => {
        expect(i).toBe(1);
        done();
      });
      scheduleMicrotask(() => {
        expect(i).toBe(0);
        i = 1;
      });
    });

    it("batch read/write/after frame tasks", (done) => {
      nextFrameWrite(() => {
        let i = 0;
        currentFrameAfter(() => {
          expect(i).toBe(6);
          i = 7;
        });
        currentFrameAfter(() => {
          expect(i).toBe(7);
          done();
        });
        currentFrameRead(() => {
          expect(i).toBe(1);
          i = 2;
        });
        currentFrameRead(() => {
          expect(i).toBe(2);
          i = 3;
          currentFrameWrite(() => {
            expect(i).toBe(4);
            i = 5;
          });
          currentFrameWrite(() => {
            expect(i).toBe(5);
            i = 6;
          });
          currentFrameRead(() => {
            expect(i).toBe(3);
            i = 4;
          });
        });
        currentFrameWrite(() => {
          expect(i).toBe(0);
          i = 1;
        });
      });
    });
  });

  describe("clock", () => {
    it("advance clock by 1 after microtask execution", (done) => {
      const c = clock();
      scheduleMicrotask(() => {
        expect(clock()).toBe(c);
        setTimeout(() => {
          expect(clock()).toBe(c + 1);
          done();
        }, 10);
      });
    });

    it("advance clock by 1 after task execution", (done) => {
      const c = clock();
      scheduleTask(() => {
        expect(clock()).toBe(c);
        setTimeout(() => {
          expect(clock()).toBe(c + 1);
          done();
        }, 10);
      });
    });

    it("advance clock by 1 after after next frame", (done) => {
      const c = clock() + 1;
      nextFrameAfter(() => {
        expect(clock()).toBe(c);
        setTimeout(() => {
          expect(clock()).toBe(c + 1);
          done();
        }, 10);
      });
    });

    it("should have the same clock when switching between read and write batches", (done) => {
      const c = clock() + 1;
      nextFrameWrite(() => {
        expect(clock()).toBe(c);
        currentFrameRead(() => {
          expect(clock()).toBe(c);
          currentFrameWrite(() => {
            expect(clock()).toBe(c);
            setTimeout(() => {
              expect(clock()).toBe(c + 1);
              done();
            }, 10);
          });
        });
      });
    });
  });
});
