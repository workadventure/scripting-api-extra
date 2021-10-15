import "./style/style.scss";
import {replay} from "../../Features/tutorial";

document.addEventListener('DOMContentLoaded', () => {
    let currentStep: number | 'end' = 1;
    let firstMovementDone = false;

    //Showing content according to the device
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        showContentForDevice('mobile');
    } else {
        showContentForDevice('desktop');
    }

    //Initializing all listened to buttons
    initializeClickableBtns('next-btn', () => goToNextStep());

    initializeClickableBtns('skip-btn', () => {
        currentStep = 'end';
        WA.room.website.delete('tutorial');
    })

    initializeClickableBtns('redo-btn', () => {
        replay();
    })

    //STEP 1 - does not use a button in order to be completed
    WA.player.onPlayerMove(() => {
        if (!firstMovementDone && typeof currentStep == "number") {
            firstMovementDone = true;
            goToNextStep();
        }
    })
    // END STEP 1

    function goToNextStep() {
        if (currentStep === 'end') {
            return
        }
        document.getElementById(`step-${currentStep}`)?.classList.add('hidden')
        currentStep++
        document.getElementById(`step-${currentStep}`)?.classList.remove('hidden')
    }

    function showContentForDevice(device: string) {
        let contentList = document.getElementsByClassName(device);
        for (let content of contentList) {
            content.classList.remove('hidden');
        }
    }

    function initializeClickableBtns(btnType: string, action: Function){
        let buttons = document.getElementsByClassName(btnType);
        for (let btn of buttons) {
            btn.addEventListener('click', () => {
                action();
            })
        }
    }

})

export {}

