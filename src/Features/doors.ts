import { getAllVariables, VariableDescriptor } from "../VariablesExtra";
import { getLayersMap } from "../LayersFlattener";
import { Properties } from "../Properties";
import { findLayerBoundaries, findLayersBoundaries } from "../LayersExtra";
import { ITiledMapLayer } from "@workadventure/tiled-map-type-guard/dist";
import { ITiledMapTileLayer } from "@workadventure/tiled-map-type-guard/dist/ITiledMapTileLayer";
import { Popup } from "@workadventure/iframe-api-typings/Api/iframe/Ui/Popup";
import { ActionMessage } from "@workadventure/iframe-api-typings/Api/iframe/Ui/ActionMessage";
import { EmbeddedWebsite } from "@workadventure/iframe-api-typings/Api/iframe/Room/EmbeddedWebsite";

let layersMap!: Map<string, ITiledMapLayer>;
let playerX = 0;
let playerY = 0;

/**
 * Updates the layers representing the door to match the state of the variable.
 */
function updateDoorLayers(variable: VariableDescriptor): void {
    if (WA.state[variable.name]) {
        let layers = variable.properties.mustGetString("openLayer");
        for (const layer of layers.split("\n")) {
            WA.room.showLayer(layer);
        }

        layers = variable.properties.mustGetString("closeLayer");
        for (const layer of layers.split("\n")) {
            WA.room.hideLayer(layer);
        }
    } else {
        let layers = variable.properties.mustGetString("openLayer");
        for (const layer of layers.split("\n")) {
            WA.room.hideLayer(layer);
        }

        layers = variable.properties.mustGetString("closeLayer");
        for (const layer of layers.split("\n")) {
            WA.room.showLayer(layer);
        }
    }
}

function playOpenSound(variable: VariableDescriptor): void {
    const url = variable.properties.getString("openSound");
    const radius = variable.properties.getNumber("soundRadius");
    let volume = 1;
    if (radius) {
        const distance = getDistance(variable.properties.mustGetString("openLayer").split("\n"));
        if (distance > radius) {
            return;
        }
        volume = 1 - distance / radius;
    }

    if (url) {
        WA.sound.loadSound(url).play({
            volume,
        });
    }
}

function playCloseSound(variable: VariableDescriptor): void {
    const url = variable.properties.getString("closeSound");
    const radius = variable.properties.getNumber("soundRadius");
    let volume = 1;
    if (radius) {
        const distance = getDistance(variable.properties.mustGetString("closeLayer").split("\n"));
        if (distance > radius) {
            return;
        }
        volume = 1 - distance / radius;
    }

    if (url) {
        WA.sound.loadSound(url).play({
            volume,
        });
    }
}

/**
 * Get the distance between the player and the center of the layer passed in parameter.
 */
function getDistance(layerNames: string[]): number {
    const layers: ITiledMapTileLayer[] = layerNames
        .map((layerName) => layersMap.get(layerName))
        .filter((layer) => layer?.type === "tilelayer") as ITiledMapTileLayer[];
    const boundaries = findLayersBoundaries(layers);
    const xLayer = ((boundaries.right - boundaries.left) / 2 + boundaries.left) * 32;
    const yLayer = ((boundaries.bottom - boundaries.top) / 2 + boundaries.top) * 32;

    return Math.sqrt(Math.pow(playerX - xLayer, 2) + Math.pow(playerY - yLayer, 2));
}

function initDoor(variable: VariableDescriptor): void {
    WA.state.onVariableChange(variable.name).subscribe(() => {
        if (WA.state[variable.name]) {
            playOpenSound(variable);
        } else {
            playCloseSound(variable);
        }

        updateDoorLayers(variable);
    });
    updateDoorLayers(variable);
}

