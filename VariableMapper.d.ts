import type { Readable, Writable } from "svelte/store";
export declare function mapVariableToStore(variableName: string, store: Readable<unknown> & {
    set(this: void, value: unknown): void;
}, isLoadingVariableStore: Readable<boolean> & {
    set(this: void, value: boolean): void;
}): void;
export declare function createStoreFromVariable(variableName: string): {
    isLoadingVariableStore: Writable<boolean>;
    store: Writable<unknown>;
};
