import { derived } from "svelte/store";
import { getVariables } from "../../../VariablesExtra";
import { configurationLayerStore } from "./LayersStore";
export const variablesStore = derived(configurationLayerStore, ($configurationLayerStore, set) => {
    let hash = window.location.hash;
    if (hash) {
        hash = hash.substring(1);
        const variablesToKeep = hash.split(",");
        getVariables(undefined, variablesToKeep)
            .then((variables) => {
            set(variables);
        })
            .catch((e) => console.error(e));
    }
    else if ($configurationLayerStore) {
        getVariables($configurationLayerStore.name)
            .then((variables) => {
            set(variables);
        })
            .catch((e) => console.error(e));
    }
    else {
        getVariables()
            .then((variables) => {
            set(variables);
        })
            .catch((e) => console.error(e));
    }
});
//# sourceMappingURL=VariablesStore.js.map