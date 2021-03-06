import "./style/style.scss";

document.addEventListener("DOMContentLoaded", () => {
    let currentStep = 1;
    let firstMovementDone = false;
    const maxStep = 5;

    //Showing content according to the device
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        showContentForDevice("mobile");
    } else {
        showContentForDevice("desktop");
    }

    //Initializing all listened to buttons
    initializeClickableBtns("next-btn", () => goToNextStep());

    initializeClickableBtns("skip-btn", () => {
        currentStep = maxStep;
        WA.room.website.delete("tutorial");
    });

    //STEP 1 - does not use a button in order to be completed
    WA.player.onPlayerMove(() => {
        if (!firstMovementDone) {
            firstMovementDone = true;
            goToNextStep();
        }
    });

    // END STEP 1

    function goToNextStep(): void {
        if (currentStep === maxStep) {
            WA.room.website.delete("tutorial");
        }
        document.getElementById(`step-${currentStep}`)?.classList.add("hidden");
        currentStep++;
        document.getElementById(`step-${currentStep}`)?.classList.remove("hidden");
    }

    function showContentForDevice(device: string): void {
        const contentList = document.getElementsByClassName(device);
        for (const content of contentList) {
            content.classList.remove("hidden");
        }
    }

    function initializeClickableBtns(btnType: string, action: () => void): void {
        const buttons = document.getElementsByClassName(btnType);
        for (const btn of buttons) {
            btn.addEventListener("click", () => {
                action();
            });
        }
    }
});
