import {getLayersMap} from "../LayersFlattener";
import {Properties} from "../Properties";

/**
 * Initialize the configuration button in the menu
 */
export async function initConfiguration(assetsUrl?: string | undefined): Promise<void> {
    const layers = await getLayersMap();

    const configurationLayer = layers.get("configuration");

    if (configurationLayer) {
        const properties = new Properties(configurationLayer.properties);
        const tag = properties.getString('tag');
        if (!tag || WA.player.tags.includes(tag)) {
            WA.ui.registerMenuCommand("Configure the room", () => {
                assetsUrl = assetsUrl ?? process.env.ASSETS_URL ?? "";
                WA.nav.openCoWebSite(assetsUrl + "configuration.html", true);
            });
        }
    }
}
