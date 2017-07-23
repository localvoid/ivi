import { RepeatableTaskList } from "../src/repeatable_task_list";
import { NOOP_FALSE } from "../src/noop";
import { expect } from "iko";

describe("RepeatableTaskList", () => {
  it("empty", () => {
    const t = new RepeatableTaskList();
    expect(t.tasks).toMatch([]);
  });

  it("add task", () => {
    const t = new RepeatableTaskList();
    t.add(NOOP_FALSE);
    expect(t.tasks.length).toBeEqual(1);
  });

  it("add two tasks", () => {
    const t = new RepeatableTaskList();
    t.add(NOOP_FALSE);
    t.add(NOOP_FALSE);
    expect(t.tasks.length).toBeEqual(2);
  });

  it("run one task", () => {
    const t = new RepeatableTaskList();
    let i = 0;
    t.add(() => { i++; return false; });
    t.run();
    expect(i).toBeEqual(1);
  });

  it("run two tasks", () => {
    const t = new RepeatableTaskList();
    let i = 0;
    t.add(() => { i++; return false; });
    t.add(() => { i++; return false; });
    t.run();
    expect(i).toBeEqual(2);
  });

  it("run one task twice", () => {
    const t = new RepeatableTaskList();
    let i = 0;
    t.add(() => { i++; return false; });
    t.run();
    t.run();
    expect(i).toBeEqual(2);
  });

  it("run two tasks twice", () => {
    const t = new RepeatableTaskList();
    let i = 0;
    t.add(() => { i++; return false; });
    t.add(() => { i++; return false; });
    t.run();
    t.run();
    expect(i).toBeEqual(4);
  });

  it("run one one-time task twice", () => {
    const t = new RepeatableTaskList();
    let i = 0;
    t.add(() => { i++; return true; });
    t.run();
    t.run();
    expect(i).toBeEqual(1);
  });

  it("run one one-time and one simple task twice", () => {
    const t = new RepeatableTaskList();
    let i = 0;
    t.add(() => { i++; return true; });
    t.add(() => { i++; return false; });
    t.run();
    t.run();
    expect(i).toBeEqual(3);
  });
});
