import {derived, Readable} from 'svelte/store';
import type {ITiledMap, ITiledMapLayer} from "@workadventure/tiled-map-type-guard/dist";
import {currentPage} from "./NavigationStore";

export const layerStore = derived<Readable<string>, ITiledMapLayer|undefined>(currentPage, ($currentPage) => {
    WA.room.getTiledMap().then((tiledMap: ITiledMap) => {
        const configurationLayer = tiledMap.layers.find((layer: ITiledMapLayer) => layer.name === "configuration");

        if (configurationLayer === undefined) {
            throw new Error('Could not find a layer with the name "configuration" on the map');
        }

        console.log('layerStore tiledMap',tiledMap)
        console.log('layerStore $currentPage value',$currentPage)
        return findLayer($currentPage, configurationLayer)
    }).catch(e => console.error(e))
});

function findLayer(name: string, configurationLayer: ITiledMapLayer): ITiledMapLayer {
    const layer = recursiveFindLayer(name, configurationLayer);
    if (layer === undefined) {
        throw new Error("Cannot find layer with name "+name);
    }
    return layer;
}
function recursiveFindLayer(name: string, layer: ITiledMapLayer): ITiledMapLayer|undefined {
    if (name === layer.name) {
        return layer;
    }

    if (layer.type === 'group') {
        for (const innerLayer of layer.layers) {
            const result = recursiveFindLayer(name, innerLayer);
            if (result) {
                return result;
            }
        }
    }

    return undefined;
}