function initDoorstep(
    layer: ITiledMapTileLayer,
    doorVariable: string,
    properties: Properties,
    assetsUrl: string,
): void {
    const name = layer.name;
    let actionMessage: ActionMessage | undefined = undefined;
    let keypadWebsite: EmbeddedWebsite | undefined = undefined;
    let inZone = false;

    const zoneName = properties.getString("zone");
    if (!zoneName) {
        throw new Error('Missing "zone" property on doorstep layer "' + name + '"');
    }

    const tag = properties.getString("tag");
    let allowed = true;
    if (tag && !WA.player.tags.includes(tag)) {
        allowed = false;
    }
    const accessRestricted = !!tag;

    function displayCloseDoorMessage(): void {
        if (actionMessage) {
            actionMessage.remove();
        }

        actionMessage = WA.ui.displayActionMessage({
            message: properties.getString("closeTriggerMessage") ?? "Press SPACE to close the door",
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
            message: properties.getString("openTriggerMessage") ?? "Press SPACE to open the door",
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
            url: assetsUrl + "/keypad.html#" + encodeURIComponent(name),
            position: {
                x: boundaries.right * 32,
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
            keypadWebsite = undefined;
        }
    }

    WA.room.onEnterZone(zoneName, () => {
        inZone = true;
        if (properties.getBoolean("autoOpen") && allowed) {
            WA.state[doorVariable] = true;
            return;
        }

        if (
            !WA.state[doorVariable] &&
            ((accessRestricted && !allowed) || !accessRestricted) && // Do not display code if user is allowed by tag
            (properties.getString("code") || properties.getString("codeVariable"))
        ) {
            openKeypad(name);
            return;
        }

        if (!allowed) {
            return;
        }

        if (WA.state[doorVariable]) {
            displayCloseDoorMessage();
        } else {
            displayOpenDoorMessage();
        }
    });

    WA.room.onLeaveZone(zoneName, () => {
        inZone = false;
        if (properties.getBoolean("autoClose")) {
            WA.state[doorVariable] = false;
        }

        if (actionMessage) {
            actionMessage.remove();
        }
        closeKeypad();
    });

    WA.state.onVariableChange(doorVariable).subscribe(() => {
        if (inZone) {
            if (!properties.getBoolean("autoClose") && WA.state[doorVariable] === true) {
                displayCloseDoorMessage();
            }

            if (keypadWebsite && WA.state[doorVariable] === true) {
                closeKeypad();
            }

            if (!properties.getBoolean("autoOpen") && WA.state[doorVariable] === false) {
                displayOpenDoorMessage();
            }
        }
    });
}

function playBellSound(variable: VariableDescriptor): void {
    const url = variable.properties.mustGetString("bellSound");
    const radius = variable.properties.getNumber("soundRadius");
    let volume = 1;
    if (radius) {
        const distance = Math.sqrt(
            Math.pow(variable.x - playerX, 2) + Math.pow(variable.y - playerY, 2),
        );
        if (distance > radius) {
            return;
        }
        volume = 1 - distance / radius;
    }

    WA.sound.loadSound(url).play({
        volume,
    });
}

function initBell(variable: VariableDescriptor): void {
    if (WA.state[variable.name] === undefined) {
        WA.state[variable.name] = 0;
    }

    WA.state.onVariableChange(variable.name).subscribe(() => {
        if (WA.state[variable.name]) {
            playBellSound(variable);
        }
    });
}

function initBellLayer(bellVariable: string, properties: Properties): void {
    let popup: Popup | undefined = undefined;

    const zoneName = properties.mustGetString("zone");

    const bellPopupName = properties.getString("bellPopup");

    WA.room.onEnterZone(zoneName, () => {
        if (!bellPopupName) {
            WA.state[bellVariable] = (WA.state[bellVariable] as number) + 1;
        } else {
            popup = WA.ui.openPopup(bellPopupName, "", [
                {
                    label: properties.getString("bellButtonText") ?? "Ring",
                    callback: () => {
                        WA.state[bellVariable] = (WA.state[bellVariable] as number) + 1;
                    },
                },
            ]);
        }
    });

    WA.room.onLeaveZone(zoneName, () => {
        if (popup) {
            popup.close();
            popup = undefined;
        }
    });
}

/**
 * Initialize doors and bells parsing on the map.
 *
 * assetsUrl is the URL to the assets directory containing the compiled "keypad.html" file (for digit code)
 */
export async function initDoors(assetsUrl?: string | undefined): Promise<void> {
    assetsUrl = assetsUrl ?? process.env.ASSETS_URL ?? "";
    const variables = await getAllVariables();
    layersMap = await getLayersMap();

    for (const variable of variables.values()) {
        if (variable.properties.get("door")) {
            initDoor(variable);
        }

        if (variable.properties.get("bell")) {
            initBell(variable);
        }
    }

    for (const layer of layersMap.values()) {
        const properties = new Properties(layer.properties);
        const doorVariable = properties.getString("doorVariable");
        if (doorVariable && layer.type === "tilelayer") {
            initDoorstep(layer, doorVariable, properties, assetsUrl);
        }
        const bellVariable = properties.getString("bellVariable");
        if (bellVariable) {
            initBellLayer(bellVariable, properties);
        }
    }

    WA.player.onPlayerMove((moveEvent) => {
        playerX = moveEvent.x;
        playerY = moveEvent.y;
    });
}
