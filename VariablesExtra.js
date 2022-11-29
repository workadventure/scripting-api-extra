import { Properties } from "./Properties";
import { defaultAssetsUrl } from "./Features/default_assets_url";
export class VariableDescriptor {
    constructor(object) {
        this.name = object.name;
        this.x = object.x;
        this.y = object.y;
        this.properties = new Properties(object.properties);
    }
    get isReadable() {
        const readableBy = this.properties.getString("readableBy");
        if (!readableBy) {
            return true;
        }
        return WA.player.tags.includes(readableBy);
    }
    get isWritable() {
        const writableBy = this.properties.getString("writableBy");
        if (!writableBy) {
            return true;
        }
        return WA.player.tags.includes(writableBy);
    }
}
export function openConfig(variables) {
    const parameters = variables ? "#" + variables.join() : "";
    WA.nav.openCoWebSite(defaultAssetsUrl + "/configuration.html" + parameters);
}
export async function getVariables(layerFilter, variablesFilter) {
    const map = await WA.room.getTiledMap();
    const variables = new Map();
    getAllVariablesRecursive(map.layers, variables, layerFilter, variablesFilter);
    return variables;
}
function getAllVariablesRecursive(layers, variables, layerFilter, variablesFilter) {
    for (const layer of layers) {
        if (layer.type === "objectgroup") {
            for (const object of layer.objects) {
                if (object.type === "variable" || object.class === "variable") {
                    if (!!layerFilter && layer.name !== layerFilter)
                        continue;
                    if (!!variablesFilter && !variablesFilter.includes(object.name))
                        continue;
                    variables.set(object.name, new VariableDescriptor(object));
                }
            }
        }
        else if (layer.type === "group") {
            getAllVariablesRecursive(layer.layers, variables, layerFilter, variablesFilter);
        }
    }
}
//# sourceMappingURL=VariablesExtra.js.map