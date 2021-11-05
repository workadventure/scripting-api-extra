import { Properties } from "../Properties";
import type { ITiledMap } from "@workadventure/tiled-map-type-guard/dist";
import { defaultAssetsUrl } from "./default_assets_url";
import { getLayersMap } from "../LayersFlattener";
import type { ITiledMapLayer } from "@workadventure/tiled-map-type-guard/dist";
import type { ActionMessage } from "@workadventure/iframe-api-typings/Api/iframe/Ui/ActionMessage";

let layersMap!: Map<string, ITiledMapLayer>;

/**
 * Initialize the configuration button in the menu
 */
export async function initConfiguration(assetsUrl?: string | undefined): Promise<void> {
    const map: ITiledMap = await WA.room.getTiledMap();
    assetsUrl = assetsUrl ?? defaultAssetsUrl;
    layersMap = await getLayersMap();
    const configurationLayer = map.layers.find((layer) => layer.name === "configuration");

    if (configurationLayer) {
        // Controls the configuration panel triggered from the menu
        const properties = new Properties(configurationLayer.properties);
        const tag = properties.getString("tag");
        if (!tag || WA.player.tags.includes(tag)) {
            WA.ui.registerMenuCommand("Configure the room", () => {
                WA.nav.openCoWebSite(assetsUrl + "/configuration.html", true);
            });
        }

        // Controls the configuration panel triggered from a zone
        for (const layer of layersMap.values()) {
            const properties = new Properties(layer.properties);
            const openConfigVariables = properties.getString("openConfig");
            if (openConfigVariables && layer.type === "tilelayer") {
                initConfigurationPanel(openConfigVariables, properties);
            }
        }
    }
}

function initConfigurationPanel(openConfigVariables: string, properties: Properties): void {
    let actionMessage: ActionMessage | undefined = undefined;

    const zoneName = properties.getString("zone");
    if (!zoneName) {
        throw new Error('Missing "zone" property');
    }

    const tag = properties.getString("openConfigAdminTag");
    let allowedByTag = true;
    if (tag && !WA.player.tags.includes(tag)) {
        allowedByTag = false;
    }

    function displayConfigurationMessage(): void {
        if (actionMessage) {
            actionMessage.remove();
        }
        actionMessage = WA.ui.displayActionMessage({
            message:
                properties.getString("openConfigTriggerMessage") ??
                "Press SPACE or touch here to configure",
            callback: () => openConfigurationPanel(openConfigVariables),
        });
    }

    function closeConfigurationPanel(): void {
        WA.nav.closeCoWebSite();
    }

    WA.room.onEnterLayer(zoneName).subscribe(() => {
        const openConfigTriggerValue = properties.getString("openConfigTrigger");

        // Do not display conf panel if the user is not allowed by tag
        if (allowedByTag) {
            if (openConfigTriggerValue && openConfigTriggerValue === "onaction") {
                displayConfigurationMessage();
            } else {
                openConfigurationPanel(openConfigVariables);
            }
        }
    });

    WA.room.onLeaveLayer(zoneName).subscribe(() => {
        if (actionMessage) {
            actionMessage.remove();
            closeConfigurationPanel();
        } else {
            closeConfigurationPanel();
        }
    });
}

/**
 * Open the configuration panel inside a iframe and filter which variables will be displayed
 * @param variablesToConfigure Variable names separated by a comma, e.g.: var1,var2
 */
function openConfigurationPanel(variablesToConfigure?: string): void {
    const parameters = variablesToConfigure ? "#" + variablesToConfigure : "";
    WA.nav.openCoWebSite(defaultAssetsUrl + "/configuration.html" + parameters, true);
}
