import { clock } from "../src/scheduler/clock";
import { scheduleMicrotask } from "../src/scheduler/microtask";
import { scheduleTask } from "../src/scheduler/task";
import { currentFrame, nextFrame } from "../src/scheduler/frame";
import { expect } from "chai";

describe("scheduler", () => {
    describe("execution order", () => {
        it("microtasks before tasks", (done) => {
            let i = 0;
            scheduleTask(() => {
                expect(i).to.equal(1);
                done();
            });
            scheduleMicrotask(() => {
                expect(i).to.equal(0);
                i = 1;
            });
        });

        it("batch read/write/after frame tasks", (done) => {
            nextFrame().write(() => {
                let i = 0;
                currentFrame().after(() => {
                    expect(i).to.equal(6);
                    i = 7;
                });
                currentFrame().after(() => {
                    expect(i).to.equal(7);
                    done();
                });
                currentFrame().read(() => {
                    expect(i).to.equal(1);
                    i = 2;
                });
                currentFrame().read(() => {
                    expect(i).to.equal(2);
                    i = 3;
                    currentFrame().write(() => {
                        expect(i).to.equal(4);
                        i = 5;
                    });
                    currentFrame().write(() => {
                        expect(i).to.equal(5);
                        i = 6;
                    });
                    currentFrame().read(() => {
                        expect(i).to.equal(3);
                        i = 4;
                    });
                });
                currentFrame().write(() => {
                    expect(i).to.equal(0);
                    i = 1;
                });
            });
        });
    });

    describe("clock", () => {
        it("advance clock by 1 after microtask execution", (done) => {
            const c = clock();
            scheduleMicrotask(() => {
                expect(clock()).to.equal(c);
                setTimeout(() => {
                    expect(clock()).to.equal(c + 1);
                    done();
                }, 10);
            });
        });

        it("advance clock by 1 after task execution", (done) => {
            const c = clock();
            scheduleTask(() => {
                expect(clock()).to.equal(c);
                setTimeout(() => {
                    expect(clock()).to.equal(c + 1);
                    done();
                }, 10);
            });
        });

        it("advance clock by 1 after after next frame", (done) => {
            const c = clock() + 1;
            nextFrame().after(() => {
                expect(clock()).to.equal(c);
                setTimeout(() => {
                    expect(clock()).to.equal(c + 1);
                    done();
                }, 10);
            });
        });

        it("should have the same clock when switching between read and write batches", (done) => {
            const c = clock() + 1;
            nextFrame().write(() => {
                expect(clock()).to.equal(c);
                currentFrame().read(() => {
                    expect(clock()).to.equal(c);
                    currentFrame().write(() => {
                        expect(clock()).to.equal(c);
                        setTimeout(() => {
                            expect(clock()).to.equal(c + 1);
                            done();
                        }, 10);
                    });
                });
            });
        });
    });
});
