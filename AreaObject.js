import { getLayersMap } from "./LayersFlattener";
export async function getAreaObject() {
    const layers = await getLayersMap();
    const areaArray = [];
    for (const layer of layers.values()) {
        if (layer.type === "objectgroup") {
            for (const object of layer.objects) {
                if (object.type === "area" || object.class === "area") {
                    areaArray.push(object);
                }
            }
        }
    }
    return areaArray;
}
//# sourceMappingURL=AreaObject.js.map