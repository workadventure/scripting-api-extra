import { ITiledMapObject } from "@workadventure/tiled-map-type-guard/dist";
import { Properties } from "./Properties";

export class VariableDescriptor {
    public readonly name;
    public readonly x;
    public readonly y;
    public readonly properties;

    public constructor(object: ITiledMapObject) {
        this.name = object.name;
        this.x = object.x;
        this.y = object.y;
        this.properties = new Properties(object.properties);
    }
}

export async function getAllVariables(): Promise<Map<string, VariableDescriptor>> {
    const map = await WA.room.getTiledMap();

    const variables = new Map<string, VariableDescriptor>();

    for (const layer of map.layers) {
        if (layer.type === "objectgroup") {
            for (const object of layer.objects) {
                if (object.type === "variable") {
                    variables.set(object.name, new VariableDescriptor(object));
                }
            }
        }
    }

    return variables;
}
