import { getAllVariables, VariableDescriptor } from "../VariablesExtra";

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

export async function initDoors(): Promise<void> {
    const variables = await getAllVariables();

    for (const variable of variables.values()) {
        if (variable.properties.getOne("door")) {
            initDoor(variable);
        }
    }
}
