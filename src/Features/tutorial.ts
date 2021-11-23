export async function initTutorial(): Promise<void> {
    //const tutorialDone = WA.player.state.tutorialDone;
    const tutorialDone = false; //TODO: delete and uncomment

    if (!tutorialDone) {
        openTutorial();

        //On camera (worldView) movement, we want to make sure that the tutorial stays visible
        let lastWorldView = {};

        //TODO: fix type
        WA.camera.onCameraMove(async (worldView: any) => {
            if (worldView == lastWorldView) {
                return;
            }

            const playerPosition = await WA.player.getPosition();
            const tutorialIFrame = await WA.room.website.get("tutorial");

            //Tutorial iFrame borders
            const tutorialTop = playerPosition.y + tutorialIFrame.y;
            const tutorialLeft = playerPosition.x + tutorialIFrame.x;
            const tutorialRight = tutorialLeft + tutorialIFrame.width * tutorialIFrame.scale;
            const tutorialBottom = tutorialTop + tutorialIFrame.height * tutorialIFrame.scale;

            //Correcting x position if the iFrame crosses the worldView's left limit
            if (tutorialLeft < worldView.x) {
                const overflow = worldView.x - tutorialLeft;
                tutorialIFrame.x = tutorialIFrame.x + overflow;
            }

            //Correcting x position if the iFrame crosses the worldView's right limit
            const rightLimit = worldView.x + worldView.width;
            if (tutorialRight > rightLimit) {
                const overflow = tutorialRight - rightLimit;
                tutorialIFrame.x = tutorialIFrame.x - overflow;
            }

            //Correcting y position if the iFrame crosses the worldView's top limit
            if (tutorialTop < worldView.y) {
                const overflow = worldView.y - tutorialTop;
                tutorialIFrame.y = tutorialIFrame.y + overflow;
            }

            //Correcting y position if the iFrame crosses the worldView's bottom limit
            const bottomLimit = worldView.y + worldView.height;
            if (tutorialBottom > bottomLimit) {
                const overflow = tutorialBottom - bottomLimit;
                tutorialIFrame.y = tutorialIFrame.y - overflow;
            }
        });

        WA.player.state.tutorialDone = true;
    }
}

export function openTutorial(): void {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        WA.room.website.create({
            allow: "",
            name: "tutorial",
            url: "/tutorial.html",
            position: {
                x: 150,
                y: -40,
                height: 700,
                width: 375,
            },
            visible: true,
            allowApi: true,
            origin: "player",
            scale: 0.7,
        });
    } else {
        WA.room.website.create({
            allow: "",
            name: "tutorial",
            url: "/tutorial.html",
            position: {
                x: 200,
                y: -32,
                height: 470,
                width: 600,
            },
            visible: true,
            allowApi: true,
            origin: "player",
            scale: 0.5,
        });
    }
}
