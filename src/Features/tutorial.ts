
export function initTutorial(){
    //@ts-ignore
    WA.player.getPlayerProperty('firstConnection').then((firstConnectionProperty) => {
            if(firstConnectionProperty.propertyValue != "false"){
                openTutorial();
                //@ts-ignore
                WA.player.setPlayerProperty({
                    propertyName: 'firstConnection',
                    propertyValue: false
                })
            }
        }
    )
}

export function openTutorial() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // Creates tutorial iFrame for mobile devices
        WA.room.website.create({
            name: 'tutorial',
            url: '/tutorial.html',
            position: {
                x: 5,
                y: 75,
                width: 375,
                height: screen.height,
            },
            visible: true,
            allowApi: true,
        })
    } else {
        // Create tutorial iFrame for web desktop
        WA.room.website.create({
            name: 'tutorial',
            url: '/tutorial.html',
            position: {
                x: 100,
                y: 100,
                width: 600,
                height: screen.height
            },
            visible: true,
            allowApi: true,
        });
    }
}

export function replay(){
    WA.room.website.delete('tutorial');
    //@ts-ignore
    openTutorial();
}
