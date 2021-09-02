import type { Properties } from "../Properties";

export function initVariableActionLayer(properties: Properties): void {
    const variableName = properties.getString("bindVariable");
    if (variableName) {
        const zone = properties.getString("zone");
        if (!zone) {
            throw new Error(
                'A layer with a "bindVariable" property must ALSO have a "zone" property.',
            );
        }
        const enterValue = properties.get("enterValue");
        const leaveValue = properties.get("leaveValue");
        const triggerMessage = properties.getString("triggerMessage");
        const tag = properties.getString("tag");

        setupVariableActionLayer(variableName, zone, enterValue, leaveValue, triggerMessage, tag);
    }
}

function setupVariableActionLayer(
    variableName: string,
    zone: string,
    enterValue: unknown,
    leaveValue: unknown,
    triggerMessage: string | undefined,
    tag: string | undefined,
): void {
    if (tag && !WA.player.tags.includes(tag)) {
        return;
    }

    if (enterValue !== undefined) {
        WA.room.onEnterZone(zone, () => {
            if (triggerMessage) {
                // TODO WHEN WA.ui.displayMessage is merged!
                //WA.ui.
            } else {
                WA.state[variableName] = enterValue;
            }
        });
    }
    if (leaveValue !== undefined) {
        WA.room.onLeaveZone(zone, () => {
            WA.state[variableName] = leaveValue;
        });
    }
}
