export function initTutorial(): void {
    WA.onInit().then(() => {
        const tutorialDone = WA.player.state.tutorialDone;
        if (!tutorialDone) {
            openTutorial();
            WA.player.state.tutorialDone = true;
        }
    });
}

export function openTutorial(): void {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // Creates tutorial iFrame for mobile devices
        WA.room.website.create({
            name: "tutorial",
            url: "/tutorial.html",
            position: {
                x: 5,
                y: 75,
                width: 375,
                height: screen.height,
            },
            visible: true,
            allowApi: true,
        });
    } else {
        // Create tutorial iFrame for web desktop
        WA.room.website.create({
            name: "tutorial",
            url: "/tutorial.html",
            position: {
                x: 100,
                y: 100,
                width: 600,
                height: screen.height,
            },
            visible: true,
            allowApi: true,
        });
    }
}

export function replay(): void {
    WA.room.website.delete("tutorial");
    openTutorial();
}
