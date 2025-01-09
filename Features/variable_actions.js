export function initVariableActionLayer(properties, layerName) {
    const variableName = properties.getString("bindVariable");
    if (variableName) {
        const enterValue = properties.get("enterValue");
        const leaveValue = properties.get("leaveValue");
        const triggerMessage = properties.getString("triggerMessage");
        const tag = properties.getString("tag");
        setupVariableActionLayer(variableName, layerName, enterValue, leaveValue, triggerMessage, tag);
    }
}
let actionMessagePopup;
function setupVariableActionLayer(variableName, layerName, enterValue, leaveValue, triggerMessage, tag) {
    if (tag && !WA.player.tags.includes(tag)) {
        return;
    }
    if (enterValue !== undefined) {
        WA.room.onEnterLayer(layerName).subscribe(() => {
            if (triggerMessage) {
                actionMessagePopup = WA.ui.displayActionMessage({
                    type: "message",
                    message: triggerMessage,
                    callback: () => {
                        WA.state[variableName] = enterValue;
                    },
                });
            }
            else {
                WA.state[variableName] = enterValue;
            }
        });
    }
    if (leaveValue !== undefined) {
        WA.room.onLeaveLayer(layerName).subscribe(() => {
            WA.state[variableName] = leaveValue;
            if (actionMessagePopup) {
                actionMessagePopup.remove().catch((e) => {
                    console.error(e);
                });
                actionMessagePopup = undefined;
            }
        });
    }
}
//# sourceMappingURL=variable_actions.js.map