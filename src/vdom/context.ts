
import { MaybeUndefined } from "../common/types";

/**
 * Context.
 *
 * All Context objects should be immutable.
 *
 * Context objects will be implicitly propagated through virtual dom trees.
 *
 * @final
 */
export class Context {
    /**
     * Context data.
     */
    readonly data: { [key: string]: any };
    /**
     * Parent context.
     *
     * Contexts are built as a tree of immutable objects.
     */
    readonly from?: Context;

    constructor(data: any, from?: Context) {
        this.data = data;
        this.from = from;
    }

    /**
     * Find a context data.
     *
     * It retrieves value by iterating through all parent contexts until it finds value for a key, when nothing
     * is found `undefined` value is returned.
     *
     * @param key Key string.
     * @returns Value for the provided key or `undefined` when nothing is found.
     */
    get<V>(key: string): V | undefined {
        let n: Context | undefined = this;
        while (n) {
            if (n.data) {
                const v = n.data[key];
                if (v !== undefined) {
                    return v as V;
                }
            }
            n = n.from;
        }

        return;
    }

    /**
     * Find a context data by mapping keys with their values.
     *
     * It retrieves values by mapping keys with their values, it iterates through all parent contexts and maps all keys
     * with values on the first occurence, this process goes on until it finds values for all keys. Missing keys will
     * have `undefined` values.
     *
     * @param keys Key map.
     * @returns Key map with mapped values.
     */
    map<V>(keys: MaybeUndefined<V>): MaybeUndefined<V> {
        let n: Context | undefined = this;
        const k = Object.keys(keys) as (string | null)[];
        let l = k.length;

        while (l > 0 && n) {
            if (n.data) {
                for (let i = 0; i < k.length; i++) {
                    const j = k[i];
                    if (j) {
                        const v = n.data[j];
                        if (v !== undefined) {
                            (keys as any)[j] = n.data[j];
                            k[i] = null;
                            l--;
                            break;
                        }
                    }
                }
            }

            n = n.from;
        }

        return keys;
    }
}

/**
 * Root Context.
 *
 * Default Context that is used to render root nodes.
 */
export const ROOT_CONTEXT = new Context(undefined);
