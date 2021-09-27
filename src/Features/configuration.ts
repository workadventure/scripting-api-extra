import { Properties } from "../Properties";
import type { ITiledMap } from "@workadventure/tiled-map-type-guard/dist";
import { defaultAssetsUrl } from "./default_assets_url";

/**
 * Initialize the configuration button in the menu
 */
export async function initConfiguration(assetsUrl?: string | undefined): Promise<void> {
    const map: ITiledMap = await WA.room.getTiledMap();

    const configurationLayer = map.layers.find((layer) => layer.name === "configuration");

    if (configurationLayer) {
        const properties = new Properties(configurationLayer.properties);
        const tag = properties.getString("tag");
        if (!tag || WA.player.tags.includes(tag)) {
            WA.ui.registerMenuCommand("Configure the room", () => {
                assetsUrl = assetsUrl ?? defaultAssetsUrl;
                WA.nav.openCoWebSite(assetsUrl + "/configuration.html", true);
            });
        }
    }
}
