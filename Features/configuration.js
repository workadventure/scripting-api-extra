import { Properties } from "../Properties";
import { defaultAssetsUrl } from "./default_assets_url";
import { getLayersMap } from "../LayersFlattener";
import { openConfig } from "../VariablesExtra";
let layersMap;
export async function initConfiguration(assetsUrl) {
    const map = (await WA.room.getTiledMap());
    assetsUrl = assetsUrl !== null && assetsUrl !== void 0 ? assetsUrl : defaultAssetsUrl;
    layersMap = await getLayersMap();
    const configurationLayer = map.layers.find((layer) => layer.name === "configuration");
    if (configurationLayer) {
        const properties = new Properties(configurationLayer.properties);
        const tag = properties.getString("tag");
        if (!tag || WA.player.tags.includes(tag)) {
            WA.ui.registerMenuCommand("Configure the room", () => {
                WA.nav.openCoWebSite(assetsUrl + "/configuration.html", true);
            });
        }
        for (const layer of layersMap.values()) {
            const properties = new Properties(layer.properties);
            const openConfigVariables = properties.getString("openConfig");
            if (openConfigVariables && layer.type === "tilelayer") {
                initLocalConfigurationPanel(openConfigVariables.split(","), layer.name, properties);
            }
        }
    }
}
function initLocalConfigurationPanel(openConfigVariables, layerName, properties) {
    let actionMessage = undefined;
    const tag = properties.getString("openConfigAdminTag");
    let allowedByTag = true;
    if (tag && !WA.player.tags.includes(tag)) {
        allowedByTag = false;
    }
    function displayConfigurationMessage() {
        var _a;
        if (actionMessage) {
            actionMessage.remove();
        }
        actionMessage = WA.ui.displayActionMessage({
            message: (_a = properties.getString("openConfigTriggerMessage")) !== null && _a !== void 0 ? _a : "Press SPACE or touch here to configure",
            callback: () => openConfig(openConfigVariables),
        });
    }
    function closeConfigurationPanel() {
        WA.nav.closeCoWebSite();
    }
    WA.room.onEnterLayer(layerName).subscribe(() => {
        const openConfigTriggerValue = properties.getString("openConfigTrigger");
        if (allowedByTag) {
            if (openConfigTriggerValue && openConfigTriggerValue === "onaction") {
                displayConfigurationMessage();
            }
            else {
                openConfig(openConfigVariables);
            }
        }
    });
    WA.room.onLeaveLayer(layerName).subscribe(() => {
        if (actionMessage) {
            actionMessage.remove();
            closeConfigurationPanel();
        }
        else {
            closeConfigurationPanel();
        }
    });
}
//# sourceMappingURL=configuration.js.map