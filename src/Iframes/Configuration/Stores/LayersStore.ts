import { derived, Readable, writable } from "svelte/store";
import type { ITiledMapLayer } from "@workadventure/tiled-map-type-guard/dist";
import { currentPage } from "./NavigationStore";

// TODO: add a store for all layers flattened
//  and call getTiledMap() only once onInit to set the map layers

export const loadingConfigurationLayerStore = writable<boolean>(false);
export const configurationLayerStore = derived<Readable<string>, ITiledMapLayer | undefined>(
    currentPage,
    ($currentPage, set) => {
        loadingConfigurationLayerStore.set(true);
        WA.room
            .getTiledMap()
            .then((tiledMap) => {
                const configurationLayer = tiledMap.layers.find(
                    (layer) => layer.name === "configuration",
                );

                if (configurationLayer === undefined) {
                    throw new Error(
                        'Could not find a layer with the name "configuration" on the map',
                    );
                }

                set(findLayer($currentPage, configurationLayer as ITiledMapLayer));
                loadingConfigurationLayerStore.set(false);
            })
            .catch((e) => {
                console.error("Error while loading the configuration layer", e);
                loadingConfigurationLayerStore.set(false);
            });
    },
);

function findLayer(name: string, configurationLayer: ITiledMapLayer): ITiledMapLayer {
    const layer = recursiveFindLayer(name, configurationLayer);
    if (layer === undefined) {
        throw new Error("Cannot find layer with name " + name);
    }
    return layer;
}
function recursiveFindLayer(name: string, layer: ITiledMapLayer): ITiledMapLayer | undefined {
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
