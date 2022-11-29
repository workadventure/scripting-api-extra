import { getLayersMap } from "../LayersFlattener";
import { Properties } from "../Properties";
import { initVariableActionLayer } from "./variable_actions";
export async function initSpecialProperties() {
    const layers = await getLayersMap();
    for (const layer of layers.values()) {
        const properties = new Properties(layer.properties);
        initVariableActionLayer(properties, layer.name);
    }
}
//# sourceMappingURL=special_properties.js.map