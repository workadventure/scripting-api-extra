import type { HasPlayerMovedEvent } from "@workadventure/iframe-api-typings/Api/Events/HasPlayerMovedEvent";
import type { WasCameraUpdatedEvent } from "../../../workadventure/front/src/Api/Events/WasCameraUpdatedEvent";
import { desktopConfig, mobileConfig } from "../Iframes/Tutorial/config/config";

export async function initTutorial(): Promise<void> {
    const tutorialDone = WA.player.state.tutorialDone;
    const isForMobile = /Mobi|Android/i.test(navigator.userAgent);
    const map = await WA.room.getTiledMap();
    const tutorialProperty = await map.properties?.find((property) => property.name === "tutorial");

    if (!tutorialDone && tutorialProperty.value) {
        openTutorial(isForMobile);

        let playerPosition: HasPlayerMovedEvent = await WA.player.getPosition();
        let camera: WasCameraUpdatedEvent;

        const tutorialIFrame = await WA.room.website.get("tutorial");

        const updatePosition = (): void => {
            // We do not want the iFrame to cross the worldView's limit, as it could become invisible for the player
            const margin = 16;
            const rightBorderCrossed =
                playerPosition.x + tutorialIFrame.x + tutorialIFrame.width >
                camera.x + camera.width;
            const leftBorderCrossed = playerPosition.x + tutorialIFrame.x < camera.x;
            const topBorderCrossed =
                playerPosition.y + tutorialIFrame.y + tutorialIFrame.height >
                camera.y + camera.height;
            const bottomBorderCrossed = playerPosition.y + tutorialIFrame.y < camera.y;

            if (rightBorderCrossed) {
                tutorialIFrame.x = -tutorialIFrame.width - 1.5 * margin;
            } else if (leftBorderCrossed) {
                tutorialIFrame.x = 1.5 * margin;
            }

            if (topBorderCrossed) {
                tutorialIFrame.y = -tutorialIFrame.height;
            } else if (bottomBorderCrossed) {
                tutorialIFrame.y = margin;
            }
        };

        const processIframeConfig = (config: {
            width: number;
            height: number;
            scale: number;
        }): void => {
            tutorialIFrame.width = config.width;
            tutorialIFrame.height = config.height;
            tutorialIFrame.scale = config.scale;
        };

        const updateProportions = (zoomLevel: number): void => {
            // If the zoom level is too high and our iFrame can't fit into the worldView, want to adapt its format

            const config = isForMobile ? mobileConfig : desktopConfig;
            const iframeConfig = config.filter((config) => {
                if (config.lowerBound && config.uppperBound) {
                    return config.lowerBound < zoomLevel && zoomLevel <= config.uppperBound;
                } else if (config.lowerBound && !config.uppperBound) {
                    return config.lowerBound < zoomLevel;
                } else if (!config.lowerBound && config.uppperBound) {
                    return zoomLevel <= config.uppperBound;
                } else {
                    throw new Error(
                        `Zoom level of: ${zoomLevel} could not fit in any of the desktopConfig's ranges.`,
                    );
                }
            });

            processIframeConfig(iframeConfig[0].config);
        };

        const updateTutorial = (): void => {
            if (camera === undefined) {
                return;
            }
            const zoomLevel = camera.zoom;
            updateProportions(zoomLevel);
            updatePosition();
        };

        WA.player.onPlayerMove((position) => {
            playerPosition = position;
            updateTutorial();
        });

        WA.camera.onCameraUpdate().subscribe((cameraPosition: WasCameraUpdatedEvent) => {
            camera = cameraPosition;
            updateTutorial();
        });

        WA.player.state.tutorialDone = true;
    }
}

function openTutorial(isForMobile: boolean): void {
    let config = {
        allow: "",
        name: "tutorial",
        url: "/tutorial.html",
        position: {
            height: 224,
            width: 407,
            x: 16,
            y: -112,
        },
        visible: true,
        allowApi: true,
        origin: "player",
        scale: 0.9,
    };

    if (isForMobile) {
        config = { ...config, position: { x: 32, y: -225, height: 390, width: 250 }, scale: 1 };
    }
    WA.room.website.create(config);
}
