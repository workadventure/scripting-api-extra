import { getLayersMap } from "../LayersFlattener";
import { TemplateValue } from "../TemplateValue";

export async function initPropertiesTemplates(): Promise<void> {
    const layers = await getLayersMap();

    for (const [layerName, layer] of layers.entries()) {
        const properties = layer.properties ?? [];
        for (const property of properties) {
            if (property.type === "int" || property.type === "bool" || property.type === "object") {
                continue;
            }
            const template = new TemplateValue(property.value, WA.state);
            if (template.isPureString()) {
                continue;
            }
            const newValue = template.getValue();
            setProperty(layerName, property.name, newValue);

            template.onChange((newValue) => {
                setProperty(layerName, property.name, newValue);
            });
        }
    }
}

/**
 * Sets the property value on the map.
 * Furthermore, if the property name is "visible", modify the visibility of the layer.
 */
function setProperty(layerName: string, propertyName: string, value: string) {
    WA.room.setProperty(layerName, propertyName, value);
    if (propertyName === 'visible') {
        if (value) {
            WA.room.showLayer(layerName);
        } else {
            WA.room.hideLayer(layerName);
        }
    }
}
