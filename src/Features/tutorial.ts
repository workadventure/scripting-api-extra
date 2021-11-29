import type { HasPlayerMovedEvent } from "@workadventure/iframe-api-typings/Api/Events/HasPlayerMovedEvent";
import type { WasCameraUpdatedEvent } from "../../../workadventure/front/src/Api/Events/WasCameraUpdatedEvent";

export async function initTutorial(): Promise<void> {
    //const tutorialDone = WA.player.state.tutorialDone;
    const tutorialDone = false; //TODO: delete and uncomment

    if (!tutorialDone) {
        openTutorial();

        //On camera (worldView) movement, we want to make sure that the tutorial stays visible
        let playerPosition: HasPlayerMovedEvent = await WA.player.getPosition();
        let camera: WasCameraUpdatedEvent;

        const tutorialIFrame = await WA.room.website.get("tutorial");

        const updateTutorialPosition = (): void => {
            if (camera === undefined) {
                return;
            }

            const margin = 16;

            const cameraRight = camera.x + camera.width;
            const cameraBottom = camera.y + camera.height;

            const playerRight = playerPosition.x + margin;
            const playerLeft = playerPosition.x - margin;
            const playerBottom = playerPosition.y + margin;
            const playerTop = playerPosition.y - margin;

            //Correcting x position if the iframe crosses the horizontal borders
            console.log("FLAG WV : ", camera);
            console.log("FLAG PLAYER: ", playerPosition);
            if (tutorialIFrame.width > cameraRight - playerRight) {
                tutorialIFrame.x = -tutorialIFrame.width - 2 * margin;
            } else if (tutorialIFrame.width > camera.x - playerLeft) {
                console.log(
                    `tutorial width: ${tutorialIFrame.width} | camera.x : ${camera.x} | player Left : ${playerLeft}`,
                );
                tutorialIFrame.x = 2 * margin;
            }
            //
            // //Correcting y position if the iframe crosses the vertical borders
            // if (tutorialIFrame.height > cameraBottom - playerBottom) {
            //     console.log("FLAG WV - Bottom: ", camera);
            //     console.log("FLAG PLAYER - Bottom: ", playerPosition);
            //     tutorialIFrame.y = -tutorialIFrame.height + 3 * margin;
            // }
            // if (tutorialIFrame.height > camera.y - playerTop) {
            //     console.log("FLAG WV - Top: ", camera);
            //     console.log("FLAG PLAYER - Top: ", playerPosition);
            //     tutorialIFrame.y = 0;
            // }
        };

        WA.player.onPlayerMove((position) => {
            playerPosition = position;
            updateTutorialPosition();
        });

        WA.camera.onCameraUpdate(async (cameraPosition: any) => {
            camera = cameraPosition;
            updateTutorialPosition();
        });

        WA.player.state.tutorialDone = true;
    }
}

export function openTutorial(): void {
    const testWidth = 430;
    const testHeight = 370;

    let config = {
        allow: "",
        name: "tutorial",
        url: "/tutorial.html",
        position: {
            height: testHeight,
            width: testWidth,
            x: 10,
            y: -160,
        },
        visible: true,
        allowApi: true,
        origin: "player",
        scale: 0.7,
    };

    if (/Mobi|Android/i.test(navigator.userAgent)) {
        config = { ...config, position: { x: 150, y: -40, height: 700, width: 375 }, scale: 0.7 };
    }
    WA.room.website.create(config);
}
