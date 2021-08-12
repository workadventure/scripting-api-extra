import { getAllVariables, VariableDescriptor } from "../VariablesExtra";
import { getLayersMap } from "../LayersFlattener";
import { Properties } from "../Properties";

/**
 * Updates the layers representing the door to match the state of the variable.
 */
function updateDoorLayers(variable: VariableDescriptor): void {
    if (WA.state[variable.name]) {
        let layers = variable.properties.getMany("openLayer");
        for (const layer of layers) {
            WA.room.showLayer(layer as string);
        }

        layers = variable.properties.getMany("closeLayer");
        for (const layer of layers) {
            WA.room.hideLayer(layer as string);
        }
    } else {
        let layers = variable.properties.getMany("openLayer");
        for (const layer of layers) {
            WA.room.hideLayer(layer as string);
        }

        layers = variable.properties.getMany("closeLayer");
        for (const layer of layers) {
            WA.room.showLayer(layer as string);
        }
    }
}

function initDoor(variable: VariableDescriptor): void {
    WA.state.onVariableChange(variable.name).subscribe(() => {
        updateDoorLayers(variable);
    });
    updateDoorLayers(variable);
}

function initDoorstep(name: string, doorVariable: string, properties: Properties): void {
    let actionMessage = undefined;
    let inZone = false;

    function displayCloseDoorMessage(): void {
        if (actionMessage) {
            actionMessage.remove();
        }

        actionMessage = WA.ui.displayActionMessage({
            message:
                properties.getOneString("closeTriggerMessage") ?? "Press SPACE to close the door",
            callback: () => {
                WA.state[doorVariable] = false;
                displayOpenDoorMessage();
            },
        });
    }

    function displayOpenDoorMessage() {
        if (actionMessage) {
            actionMessage.remove();
        }

        actionMessage = WA.ui.displayActionMessage({
            message:
                properties.getOneString("openTriggerMessage") ?? "Press SPACE to open the door",
            callback: () => {
                WA.state[doorVariable] = true;
                displayCloseDoorMessage();
            },
        });
    }

    WA.room.onEnterZone(name, () => {
        console.log("Enter zone", name);
        inZone = true;
        if (properties.getOneBoolean("autoOpen")) {
            WA.state[doorVariable] = true;
            return;
        }

        if (WA.state[doorVariable]) {
            displayCloseDoorMessage();
        } else {
            displayOpenDoorMessage();
        }
    });

    WA.room.onLeaveZone(name, () => {
        console.log("Leave zone", name);
        inZone = false;
        if (properties.getOneBoolean("autoClose")) {
            WA.state[doorVariable] = false;
        }

        if (actionMessage) {
            actionMessage.remove();
        }
    });

    WA.state.onVariableChange(doorVariable).subscribe(() => {
        if (inZone) {
            if (!properties.getOneBoolean("autoClose") && WA.state[doorVariable] === true) {
                displayCloseDoorMessage();
            }
            if (!properties.getOneBoolean("autoOpen") && WA.state[doorVariable] === false) {
                displayOpenDoorMessage();
            }
        }
    });
}

export async function initDoors(): Promise<void> {
    const variables = await getAllVariables();

    for (const variable of variables.values()) {
        if (variable.properties.getOne("door")) {
            initDoor(variable);
        }
    }

    const layers = await getLayersMap();

    for (const layer of layers.values()) {
        const properties = new Properties(layer.properties);
        const doorVariable = properties.getOneString("doorVariable");
        if (doorVariable) {
            initDoorstep(layer.name, doorVariable, properties);
        }
    }
}
