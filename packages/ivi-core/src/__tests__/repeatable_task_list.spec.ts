import { runRepeatableTasks } from "ivi-core";

describe("RepeatableTaskList", () => {
  test("run one task", () => {
    const t = [];
    let i = 0;
    t.push(() => { i++; return false; });
    runRepeatableTasks(t);
    expect(i).toBe(1);
  });

  test("run two tasks", () => {
    const t = [];
    let i = 0;
    t.push(() => { i++; return false; });
    t.push(() => { i++; return false; });
    runRepeatableTasks(t);
    expect(i).toBe(2);
  });

  test("run one task twice", () => {
    const t = [];
    let i = 0;
    t.push(() => { i++; return false; });
    runRepeatableTasks(t);
    runRepeatableTasks(t);
    expect(i).toBe(2);
  });

  test("run two tasks twice", () => {
    const t = [];
    let i = 0;
    t.push(() => { i++; return false; });
    t.push(() => { i++; return false; });
    runRepeatableTasks(t);
    runRepeatableTasks(t);

    expect(i).toBe(4);
  });

  test("run one one-time task twice", () => {
    const t = [];
    let i = 0;
    t.push(() => { i++; return true; });
    runRepeatableTasks(t);
    runRepeatableTasks(t);

    expect(i).toBe(1);
  });

  test("run one one-time and one simple task twice", () => {
    const t = [];
    let i = 0;
    t.push(() => { i++; return true; });
    t.push(() => { i++; return false; });
    runRepeatableTasks(t);
    runRepeatableTasks(t);

    expect(i).toBe(3);
  });
});
