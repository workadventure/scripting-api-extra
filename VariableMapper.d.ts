import type { Readable, Writable } from "svelte/store";
export declare function mapVariableToStore(variableName: string, store: Readable<unknown> & {
    set(this: void, value: unknown): void;
}): void;
export declare function createStoreFromVariable(variableName: string): Writable<unknown>;
