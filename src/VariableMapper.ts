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
    isLoadingVariableStore: Readable<boolean> & { set(this: void, value: boolean): void },
): void {
    store.set(WA.state.loadVariable(variableName));

    store.subscribe(async (value) => {
        if (value !== WA.state.loadVariable(variableName)) {
            try {
                await WA.state.saveVariable(variableName, value);
                isLoadingVariableStore.set(false);
                console.info(`Variable ${variableName} saved`);
            } catch (e) {
                console.info(`Error while saving variable ${variableName}`, e);
                isLoadingVariableStore.set(false);
                throw e;
            }
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
export function createStoreFromVariable(variableName: string): {
    isLoadingVariableStore: Writable<boolean>;
    store: Writable<unknown>;
} {
    const store = writable<unknown>(undefined);
    const isLoadingVariableStore = writable<boolean>(false);
    mapVariableToStore(variableName, store, isLoadingVariableStore);
    return { store, isLoadingVariableStore };
}
