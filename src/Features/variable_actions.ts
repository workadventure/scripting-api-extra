import { getFlattenedLayers } from "../LayersFlattener";
import { Properties } from "../Properties";

export async function initVariableActions(): Promise<void> {
    const layers = await getFlattenedLayers();

    for (const layer of layers) {
        const properties = new Properties(layer.properties ?? []);
        const variableName = properties.getOneString("bindVariable");
        if (variableName) {
            const zone = properties.getOneString("zone");
            if (!zone) {
                throw new Error(
                    'A layer with a "bindVariable" property must ALSO have a "zone" property.',
                );
            }
            const enterValue = properties.getOne("enterValue");
            const leaveValue = properties.getOne("leaveValue");
            const triggerMessage = properties.getOneString("triggerMessage");
            const tag = properties.getOneString("tag");

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
