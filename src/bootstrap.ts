// This file automatically bootstraps all the features on WA initialization.
// Importing this file creates a number of side effects.

import { initDoors } from "./Features/doors";
import { initVariableActions } from "./Features/variable_actions";
import { initConfiguration } from "./Features/configuration";
import { initPropertiesTemplates } from "./Features/properties_templates";

WA.onInit().then(() => {
    initDoors().catch((e) => console.error(e));
    initVariableActions().catch((e) => console.error(e));
    initConfiguration();
    initPropertiesTemplates().catch((e) => console.error(e));
});

export {};
