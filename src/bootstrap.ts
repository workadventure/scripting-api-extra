// This file automatically bootstraps all the features on WA initialization.
// Importing this file creates a number of side effects.

import { initDoors } from "./Features/doors";
import { initVariableActions } from "./Features/variable_actions";

WA.onInit().then(() => {
    initDoors().catch((e) => console.error(e));
    initVariableActions().catch((e) => console.error(e));
});

export {};
