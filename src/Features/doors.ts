import { getAllVariables, VariableDescriptor } from "../VariablesExtra";
import { getLayersMap } from "../LayersFlattener";
import { Properties } from "../Properties";
import { findLayerBoundaries } from "../LayersExtra";
import { ITiledMapTileLayer } from "@workadventure/tiled-map-type-guard/dist/ITiledMapTileLayer";

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

function initDoorstep(
    layer: ITiledMapTileLayer,
    doorVariable: string,
    properties: Properties,
): void {
    const name = layer.name;
    let actionMessage = undefined;
    let keypadWebsite = undefined;
    let inZone = false;

    const zoneName = properties.getOneString("zone");
    if (!zoneName) {
        throw new Error('Missing "zone" property on doorstep layer "' + name + '"');
    }

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

    function displayOpenDoorMessage(): void {
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

    function openKeypad(name: string): void {
        const boundaries = findLayerBoundaries(layer);

        keypadWebsite = WA.room.website.create({
            name: "doorKeypad" + name,
            url: "../../keypad.html?layer=" + encodeURIComponent(name),
            position: {
                x: (boundaries.right + 1) * 32,
                y: boundaries.top * 32,
                width: 32 * 3,
                height: 32 * 4,
            },
            allowApi: true,
        });
    }

    function closeKeypad(): void {
        if (keypadWebsite) {
            WA.room.website.delete(keypadWebsite.name);
        }
    }

    WA.room.onEnterZone(zoneName, () => {
        console.log("Enter zone", zoneName);
        inZone = true;
        if (properties.getOneBoolean("autoOpen")) {
            WA.state[doorVariable] = true;
            return;
        }

        if (!WA.state[doorVariable] && properties.getOneString("code")) {
            openKeypad(name);
            return;
        }

        if (WA.state[doorVariable]) {
            displayCloseDoorMessage();
        } else {
            displayOpenDoorMessage();
        }
    });

    WA.room.onLeaveZone(zoneName, () => {
        console.log("Leave zone", zoneName);
        inZone = false;
        if (properties.getOneBoolean("autoClose")) {
            WA.state[doorVariable] = false;
        }

        if (actionMessage) {
            actionMessage.remove();
        }
        closeKeypad();
    });

    WA.state.onVariableChange(doorVariable).subscribe(() => {
        if (inZone) {
            if (!properties.getOneBoolean("autoClose") && WA.state[doorVariable] === true) {
                displayCloseDoorMessage();
            }

            if (keypadWebsite && WA.state[doorVariable] === true) {
                closeKeypad();
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
            initDoorstep(layer, doorVariable, properties);
        }
    }
}
