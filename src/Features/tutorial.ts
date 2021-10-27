export function initTutorial(): void {
    WA.onInit().then(() => {
        const tutorialDone = WA.player.state.tutorialDone;
        if (!tutorialDone) {
            WA.player.getStartPosition().then((position: Position) => {
                openTutorial(position);
                WA.player.state.tutorialDone = true;
            });
        }
    });
}

export function openTutorial(position: Position): void {
    //TODO: check that the iframe is inside boundaries when based on player position. Else, get it back within limits
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // Creates tutorial iFrame for mobile devices
        const frameWidth = 375;
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
        // Create tutorial iFrame for web desktop
        const frameWidth = 600;
        WA.room.website.create({
            name: "tutorial",
            url: "/tutorial.html",
            position: {
                x: position.x - frameWidth / 2,
                y: position.y + 96,
                width: frameWidth,
                height: screen.height,
            },
            visible: true,
            allowApi: true,
        });
    }
}

export function replay(): void {
    WA.room.website.delete("tutorial");
    //TODO: use CURRENT position of the player
    WA.player.getStartPosition().then((position: Position) => {
        openTutorial(position);
    });
}

type Position = {
    x: number;
    y: number;
};
