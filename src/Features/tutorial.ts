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

        const updateTutorialPosition = (maxZoom: number): void => {
            if (camera === undefined) {
                return;
            }

            const margin = 16;

            const rightBorderCrossed =
                playerPosition.x + tutorialIFrame.x + tutorialIFrame.width >
                camera.x + camera.width;
            const leftBorderCrossed = playerPosition.x + tutorialIFrame.x < camera.x;
            const topBorderCrossed =
                playerPosition.y + tutorialIFrame.y + tutorialIFrame.height >
                camera.y + camera.height;
            const bottomBorderCrossed = playerPosition.y + tutorialIFrame.y < camera.y;

            if (camera.zoom > maxZoom) {
                console.log(camera.zoom);
                // tutorialIFrame.visible = false;
                // const message = WA.ui.displayActionMessage({
                //     message: "You can zoom out to display the tutorial",
                //     type: "warning",
                //     callback: () => {
                //         return;
                //     },
                // });
                // setTimeout(() => {
                //     message.remove();
                //     WA.room.website.delete("tutorial");
                // }, 10000);
                // return;
            } else {
                tutorialIFrame.visible = true;

                if (rightBorderCrossed) {
                    tutorialIFrame.x = -tutorialIFrame.width - 2 * margin;
                } else if (leftBorderCrossed) {
                    tutorialIFrame.x = 2 * margin;
                }

                if (topBorderCrossed) {
                    tutorialIFrame.y = -tutorialIFrame.height;
                } else if (bottomBorderCrossed) {
                    tutorialIFrame.y = margin;
                }
            }
        };

        WA.player.onPlayerMove((position) => {
            playerPosition = position;
            let maxZoom = 1.5;
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                maxZoom = 0.65;
            }
            updateTutorialPosition(maxZoom);
        });

        WA.camera.onCameraUpdate(async (cameraPosition: any) => {
            camera = cameraPosition;
            let maxZoom = 1.5;
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                maxZoom = 0.65;
            }
            updateTutorialPosition(maxZoom);
        });

        WA.player.state.tutorialDone = true;
    }
}

export function openTutorial(): void {
    const testWidth = 150;
    const testHeight = 100;

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
        scale: 1,
    };

    if (/Mobi|Android/i.test(navigator.userAgent)) {
        config = { ...config, position: { x: 32, y: -225, height: 455, width: 250 }, scale: 1 };
    }
    WA.room.website.create(config);
}
