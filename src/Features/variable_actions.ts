import { getLayersMap } from "../LayersFlattener";
import { Properties } from "../Properties";

export async function initVariableActions(): Promise<void> {
    const layers = await getLayersMap();

    for (const layer of layers.values()) {
        const properties = new Properties(layer.properties);
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

            initVariableActionLayer(
                variableName,
                zone,
                enterValue,
                leaveValue,
                triggerMessage,
                tag,
            );
        }
    }
}

function initVariableActionLayer(
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
