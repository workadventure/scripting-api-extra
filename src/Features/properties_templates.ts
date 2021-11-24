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
            setLayerProperty(layerName, property.name, newValue);

            template.onChange((newValue) => {
                setLayerProperty(layerName, property.name, newValue);
            });
        }

        // Parse the URL of the integrated websites (for example if mustache is used)
        // Here we want to select the Tiled object layers with the type 'website' and the property 'url'
        let promises = []
        if (layer.type === "objectgroup") {
            for (const object of layer.objects) {
                if (object.type === "website") {
                    for (const property of object.properties) {
                        if (property.name === "url") {
                            const template = new TemplateValue(property.value, WA.state);
                            if (template.isPureString()) {
                                continue;
                            }
                            const newValue = template.getValue();
                            promises.push(setWebsiteProperty(object.name, newValue));

                            template.onChange((newValue) => {
                                setWebsiteProperty(object.name, newValue);
                            });
                        }
                    }
                }
            }
        }
        await Promise.all(promises);
    }
}

/**
 * Sets the property value of a layer on the map.
 * Furthermore, if the property name is "visible", modify the visibility of the layer.
 */
function setLayerProperty(layerName: string, propertyName: string, value: string): void {
    WA.room.setProperty(layerName, propertyName, value);
    if (propertyName === "visible") {
        if (value) {
            WA.room.showLayer(layerName);
        } else {
            WA.room.hideLayer(layerName);
        }
    }
}

/**
 * Sets the property value of an object of type 'website' on the map.
 */
async function setWebsiteProperty(objectName: string, value: string): Promise<void> {
    const website = await WA.room.website.get(objectName);
    website.url = value;
}
