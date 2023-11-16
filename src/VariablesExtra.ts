import type { ITiledMapLayer, ITiledMapObject } from "@workadventure/tiled-map-type-guard/dist";
import { Properties } from "./Properties";
import { defaultAssetsUrl } from "./Features/default_assets_url";

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

/**
 * Opens the local configuration panel.
 * You can filter which variables to configure by passing their names in parameter.
 */
export function openConfig(variables?: string[]): void {
    const parameters = variables ? "#" + variables.join() : "";
    WA.nav.openCoWebSite(defaultAssetsUrl + "/configuration.html" + parameters, true);
}

export async function getVariables(
    layerFilter?: string,
    variablesFilter?: Array<string>,
): Promise<Map<string, VariableDescriptor>> {
    const map = await WA.room.getTiledMap();
    const variables = new Map<string, VariableDescriptor>();

    getAllVariablesRecursive(
        map.layers as ITiledMapLayer[],
        variables,
        layerFilter,
        variablesFilter,
    );

    return variables;
}

function getAllVariablesRecursive(
    layers: ITiledMapLayer[],
    variables: Map<string, VariableDescriptor>,
    layerFilter?: string,
    variablesFilter?: Array<string>,
): void {
    for (const layer of layers) {
        if (layer.type === "objectgroup") {
            for (const object of layer.objects) {
                if (object.type === "variable" || object.class === "variable") {
                    // Here we now that we are looking at a variable
                    // but depending on the cases, only some variables should be added to the map (shown in the configuration panel)

                    // In this case: we only want to keep the variables of a specific layer
                    if (!!layerFilter && layer.name !== layerFilter) continue;
                    // In this case: we only want to keep the variables with a specific name
                    if (!!variablesFilter && !variablesFilter.includes(object.name)) continue;

                    variables.set(object.name, new VariableDescriptor(object));
                }
            }
        } else if (layer.type === "group") {
            // If the current layer is a group, re-run the same method with its layers
            getAllVariablesRecursive(layer.layers, variables, layerFilter, variablesFilter);
        }
    }
}
