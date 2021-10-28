import type { ITiledMap } from "@workadventure/tiled-map-type-guard/dist";

export function initTutorial(): void {
    WA.onInit().then(() => {
        //@ts-ignore
        const tutorialDone = WA.player.state.tutorialDone;
        if (!tutorialDone) {
            //@ts-ignore-
            WA.player.getPosition().then((position: Position) => {
                openTutorial(position);
                //@ts-ignore
                //WA.player.state.tutorialDone = true;
            });
        }
    });
}

export function openTutorial(position: Position): void {
    //Displaying the iFrame differently depending on the device
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        WA.room.getTiledMap().then((currentMap) => {
            processIframeConfig({
                map: currentMap,
                height: 630,
                width: 375,
                margin: 20,
                playerPosition: position,
            });
        });
    } else {
        WA.room.getTiledMap().then((currentMap) => {
            processIframeConfig({
                map: currentMap,
                height: 430,
                width: 600,
                margin: 20,
                playerPosition: position,
            });
        });
    }
}

export function replay(): void {
    WA.room.website.delete("tutorial");
    //@ts-ignore
    WA.player.getPosition().then((position) => {
        openTutorial(position);
    });
}

function processIframeConfig(config: IframeConfigInput): void {
    if (
        !config.map.height ||
        !config.map.tileheight ||
        !config.map.width ||
        !config.map.tilewidth
    ) {
        throw new Error(
            "Unable to process map size. Height, tileheight, width and tilewidth should be defined.",
        );
    }

    let frameLeft = config.playerPosition.x - config.width / 2;
    let frameTop: number = config.playerPosition.y + config.map.tileheight;
    let frameRight: number = frameLeft + config.width;
    let frameBottom: number = frameTop + config.height;

    //Correcting starting x position if the iFrame crosses the map's left limit
    if (frameLeft < 0) {
        frameLeft = config.margin;
    }

    //Correcting starting x position if the iFrame crosses the map's right limit
    if (frameRight > config.map.width * config.map.tilewidth) {
        const overflow = frameRight - config.map.width * config.map.tilewidth;
        frameLeft = frameLeft - overflow - config.margin;
    }

    //Correcting starting y position if the iFrame crosses the map's bottom limit
    if (frameBottom > config.map.height * config.map.tileheight) {
        const overflow = frameBottom - config.map.height * config.map.tileheight;
        frameTop = frameTop - overflow - config.margin - config.map.tileheight; //let's add a space the size of a tile in order not to hide the player
    }

    // Creating the iFrame
    WA.room.website.create({
        name: "tutorial",
        url: "/tutorial.html",
        position: {
            x: frameLeft,
            y: frameTop,
            width: config.width,
            height: config.height,
        },
        visible: true,
        allowApi: true,
    });
}

type Position = {
    x: number;
    y: number;
};

type IframeConfigInput = {
    playerPosition: Position;
    width: number;
    height: number;
    margin: number;
    map: ITiledMap;
};
