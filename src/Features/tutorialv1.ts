import { defaultAssetsUrl } from "./default_assets_url";

export function launchTutorialv1(): void {
    let hots = defaultAssetsUrl;
    if (
        process.env.NODE_ENV === "development" &&
        process.env.WORKADVENTURE_URL != undefined &&
        process.env.WORKADVENTURE_URL !== ""
    ) {
        hots = process.env.WORKADVENTURE_URL.replace("play.", "extra.");
    }

    const tutoUrl = `${hots}/tutorialv1.html`;
    console.info("Start onboarding application!", tutoUrl);

    console.info("Player tutorial done information: ", WA.player.state.tutorialDone);
    if (WA.player.state.tutorialDone) return;

    //open modal and show onboarding tuto
    //TODO delete ts-ignore when new scripting release is up
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    WA.ui.modal.openModal({
        src: tutoUrl,
        allow: "fullscreen; clipboard-read; clipboard-write",
        allowApi: true,
        position: "right",
        title: "Tutorial",
    });
}
