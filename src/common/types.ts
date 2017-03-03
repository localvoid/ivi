
/* tslint:disable */
export type MaybeUndefined<T> = {
    [P in keyof T]: T[P] | undefined;
};
/* tslint:enable */

export type Context<T = {}> = T;
