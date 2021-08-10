import type { ITiledMap, ITiledMapLayer } from "@workadventure/tiled-map-type-guard/dist";

export async function getFlattenedLayers(): ITiledMapLayer[] {
    return flattenGroupLayersMap(await WA.room.getTiledMap());
}

/**
 * Flatten the grouped layers
 */
function flattenGroupLayersMap(map: ITiledMap): ITiledMapLayer[] {
    const flatLayers: ITiledMapLayer[] = [];
    flattenGroupLayers(map.layers, "", flatLayers);
    return flatLayers;
}

function flattenGroupLayers(
    layers: ITiledMapLayer[],
    prefix: string,
    flatLayers: ITiledMapLayer[],
): void {
    for (const layer of layers) {
        if (layer.type === "group") {
            flattenGroupLayers(layer.layers, prefix + layer.name + "/", flatLayers);
        } else {
            layer.name = prefix + layer.name;
            flatLayers.push(layer);
        }
    }
}
