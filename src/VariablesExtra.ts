import type { ITiledMapObject } from "@workadventure/tiled-map-type-guard/dist";
import { Properties } from "./Properties";

export class VariableDescriptor {
    public readonly name: string;
    public readonly x: number;
    public readonly y: number;
    public readonly properties: Properties;

    public constructor(object: ITiledMapObject) {
        this.name = object.name;
        this.x = object.x;
        this.y = object.y;
        this.properties = new Properties(object.properties);
    }

    public get isReadable(): boolean {
        const readableBy = this.properties.getString('readableBy');
        if (!readableBy) {
            return true;
        }
        return WA.player.tags.includes(readableBy);
    }

    public get isWritable(): boolean {
        const writableBy = this.properties.getString('writableBy');
        if (!writableBy) {
            return true;
        }
        return WA.player.tags.includes(writableBy);
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
