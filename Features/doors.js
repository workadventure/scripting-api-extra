import { getVariables } from "../VariablesExtra";
import { getLayersMap } from "../LayersFlattener";
import { Properties } from "../Properties";
import { findLayersBoundaries } from "../LayersExtra";
import { defaultAssetsUrl } from "./default_assets_url";
let layersMap;
let playerX = 0;
let playerY = 0;
function updateDoorLayers(variable) {
    if (WA.state[variable.name]) {
        let layers = variable.properties.mustGetString("openLayer");
        for (const layer of layers.split("\n")) {
            WA.room.showLayer(layer);
        }
        layers = variable.properties.mustGetString("closeLayer");
        for (const layer of layers.split("\n")) {
            WA.room.hideLayer(layer);
        }
    }
    else {
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
function playOpenSound(variable) {
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
function playCloseSound(variable) {
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
function getTileLayers(layerNames) {
    return layerNames
        .map((layerName) => layersMap.get(layerName))
        .filter((layer) => (layer === null || layer === void 0 ? void 0 : layer.type) === "tilelayer");
}
function getDistance(layerNames) {
    const layers = getTileLayers(layerNames);
    const boundaries = findLayersBoundaries(layers);
    const xLayer = ((boundaries.right - boundaries.left) / 2 + boundaries.left) * 32;
    const yLayer = ((boundaries.bottom - boundaries.top) / 2 + boundaries.top) * 32;
    return Math.sqrt(Math.pow(playerX - xLayer, 2) + Math.pow(playerY - yLayer, 2));
}
function initDoor(variable) {
    WA.state.onVariableChange(variable.name).subscribe(() => {
        if (WA.state[variable.name]) {
            playOpenSound(variable);
        }
        else {
            playCloseSound(variable);
        }
        updateDoorLayers(variable);
    });
    updateDoorLayers(variable);
}
function initDoorstep(layer, doorVariable, properties, assetsUrl) {
    const name = layer.name;
    let actionMessage = undefined;
    let keypadWebsite = undefined;
    let inZone = false;
    const tag = properties.getString("tag");
    let allowed = true;
    if (tag && !WA.player.tags.includes(tag)) {
        allowed = false;
    }
    const accessRestricted = !!tag;
    function displayCloseDoorMessage() {
        var _a;
        if (actionMessage) {
            actionMessage.remove();
        }
        actionMessage = WA.ui.displayActionMessage({
            message: (_a = properties.getString("closeTriggerMessage")) !== null && _a !== void 0 ? _a : "Press SPACE to close the door",
            callback: () => {
                WA.state[doorVariable.name] = false;
                displayOpenDoorMessage();
            },
        });
    }
    function displayOpenDoorMessage() {
        var _a;
        if (actionMessage) {
            actionMessage.remove();
        }
        actionMessage = WA.ui.displayActionMessage({
            message: (_a = properties.getString("openTriggerMessage")) !== null && _a !== void 0 ? _a : "Press SPACE to open the door",
            callback: () => {
                WA.state[doorVariable.name] = true;
                displayCloseDoorMessage();
            },
        });
    }
    function openKeypad(name) {
        const boundaries = findLayersBoundaries(getTileLayers(doorVariable.properties.mustGetString("closeLayer").split("\n")));
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
    function closeKeypad() {
        if (keypadWebsite) {
            WA.room.website.delete(keypadWebsite.name);
            keypadWebsite = undefined;
        }
    }
    WA.room.onEnterLayer(name).subscribe(() => {
        inZone = true;
        if (properties.getBoolean("autoOpen") && allowed) {
            WA.state[doorVariable.name] = true;
            return;
        }
        if (!WA.state[doorVariable.name] &&
            ((accessRestricted && !allowed) || !accessRestricted) &&
            (properties.getString("code") || properties.getString("codeVariable"))) {
            openKeypad(name);
            return;
        }
        if (!allowed) {
            return;
        }
        if (WA.state[doorVariable.name]) {
            displayCloseDoorMessage();
        }
        else {
            displayOpenDoorMessage();
        }
    });
    WA.room.onLeaveLayer(name).subscribe(() => {
        inZone = false;
        if (properties.getBoolean("autoClose")) {
            WA.state[doorVariable.name] = false;
        }
        if (actionMessage) {
            actionMessage.remove();
        }
        closeKeypad();
    });
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
function playBellSound(variable) {
    const url = variable.properties.mustGetString("bellSound");
    const radius = variable.properties.getNumber("soundRadius");
    let volume = 1;
    if (radius) {
        const distance = Math.sqrt(Math.pow(variable.x - playerX, 2) + Math.pow(variable.y - playerY, 2));
        if (distance > radius) {
            return;
        }
        volume = 1 - distance / radius;
    }
    WA.sound.loadSound(url).play({
        volume,
    });
}
function initBell(variable) {
    if (WA.state[variable.name] === undefined) {
        WA.state[variable.name] = 0;
    }
    WA.state.onVariableChange(variable.name).subscribe(() => {
        if (WA.state[variable.name]) {
            playBellSound(variable);
        }
    });
}
function initBellLayer(bellVariable, properties, layerName) {
    let popup = undefined;
    const bellPopupName = properties.getString("bellPopup");
    WA.room.onEnterLayer(layerName).subscribe(() => {
        var _a;
        if (!bellPopupName) {
            WA.state[bellVariable] = WA.state[bellVariable] + 1;
        }
        else {
            popup = WA.ui.openPopup(bellPopupName, "", [
                {
                    label: (_a = properties.getString("bellButtonText")) !== null && _a !== void 0 ? _a : "Ring",
                    callback: () => {
                        WA.state[bellVariable] = WA.state[bellVariable] + 1;
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
}
export async function initDoors(assetsUrl) {
    assetsUrl = assetsUrl !== null && assetsUrl !== void 0 ? assetsUrl : defaultAssetsUrl;
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
                throw new Error('Cannot find variable "' +
                    doorVariableName +
                    '" referred in the "doorVariable" property of layer "' +
                    layer.name +
                    '"');
            }
            initDoorstep(layer, doorVariable, properties, assetsUrl);
        }
        const bellVariable = properties.getString("bellVariable");
        if (bellVariable) {
            initBellLayer(bellVariable, properties, layer.name);
        }
    }
    WA.player.onPlayerMove((moveEvent) => {
        playerX = moveEvent.x;
        playerY = moveEvent.y;
    });
}
//# sourceMappingURL=doors.js.map