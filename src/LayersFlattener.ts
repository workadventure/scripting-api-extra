import type { ITiledMap, ITiledMapLayer } from "@workadventure/tiled-map-type-guard";

let layersMapPromise: Promise<Map<string, ITiledMapLayer>> | undefined = undefined;

/**
 * Returns a map of all layers in a uni-dimensional map.
 * Layers are renamed: if they are in a group layer, the name of the group layer is prepended with a "/" as a separator.
 * Layers are indexed by name.
 */
export async function getLayersMap(): Promise<Map<string, ITiledMapLayer>> {
    if (layersMapPromise === undefined) {
        layersMapPromise = getLayersMapWithoutCache();
    }
    return layersMapPromise;
}

async function getLayersMapWithoutCache(): Promise<Map<string, ITiledMapLayer>> {
    return flattenGroupLayersMap((await WA.room.getTiledMap()) as ITiledMap);
}

/**
 * Flatten the grouped layers
 */
function flattenGroupLayersMap(map: ITiledMap): Map<string, ITiledMapLayer> {
    const flatLayers = new Map<string, ITiledMapLayer>();
    flattenGroupLayers(map.layers, "", flatLayers);
    return flatLayers;
}

function flattenGroupLayers(
    layers: ITiledMapLayer[],
    prefix: string,
    flatLayers: Map<string, ITiledMapLayer>,
): void {
    for (const layer of layers) {
        if (layer.type === "group") {
            flattenGroupLayers(layer.layers, prefix + layer.name + "/", flatLayers);
        } else {
            layer.name = prefix + layer.name;
            flatLayers.set(layer.name, layer);
        }
    }
}
