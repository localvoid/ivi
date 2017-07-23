import { clock } from "../src/clock";
import { scheduleMicrotask } from "../src/microtask";
import { scheduleTask } from "../src/task";
import { currentFrame, nextFrame } from "../src/frame";
import { expect } from "iko";

describe("scheduler", () => {
  describe("execution order", () => {
    it("microtasks before tasks", (done) => {
      let i = 0;
      scheduleTask(() => {
        expect(i).toBeEqual(1);
        done();
      });
      scheduleMicrotask(() => {
        expect(i).toBeEqual(0);
        i = 1;
      });
    });

    it("batch read/write/after frame tasks", (done) => {
      nextFrame().write(() => {
        let i = 0;
        currentFrame().after(() => {
          expect(i).toBeEqual(6);
          i = 7;
        });
        currentFrame().after(() => {
          expect(i).toBeEqual(7);
          done();
        });
        currentFrame().read(() => {
          expect(i).toBeEqual(1);
          i = 2;
        });
        currentFrame().read(() => {
          expect(i).toBeEqual(2);
          i = 3;
          currentFrame().write(() => {
            expect(i).toBeEqual(4);
            i = 5;
          });
          currentFrame().write(() => {
            expect(i).toBeEqual(5);
            i = 6;
          });
          currentFrame().read(() => {
            expect(i).toBeEqual(3);
            i = 4;
          });
        });
        currentFrame().write(() => {
          expect(i).toBeEqual(0);
          i = 1;
        });
      });
    });
  });

  describe("clock", () => {
    it("advance clock by 1 after microtask execution", (done) => {
      const c = clock();
      scheduleMicrotask(() => {
        expect(clock()).toBeEqual(c);
        setTimeout(() => {
          expect(clock()).toBeEqual(c + 1);
          done();
        }, 10);
      });
    });

    it("advance clock by 1 after task execution", (done) => {
      const c = clock();
      scheduleTask(() => {
        expect(clock()).toBeEqual(c);
        setTimeout(() => {
          expect(clock()).toBeEqual(c + 1);
          done();
        }, 10);
      });
    });

    it("advance clock by 1 after after next frame", (done) => {
      const c = clock() + 1;
      nextFrame().after(() => {
        expect(clock()).toBeEqual(c);
        setTimeout(() => {
          expect(clock()).toBeEqual(c + 1);
          done();
        }, 10);
      });
    });

    it("should have the same clock when switching between read and write batches", (done) => {
      const c = clock() + 1;
      nextFrame().write(() => {
        expect(clock()).toBeEqual(c);
        currentFrame().read(() => {
          expect(clock()).toBeEqual(c);
          currentFrame().write(() => {
            expect(clock()).toBeEqual(c);
            setTimeout(() => {
              expect(clock()).toBeEqual(c + 1);
              done();
            }, 10);
          });
        });
      });
    });
  });
});
