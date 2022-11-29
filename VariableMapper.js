import { get, writable } from "svelte/store";
export function mapVariableToStore(variableName, store) {
    store.set(WA.state.loadVariable(variableName));
    store.subscribe((value) => {
        if (value !== WA.state.loadVariable(variableName)) {
            WA.state.saveVariable(variableName, value);
        }
    });
    WA.state.onVariableChange(variableName).subscribe((value) => {
        if (value !== get(store)) {
            store.set(value);
        }
    });
}
export function createStoreFromVariable(variableName) {
    const store = writable(undefined);
    mapVariableToStore(variableName, store);
    return store;
}
//# sourceMappingURL=VariableMapper.js.map