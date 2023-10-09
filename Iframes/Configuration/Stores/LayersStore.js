import { derived, writable } from "svelte/store";
import { currentPage } from "./NavigationStore";
export const loadingConfigurationLayerStore = writable(false);
export const configurationLayerStore = derived(currentPage, ($currentPage, set) => {
    loadingConfigurationLayerStore.set(true);
    WA.room
        .getTiledMap()
        .then((tiledMap) => {
        const configurationLayer = tiledMap.layers.find((layer) => layer.name === "configuration");
        if (configurationLayer === undefined) {
            throw new Error('Could not find a layer with the name "configuration" on the map');
        }
        set(findLayer($currentPage, configurationLayer));
        loadingConfigurationLayerStore.set(false);
    })
        .catch((e) => {
        console.error("Error while loading the configuration layer", e);
        loadingConfigurationLayerStore.set(false);
    });
});
function findLayer(name, configurationLayer) {
    const layer = recursiveFindLayer(name, configurationLayer);
    if (layer === undefined) {
        throw new Error("Cannot find layer with name " + name);
    }
    return layer;
}
function recursiveFindLayer(name, layer) {
    if (name === layer.name) {
        return layer;
    }
    if (layer.type === "group") {
        for (const innerLayer of layer.layers) {
            const result = recursiveFindLayer(name, innerLayer);
            if (result) {
                return result;
            }
        }
    }
    return undefined;
}
//# sourceMappingURL=LayersStore.js.map