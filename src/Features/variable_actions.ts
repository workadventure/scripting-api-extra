import type { Properties } from "../Properties";

export function initVariableActionLayer(properties: Properties, layerName: string): void {
    const variableName = properties.getString("bindVariable");
    if (variableName) {
        const enterValue = properties.get("enterValue");
        const leaveValue = properties.get("leaveValue");
        const triggerMessage = properties.getString("triggerMessage");
        const tag = properties.getString("tag");

        setupVariableActionLayer(
            variableName,
            layerName,
            enterValue,
            leaveValue,
            triggerMessage,
            tag,
        );
    }
}

function setupVariableActionLayer(
    variableName: string,
    layerName: string,
    enterValue: unknown,
    leaveValue: unknown,
    triggerMessage: string | undefined,
    tag: string | undefined,
): void {
    if (tag && !WA.player.tags.includes(tag)) {
        return;
    }

    if (enterValue !== undefined) {
        WA.room.onEnterLayer(layerName).subscribe(() => {
            if (triggerMessage) {
                // TODO WHEN WA.ui.displayMessage is merged!
                //WA.ui.
            } else {
                WA.state[variableName] = enterValue;
            }
        });
    }
    if (leaveValue !== undefined) {
        WA.room.onLeaveLayer(layerName).subscribe(() => {
            WA.state[variableName] = leaveValue;
        });
    }
}
