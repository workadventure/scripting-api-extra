import type { Readable, Writable } from "svelte/store";
import { get, writable } from "svelte/store";

/**
 * A function that maps a WorkAdventure variable to a Svelte store
 *
 * The store is initialized with the value of the variable.
 */
export function mapVariableToStore(
    variableName: string,
    store: Readable<unknown> & { set(this: void, value: unknown): void },
): void {
    store.set(WA.state.loadVariable(variableName));

    store.subscribe((value) => {
        if (value !== WA.state.loadVariable(variableName)) {
            WA.state.saveVariable(variableName, value);
        }
    });

    WA.state.onVariableChange(variableName).subscribe((value: unknown) => {
        if (value !== get(store)) {
            store.set(value);
        }
    });
}

/**
 * Returns a new writable Svelte store generated from a WorkAdventure variable.
 *
 * The store is initialized with the value of the variable.
 */
export function createStoreFromVariable(variableName: string): Writable<unknown> {
    const store = writable<unknown>(undefined);

    mapVariableToStore(variableName, store);

    return store;
}
