
declare global {
    interface Function {
        displayName: string;
    }
}

export type MaybeUndefined<T> = {
    [P in keyof T]: T[P] | undefined;
};

export type Context<T = {}> = T;
