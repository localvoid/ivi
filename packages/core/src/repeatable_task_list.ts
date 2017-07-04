import { unorderedArrayDelete } from "./array";

/**
 * RepeatableTaskList is a data structure for tasks that will be repeated until they return `true` value.
 */
export class RepeatableTaskList {
    /**
     * Repeatable tasks.
     */
    readonly tasks: Array<() => boolean | undefined>;

    constructor() {
        this.tasks = [];
    }

    /**
     * add function to the task list.
     *
     * @param task Task function.
     */
    add(task: () => boolean | undefined): void {
        this.tasks.push(task);
    }

    /**
     * run tasks.
     */
    run(): void {
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task() === true) {
                unorderedArrayDelete(this.tasks, i);
            }
        }
    }
}
