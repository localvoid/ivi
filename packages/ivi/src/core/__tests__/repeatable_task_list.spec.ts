import { useIVI, useMockFn } from "ivi-jest";

const ivi = useIVI();

describe("RepeatableTaskList", () => {
  const t = useMockFn((fn) => fn.mockReturnValue(true));
  const f = useMockFn((fn) => fn.mockReturnValue(false));

  test("run one task", () => {
    ivi.runRepeatableTasks([f]);
    expect(f).toHaveBeenCalledTimes(1);
  });

  test("run two tasks", () => {
    ivi.runRepeatableTasks([f, f]);
    expect(f).toHaveBeenCalledTimes(2);
  });

  test("run one task twice", () => {
    const tasks = [f];
    ivi.runRepeatableTasks(tasks);
    ivi.runRepeatableTasks(tasks);
    expect(f).toHaveBeenCalledTimes(2);
  });

  test("run two tasks twice", () => {
    const tasks = [f, f];
    ivi.runRepeatableTasks(tasks);
    ivi.runRepeatableTasks(tasks);
    expect(f).toHaveBeenCalledTimes(4);
  });

  test("run one one-time task twice", () => {
    const tasks = [t];
    ivi.runRepeatableTasks(tasks);
    ivi.runRepeatableTasks(tasks);
    expect(t).toHaveBeenCalledTimes(1);
  });

  test("run one one-time and one simple task twice", () => {
    const tasks = [t, f];
    ivi.runRepeatableTasks(tasks);
    ivi.runRepeatableTasks(tasks);

    expect(t).toHaveBeenCalledTimes(1);
    expect(f).toHaveBeenCalledTimes(2);
  });
});
