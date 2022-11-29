import { initDoors } from "./Features/doors";
import { initSpecialProperties } from "./Features/special_properties";
import { initConfiguration } from "./Features/configuration";
import { initPropertiesTemplates, initPropertiesTemplatesArea, } from "./Features/properties_templates";
export function bootstrapExtra() {
    return WA.onInit()
        .then(() => {
        initDoors().catch((e) => console.error(e));
        initSpecialProperties().catch((e) => console.error(e));
        initConfiguration().catch((e) => console.error(e));
        initPropertiesTemplates().catch((e) => console.error(e));
        initPropertiesTemplatesArea().catch((e) => console.error(e));
    })
        .catch((e) => console.error(e));
}
//# sourceMappingURL=init.js.map