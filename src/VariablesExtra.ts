import type { ITiledMapLayer, ITiledMapObject } from "@workadventure/tiled-map-type-guard/dist";
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
        const readableBy = this.properties.getString("readableBy");
        if (!readableBy) {
            return true;
        }
        return WA.player.tags.includes(readableBy);
    }

    public get isWritable(): boolean {
        const writableBy = this.properties.getString("writableBy");
        if (!writableBy) {
            return true;
        }
        return WA.player.tags.includes(writableBy);
    }
}

export async function getAllVariables(): Promise<Map<string, VariableDescriptor>> {
    const map = await WA.room.getTiledMap();
    const variables = new Map<string, VariableDescriptor>();

    getAllVariablesRecursive(map.layers, variables);

    return variables;
}

export async function getVariablesByLayers(layerNames: string|Array<string>): Promise<Map<string, VariableDescriptor>> {
    const map = await WA.room.getTiledMap();
    const variables = new Map<string, VariableDescriptor>();
    let layerNamesArray: Array<string> = []

    if (typeof layerNames === 'string') {
        layerNamesArray.push(layerNames)
    } else {
        layerNamesArray = layerNames
    }

    getAllVariablesRecursive(map.layers, variables, layerNamesArray, []);

    return variables;
}

export async function getVariablesByNames(variableNames: string|Array<string>): Promise<Map<string, VariableDescriptor>> {
    const map = await WA.room.getTiledMap();
    const variables = new Map<string, VariableDescriptor>();
    let variableNamesArray: Array<string> = []

    if (typeof variableNames === 'string') {
        variableNamesArray.push(variableNames)
    } else {
        variableNamesArray = variableNames
    }

    getAllVariablesRecursive(map.layers, variables, [], variableNamesArray);

    return variables;
}

function getAllVariablesRecursive(
    layers: ITiledMapLayer[],
    variables: Map<string, VariableDescriptor>,
    layerNames?: Array<string>,
    variablesNames?: Array<string>
): void {
    for (const layer of layers) {
        if (!!(layerNames?.length)) {
            if (layerNames.includes(layer.name)) {
                if (layer.type === "objectgroup") {
                    for (const object of layer.objects) {
                        if (object.type === "variable") {
                            // if variables must be filtered, we set only these variables
                            if (!!(variablesNames?.length)) {
                                if (variablesNames.includes(object.name)) {
                                    console.log('SET with filter',object.name)
                                    variables.set(object.name, new VariableDescriptor(object));
                                }
                            } else {
                                console.log('SET',object.name)
                                variables.set(object.name, new VariableDescriptor(object));
                            }
                        }
                    }
                } else if (layer.type === "group") {
                    getAllVariablesRecursive(layer.layers, variables, variablesNames);
                }
            } else {
                if (layer.type === "objectgroup") {
                    for (const object of layer.objects) {
                        if (object.type === "variable") {
                            // if variables must be filtered, we set only these variables
                            if (!!(variablesNames?.length)) {
                                if (variablesNames.includes(object.name)) {
                                    console.log('SET with filter',object.name)
                                    variables.set(object.name, new VariableDescriptor(object));
                                }
                            } else {
                                console.log('SET',object.name)
                                variables.set(object.name, new VariableDescriptor(object));
                            }
                        }
                    }
                } else if (layer.type === "group") {
                    getAllVariablesRecursive(layer.layers, variables, variablesNames);
                }
            }
        }
    }
}
