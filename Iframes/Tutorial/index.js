import "./style/style.scss";
document.addEventListener("DOMContentLoaded", () => {
    let currentStep = 1;
    let firstMovementDone = false;
    const maxStep = 5;
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        showContentForDevice("mobile");
    }
    else {
        showContentForDevice("desktop");
    }
    initializeClickableBtns("next-btn", () => goToNextStep());
    initializeClickableBtns("skip-btn", () => {
        currentStep = maxStep;
        WA.room.website.delete("tutorial");
    });
    WA.player.onPlayerMove(() => {
        if (!firstMovementDone) {
            firstMovementDone = true;
            goToNextStep();
        }
    });
    function goToNextStep() {
        var _a, _b;
        if (currentStep === maxStep) {
            WA.room.website.delete("tutorial");
        }
        (_a = document.getElementById(`step-${currentStep}`)) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        currentStep++;
        (_b = document.getElementById(`step-${currentStep}`)) === null || _b === void 0 ? void 0 : _b.classList.remove("hidden");
    }
    function showContentForDevice(device) {
        const contentList = document.getElementsByClassName(device);
        for (const content of contentList) {
            content.classList.remove("hidden");
        }
    }
    function initializeClickableBtns(btnType, action) {
        const buttons = document.getElementsByClassName(btnType);
        for (const btn of buttons) {
            btn.addEventListener("click", () => {
                action();
            });
        }
    }
});
//# sourceMappingURL=index.js.map