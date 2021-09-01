// This file automatically bootstraps all the features on WA initialization.
// Importing this file creates a number of side effects.

import { initDoors } from "./Features/doors";
import { initConfiguration } from "./Features/configuration";
import { initPropertiesTemplates } from "./Features/properties_templates";
import {initSpecialProperties} from "./Features/special_properties";

WA.onInit().then(() => {
    initDoors().catch((e) => console.error(e));
    initSpecialProperties().catch((e) => console.error(e));
    initConfiguration().catch((e) => console.error(e));
    initPropertiesTemplates().catch((e) => console.error(e));
});

export {};
