import { RepeatableTaskList } from "../src/repeatable_task_list";
import { NOOP_FALSE } from "../src/noop";

describe("RepeatableTaskList", () => {
  test("empty", () => {
    const t = new RepeatableTaskList();
    expect(t.tasks).toEqual([]);
  });

  test("add task", () => {
    const t = new RepeatableTaskList();
    t.add(NOOP_FALSE);
    expect(t.tasks.length).toBe(1);
  });

  test("add two tasks", () => {
    const t = new RepeatableTaskList();
    t.add(NOOP_FALSE);
    t.add(NOOP_FALSE);
    expect(t.tasks.length).toBe(2);
  });

  test("run one task", () => {
    const t = new RepeatableTaskList();
    let i = 0;
    t.add(() => { i++; return false; });
    t.run();
    expect(i).toBe(1);
  });

  test("run two tasks", () => {
    const t = new RepeatableTaskList();
    let i = 0;
    t.add(() => { i++; return false; });
    t.add(() => { i++; return false; });
    t.run();
    expect(i).toBe(2);
  });

  test("run one task twice", () => {
    const t = new RepeatableTaskList();
    let i = 0;
    t.add(() => { i++; return false; });
    t.run();
    t.run();
    expect(i).toBe(2);
  });

  test("run two tasks twice", () => {
    const t = new RepeatableTaskList();
    let i = 0;
    t.add(() => { i++; return false; });
    t.add(() => { i++; return false; });
    t.run();
    t.run();
    expect(i).toBe(4);
  });

  test("run one one-time task twice", () => {
    const t = new RepeatableTaskList();
    let i = 0;
    t.add(() => { i++; return true; });
    t.run();
    t.run();
    expect(i).toBe(1);
  });

  test("run one one-time and one simple task twice", () => {
    const t = new RepeatableTaskList();
    let i = 0;
    t.add(() => { i++; return true; });
    t.add(() => { i++; return false; });
    t.run();
    t.run();
    expect(i).toBe(3);
  });
});
