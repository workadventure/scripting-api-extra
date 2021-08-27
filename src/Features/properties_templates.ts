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
            WA.room.setProperty(layerName, property.name, newValue);
            console.warn(newValue);
            template.onChange((newValue) => {
                WA.room.setProperty(layerName, property.name, newValue);
            });
        }
    }
}
