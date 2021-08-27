/**
 * Initialize the configuration button in the menu
 */
export function initConfiguration(assetsUrl?: string | undefined): void {
    WA.ui.registerMenuCommand("Configure the room", () => {
        assetsUrl = assetsUrl ?? process.env.ASSETS_URL ?? "";
        WA.nav.openCoWebSite(assetsUrl + "configuration.html", true);
    });
}
