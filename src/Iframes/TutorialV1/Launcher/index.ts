console.info("Onboarding script initialized!");
document.addEventListener("DOMContentLoaded", () => {
    console.info("Start onboarding application!");
    if (WA.player.state.tutorialDone) return;
    //TODO delete @ts-ignore when new scripting release is up
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    WA.ui.modal.openModal({
        src: process.env.WORKADVENTURE_URL + "/tutorialv1.html",
        allow: "fullscreen; clipboard-read; clipboard-write",
        allowApi: true,
    });
});

export {};
