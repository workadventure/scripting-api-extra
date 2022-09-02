import { defaultAssetsUrl } from "../../../Features/default_assets_url";

console.info("Onboarding script initialized!");
document.addEventListener("DOMContentLoaded", () => {
    const tutoUrl = `${defaultAssetsUrl}/tutorialv1.html`;
    console.info("Start onboarding application!", tutoUrl);

    //TODO delete ts-ignore when new scripting release is up
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (WA.player.state.tutorialDone) return;

    //TODO delete ts-ignore when new scripting release is up
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    WA.ui.modal.openModal({
        src: tutoUrl,
        allow: "fullscreen; clipboard-read; clipboard-write",
        allowApi: true,
    });
});

export {};
