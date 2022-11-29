import { getLayersMap } from "../LayersFlattener";
import { TemplateValue } from "../TemplateValue";
import { getAreaObject } from "../AreaObject";
export async function initPropertiesTemplatesArea() {
    var _a;
    const areas = await getAreaObject();
    for (const area of areas) {
        const properties = (_a = area.properties) !== null && _a !== void 0 ? _a : [];
        for (const property of properties) {
            if (property.type === "int" ||
                property.type === "bool" ||
                property.type === "object" ||
                typeof property.value !== "string") {
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
export async function initPropertiesTemplates() {
    var _a;
    const layers = await getLayersMap();
    for (const [layerName, layer] of layers.entries()) {
        if (layer.type !== "objectgroup") {
            const properties = (_a = layer.properties) !== null && _a !== void 0 ? _a : [];
            for (const property of properties) {
                if (property.type === "int" ||
                    property.type === "bool" ||
                    property.type === "object" ||
                    typeof property.value !== "string") {
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
async function setPropertyArea(areaName, propertyName, value) {
    console.log(areaName);
    const area = await WA.room.area.get(areaName);
    area.setProperty(propertyName, value);
}
function setProperty(layerName, propertyName, value) {
    WA.room.setProperty(layerName, propertyName, value);
    if (propertyName === "visible") {
        if (value) {
            WA.room.showLayer(layerName);
        }
        else {
            WA.room.hideLayer(layerName);
        }
    }
}
//# sourceMappingURL=properties_templates.js.map