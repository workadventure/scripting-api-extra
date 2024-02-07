import { getVariables, VariableDescriptor } from "../VariablesExtra";
import { getLayersMap } from "../LayersFlattener";
import { Properties } from "../Properties";
import { findLayersBoundaries } from "../LayersExtra";
import type { ITiledMapLayer, ITiledMapObject } from "@workadventure/tiled-map-type-guard/dist";
import type { ITiledMapTileLayer } from "@workadventure/tiled-map-type-guard/dist/ITiledMapTileLayer";
import type { Popup, ActionMessage, EmbeddedWebsite } from "@workadventure/iframe-api-typings";
import { defaultAssetsUrl } from "./default_assets_url";
import { workadventureAssetsHtmlUrl } from "./workadventure_assets_url";
import { getAreaObject } from "../AreaObject";

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

function getTileLayers(layerNames: string[]): ITiledMapTileLayer[] {
    return layerNames
        .map((layerName) => layersMap.get(layerName))
        .filter((layer) => layer?.type === "tilelayer") as ITiledMapTileLayer[];
}

/**
 * Get the distance between the player and the center of the layer passed in parameter.
 */
function getDistance(layerNames: string[]): number {
    const layers = getTileLayers(layerNames);
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
    doorstepZone: ITiledMapTileLayer | ITiledMapObject,
    doorVariable: VariableDescriptor,
    properties: Properties,
    assetsUrl: string,
): void {
    const name = doorstepZone.name;
    let actionMessage: ActionMessage | undefined = undefined;
    let keypadWebsite: EmbeddedWebsite | undefined = undefined;
    let inZone = false;

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
                WA.state[doorVariable.name] = false;
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
                WA.state[doorVariable.name] = true;
                displayCloseDoorMessage();
            },
        });
    }

    function openKeypad(): void {
        let boundaries: {
            top: number;
            left: number;
            right: number;
            bottom: number;
        };
        if (doorstepZone.type === "tilelayer") {
            boundaries = findLayersBoundaries(
                getTileLayers(doorVariable.properties.mustGetString("closeLayer").split("\n")),
            );
        } else {
            if (
                doorstepZone.x === undefined ||
                doorstepZone.y === undefined ||
                doorstepZone.width === undefined ||
                doorstepZone.height === undefined
            ) {
                throw new Error(
                    `Doorstep zone "${doorstepZone.name}" is missing x, y, width or height`,
                );
            }
            boundaries = {
                top: doorstepZone.y,
                left: doorstepZone.x,
                right: doorstepZone.x + doorstepZone.width,
                bottom: doorstepZone.y + doorstepZone.height,
            };
        }

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

    function onEnter() {
        inZone = true;
        if (properties.getBoolean("autoOpen") && allowed) {
            WA.state[doorVariable.name] = true;
            return;
        }

        if (
            !WA.state[doorVariable.name] &&
            ((accessRestricted && !allowed) || !accessRestricted) && // Do not display code if user is allowed by tag
            (properties.getString("code") || properties.getString("codeVariable"))
        ) {
            openKeypad();
            return;
        }

        if (!allowed) {
            return;
        }

        if (WA.state[doorVariable.name]) {
            displayCloseDoorMessage();
        } else {
            displayOpenDoorMessage();
        }
    }

    function onLeave() {
        inZone = false;
        if (properties.getBoolean("autoClose")) {
            WA.state[doorVariable.name] = false;
        }

        if (actionMessage) {
            actionMessage.remove();
        }
        closeKeypad();
    }

    if (doorstepZone.type === "tilelayer") {
        WA.room.onEnterLayer(name).subscribe(onEnter);
        WA.room.onLeaveLayer(name).subscribe(onLeave);
    } else {
        WA.room.area.onEnter(name).subscribe(onEnter);
        WA.room.area.onLeave(name).subscribe(onLeave);
    }

    WA.state.onVariableChange(doorVariable.name).subscribe(() => {
        if (inZone) {
            if (!properties.getBoolean("autoClose") && WA.state[doorVariable.name] === true) {
                displayCloseDoorMessage();
            }

            if (keypadWebsite && WA.state[doorVariable.name] === true) {
                closeKeypad();
            }

            if (!properties.getBoolean("autoOpen") && WA.state[doorVariable.name] === false) {
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

function initBellLayer(
    bellVariable: string,
    properties: Properties,
    bellZone: ITiledMapTileLayer | ITiledMapObject,
): void {
    let popup: Popup | undefined = undefined;

    const bellPopupName = properties.getString("bellPopup");

    if (bellZone.type === "tilelayer") {
        const layerName = bellZone.name;
        WA.room.onEnterLayer(layerName).subscribe(() => {
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

        WA.room.onLeaveLayer(layerName).subscribe(() => {
            if (popup) {
                popup.close();
                popup = undefined;
            }
        });
    } else {
        const objectName = bellZone.name;
        WA.room.area.onEnter(objectName).subscribe(() => {
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

        WA.room.area.onLeave(objectName).subscribe(() => {
            if (popup) {
                popup.close();
                popup = undefined;
            }
        });
    }
}

/**
 * Initialize doors and bells parsing on the map.
 *
 * assetsUrl is the URL to the assets directory containing the compiled "keypad.html" file (for digit code)
 */
export async function initDoors(assetsUrl?: string | undefined): Promise<void> {
    assetsUrl = assetsUrl ?? (workadventureAssetsHtmlUrl || defaultAssetsUrl);
    const variables = await getVariables();
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
        const doorVariableName = properties.getString("doorVariable");
        if (doorVariableName && layer.type === "tilelayer") {
            const doorVariable = variables.get(doorVariableName);
            if (doorVariable === undefined) {
                throw new Error(
                    'Cannot find variable "' +
                        doorVariableName +
                        '" referred in the "doorVariable" property of layer "' +
                        layer.name +
                        '"',
                );
            }
            initDoorstep(layer, doorVariable, properties, assetsUrl);
        }
        const bellVariable = properties.getString("bellVariable");
        if (bellVariable && layer.type === "tilelayer") {
            initBellLayer(bellVariable, properties, layer);
        }
    }

    for (const object of await getAreaObject()) {
        const properties = new Properties(object.properties);
        const doorVariableName = properties.getString("doorVariable");
        if (doorVariableName) {
            const doorVariable = variables.get(doorVariableName);
            if (doorVariable === undefined) {
                throw new Error(
                    'Cannot find variable "' +
                        doorVariableName +
                        '" referred in the "doorVariable" property of object "' +
                        object.name +
                        '"',
                );
            }
            initDoorstep(object, doorVariable, properties, assetsUrl);
        }
        const bellVariable = properties.getString("bellVariable");
        if (bellVariable) {
            initBellLayer(bellVariable, properties, object);
        }
    }

    WA.player.onPlayerMove((moveEvent) => {
        playerX = moveEvent.x;
        playerY = moveEvent.y;
    });
}
