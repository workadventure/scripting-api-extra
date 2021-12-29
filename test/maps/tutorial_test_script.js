WA.onInit().then(() => {
    let message;

    WA.room.onEnterLayer("reset-zone").subscribe(() => {
        message = WA.ui.displayActionMessage({
            message: "Press space to reset your first connection status and reload.",
            callback: () => {
                WA.player.state.tutorialDone = false;
                window.location.reload();
            },
        });
    });

    WA.room.onLeaveLayer("reset-zone").subscribe(() => {
        message && message.remove();
    });
});
