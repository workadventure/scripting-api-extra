let layersMapPromise = undefined;
export async function getLayersMap() {
    if (layersMapPromise === undefined) {
        layersMapPromise = getLayersMapWithoutCache();
    }
    return layersMapPromise;
}
async function getLayersMapWithoutCache() {
    return flattenGroupLayersMap((await WA.room.getTiledMap()));
}
function flattenGroupLayersMap(map) {
    const flatLayers = new Map();
    flattenGroupLayers(map.layers, "", flatLayers);
    return flatLayers;
}
function flattenGroupLayers(layers, prefix, flatLayers) {
    for (const layer of layers) {
        if (layer.type === "group") {
            flattenGroupLayers(layer.layers, prefix + layer.name + "/", flatLayers);
        }
        else {
            layer.name = prefix + layer.name;
            flatLayers.set(layer.name, layer);
        }
    }
}
//# sourceMappingURL=LayersFlattener.js.map