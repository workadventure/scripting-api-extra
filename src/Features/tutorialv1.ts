import { defaultAssetsUrl } from "./default_assets_url";

export function launchTutorialv1(): void {
    const tutoUrl = `${defaultAssetsUrl}/tutorialv1.html`;
    console.info("Start onboarding application!", tutoUrl);

    console.info("Player tutorial done information: ", WA.player.state.tutorialDone);
    if (WA.player.state.tutorialDone) return;

    //open modal and show onboarding tuto
    WA.ui.modal.openModal({
        tiltle: "Welcome onboard!",
        src: tutoUrl,
        allow: "fullscreen; clipboard-read; clipboard-write",
        allowApi: true,
        position: "right",
    });
}
