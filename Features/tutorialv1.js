import { defaultAssetsUrl } from "./default_assets_url";
export const TUTORIAL_V1_URL = `${defaultAssetsUrl}/tutorialv1.html`;
export function launchTutorialv1(force = false) {
    console.info("Start onboarding application!", TUTORIAL_V1_URL);
    console.info("Player tutorial done information: ", WA.player.state.tutorialDone);
    if (WA.player.state.tutorialDone && !force)
        return;
    WA.ui.modal.openModal({
        title: "Welcome onboard!",
        src: TUTORIAL_V1_URL,
        allow: "fullscreen; clipboard-read; clipboard-write",
        allowApi: true,
        position: "right",
        allowFullScreen: true,
    });
}
//# sourceMappingURL=tutorialv1.js.map