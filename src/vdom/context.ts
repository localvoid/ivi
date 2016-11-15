
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
     * Get method supports two ways to retrieve context values:
     *  - Retrieve value with a simple key.
     *  - Object with a key => value mapping.
     *
     * Retrieving values with a simple key works by iterating through all parent contexts until it finds value,
     * `undefined` value is returned when nothing is found.
     *
     * Retrieving values with key => value mapping works by iterating through all parent contexts and mapping all
     * keys with values on the first occurence, this process goes on until it finds values for all keys.
     *
     * @param key Key may be a simple string, or a { [key: string]: value | undefined } object.
     * @returns Value for the provided key if it is a simple string, or key object that was used as a key => value
     *   mapping.
     */
    get<V>(key: V): V;
    get<V>(key: string): V | undefined;
    get<V>(key: string | V): V | undefined {
        let n: Context | undefined = this;
        let v: any;

        if (typeof key !== "string") {
            const keys = Object.keys(key) as (string | null)[];
            let l = keys.length;

            while (l > 0 && n) {
                if (n.data) {
                    for (let i = 0; i < keys.length; i++) {
                        const k = keys[i];
                        if (k) {
                            v = n.data[k];
                            if (v !== undefined) {
                                (key as any)[k] = n.data[k];
                                keys[i] = null;
                                l--;
                                break;
                            }
                        }
                    }
                }

                n = n.from;
            }

            return key;
        }

        while (n) {
            if (n.data) {
                v = n.data[key];
                if (v !== undefined) {
                    return v as V;
                }
            }
            n = n.from;
        }

        return;
    }
}

/**
 * Root Context.
 *
 * Default Context that is used to render root nodes.
 */
export const ROOT_CONTEXT = new Context(undefined);
