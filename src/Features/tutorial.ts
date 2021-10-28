export function initTutorial(): void {
    WA.onInit().then(() => {
        //@ts-ignore
        const tutorialDone = WA.player.state.tutorialDone;
        if (!tutorialDone) {
            //@ts-ignore
            WA.player.getPosition().then((position: Position) => {
                openTutorial(position);
                //@ts-ignore
                //WA.player.state.tutorialDone = true;
            });
        }
    });
}

export function openTutorial(position: Position): void {
    //TODO: check that the iframe is inside boundaries when based on player position. Else, get it back within limits
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // Creates tutorial iFrame for mobile devices
        const frameWidth = 375;
        const frameHeight = 600;
        WA.room.website.create({
            name: "tutorial",
            url: "/tutorial.html",
            position: {
                x: position.x - frameWidth / 2,
                y: position.y + 64,
                width: frameWidth,
                height: screen.height,
            },
            visible: true,
            allowApi: true,
        });
    } else {
        //TODO: place it elsewhere
        WA.room.getTiledMap().then((currentMap) => {
            console.log(currentMap);
            // Setup for iframe coordinates calculations
            const frameWidth: number = 600;
            const frameWidthAsTiles: number = frameWidth / currentMap.tilewidth;

            const frameHeight: number = 450;
            const frameHeightAsTiles: number = frameHeight / currentMap.tileheight;

            const margin: number = 10;

            let frameLeft = position.x - frameWidth / 2;
            let frameTop: number = position.y + currentMap.tileheight;
            let frameRight: number = frameLeft + frameWidth;
            let frameBottom: number = frameTop + frameHeight;

            //Correct starting x position if the iFrame crosses the map's left limit
            if (frameLeft < 0) {
                frameLeft = margin;
            }

            //Correct ending x position if the iFram crosses the map's right limit
            console.log("flag mapwidth px", currentMap.width * currentMap.tilewidth);
            console.log("flag frame rightx", frameRight);
            if (frameRight > currentMap.width * currentMap.tilewidth) {
                const overflow = frameRight - currentMap.width * currentMap.tilewidth;
                frameLeft = frameLeft - overflow - margin;
            }

            // Create tutorial iFrame for web desktop
            WA.room.website.create({
                name: "tutorial",
                url: "/tutorial.html",
                position: {
                    x: frameLeft,
                    y: frameTop,
                    width: frameWidth,
                    height: frameHeight,
                },
                visible: true,
                allowApi: true,
            });
        });
    }
}

export function replay(): void {
    WA.room.website.delete("tutorial");
    //TODO: use CURRENT position of the player
    //@ts-ignore
    WA.player.getPosition().then((position) => {
        openTutorial(position);
    });
}

type Position = {
    x: number;
    y: number;
};
