import { defaultAssetsUrl } from "./default_assets_url";
export function launchTutorialv1() {
    let host = defaultAssetsUrl;
    if (process.env.NODE_ENV === "development" &&
        process.env.WORKADVENTURE_URL != undefined &&
        process.env.WORKADVENTURE_URL !== "") {
        host = process.env.WORKADVENTURE_URL.replace("play.", "extra.");
    }
    const tutoUrl = `${host}/tutorialv1.html`;
    console.info("Start onboarding application!", tutoUrl);
    console.info("Player tutorial done information: ", WA.player.state.tutorialDone);
    if (WA.player.state.tutorialDone)
        return;
    WA.ui.modal.openModal({
        src: tutoUrl,
        allow: "fullscreen; clipboard-read; clipboard-write",
        allowApi: true,
        position: "right",
    });
}
//# sourceMappingURL=tutorialv1.js.map