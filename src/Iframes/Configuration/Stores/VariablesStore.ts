import {derived, Readable} from 'svelte/store';
import {
    getAllVariables,
    getVariablesByNames,
    getVariablesByLayers,
    VariableDescriptor
} from "../../../VariablesExtra";
import {layerStore} from "./LayersStore";
import type {ITiledMapLayer} from "@workadventure/tiled-map-type-guard/dist";

export const variablesStore = derived<Readable<ITiledMapLayer|undefined>, Map<string, VariableDescriptor>|undefined>(layerStore, ($layerStore) => {
    // filtered variables are passed via hash in configuration.html URL
    let hash = window.location.hash

    if (!!hash) {
        // Mostly for the local configuration panel
        console.log('hash',hash)
        // remove the "#" in order to split the hash into an array
        hash = hash.substring(1)
        const variablesToKeep = hash.split(',')

        getVariablesByNames(variablesToKeep).then((variables) => {
            console.log('variables byNames:',variables)
            return variables;
        }).catch(e => console.error(e))
    } else if ($layerStore) {
        // Mostly for the global configuration panel with sections
        getVariablesByLayers($layerStore.name).then((variables) => {
            console.log('variables byLayers:',variables)
            return variables;
        }).catch(e => console.error(e))
    } else {
        // For a case where you need to get all variables without any restriction
        getAllVariables().then((variables) => {
            console.log('variables all:',variables)
            return variables;
        }).catch(e => console.error(e))
    }
});
