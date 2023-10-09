import { get, writable } from "svelte/store";
export function mapVariableToStore(variableName, store, isLoadingVariableStore) {
    store.set(WA.state.loadVariable(variableName));
    store.subscribe(async (value) => {
        if (value !== WA.state.loadVariable(variableName)) {
            try {
                await WA.state.saveVariable(variableName, value);
                isLoadingVariableStore.set(false);
                console.info(`Variable ${variableName} saved`);
            }
            catch (e) {
                console.info(`Error while saving variable ${variableName}`, e);
                isLoadingVariableStore.set(false);
                throw e;
            }
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
    const isLoadingVariableStore = writable(false);
    mapVariableToStore(variableName, store, isLoadingVariableStore);
    return { store, isLoadingVariableStore };
}
//# sourceMappingURL=VariableMapper.js.map