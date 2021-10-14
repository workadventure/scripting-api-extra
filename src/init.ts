import { initDoors } from "./Features/doors";
import { initSpecialProperties } from "./Features/special_properties";
import { initConfiguration } from "./Features/configuration";
import { initPropertiesTemplates } from "./Features/properties_templates";
import {initTutorial} from "./Features/tutorial";

/**
 * Bootstraps all the features of the extra library.
 * This function must be called once if you are importing this library in your own WorkAdventure script.
 */
export function bootstrapExtra(): Promise<void> {
    return WA.onInit().then(() => {
        initDoors().catch((e) => console.error(e));
        initSpecialProperties().catch((e) => console.error(e));
        initConfiguration().catch((e) => console.error(e));
        initPropertiesTemplates().catch((e) => console.error(e));
        initTutorial();
    });
}
