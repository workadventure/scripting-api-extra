import { derived, Readable } from "svelte/store";
import { getVariables, VariableDescriptor } from "../../../VariablesExtra";
import { configurationLayerStore } from "./LayersStore";
import type { ITiledMapLayer } from "@workadventure/tiled-map-type-guard/dist";

export const variablesStore = derived<
    Readable<ITiledMapLayer | undefined>,
    Map<string, VariableDescriptor> | undefined
>(configurationLayerStore, ($configurationLayerStore, set) => {
    // filtered variables are passed via hash in configuration.html URL
    let hash = window.location.hash;

    if (hash) {
        // Mostly for the local configuration panel
        // We remove the "#" in order to split the hash into an array
        hash = hash.substring(1);
        const variablesToKeep = hash.split(",");

        getVariables(undefined, variablesToKeep)
            .then((variables) => {
                set(variables);
            })
            .catch((e) => console.error(e));
    } else if ($configurationLayerStore) {
        // Mostly for the global configuration panel with sections
        getVariables($configurationLayerStore.name)
            .then((variables) => {
                set(variables);
            })
            .catch((e) => console.error(e));
    } else {
        // For a case where you need to get all variables without any restriction
        getVariables()
            .then((variables) => {
                set(variables);
            })
            .catch((e) => console.error(e));
    }
});
