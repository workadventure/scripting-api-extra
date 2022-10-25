import type { ITiledMapObject } from "@workadventure/tiled-map-type-guard/dist/ITiledMapObject";
import { getLayersMap } from "./LayersFlattener";

export async function getAreaObject(): Promise<ITiledMapObject[]> {
    const layers = await getLayersMap();
    const areaArray: Array<ITiledMapObject> = [];
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
