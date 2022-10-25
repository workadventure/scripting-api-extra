import { getLayersMap } from "../LayersFlattener";
import { TemplateValue } from "../TemplateValue";
import { getAreaObject } from "../AreaObject";

export async function initPropertiesTemplatesArea(): Promise<void> {
    const areas = await getAreaObject();
    for (const area of areas) {
        const properties = area.properties ?? [];
        for (const property of properties) {
            if (
                property.type === "int" ||
                property.type === "bool" ||
                property.type === "object" ||
                typeof property.value !== "string"
            ) {
                continue;
            }
            const template = new TemplateValue(property.value, WA.state);
            if (template.isPureString()) {
                continue;
            }
            const newValue = template.getValue();
            await setPropertyArea(area.name, property.name, newValue);

            template.onChange(async (newValue) => {
                await setPropertyArea(area.name, property.name, newValue);
            });
        }
    }
}

export async function initPropertiesTemplates(): Promise<void> {
    const layers = await getLayersMap();

    for (const [layerName, layer] of layers.entries()) {
        if (layer.type !== "objectgroup") {
            const properties = layer.properties ?? [];
            for (const property of properties) {
                if (
                    property.type === "int" ||
                    property.type === "bool" ||
                    property.type === "object" ||
                    typeof property.value !== "string"
                ) {
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
}

async function setPropertyArea(
    areaName: string,
    propertyName: string,
    value: string,
): Promise<void> {
    console.log(areaName);
    const area = await WA.room.area.get(areaName);
    area.setProperty(propertyName, value);
}
/**
 * Sets the property value on the map.
 * Furthermore, if the property name is "visible", modify the visibility of the layer.
 */
function setProperty(layerName: string, propertyName: string, value: string): void {
    WA.room.setProperty(layerName, propertyName, value);
    if (propertyName === "visible") {
        if (value) {
            WA.room.showLayer(layerName);
        } else {
            WA.room.hideLayer(layerName);
        }
    }
}
