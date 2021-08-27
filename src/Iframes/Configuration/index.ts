// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import App from "./Components/App.svelte";
import { getLayersMap } from "../../LayersFlattener";

(async () => {
    const layers = await getLayersMap();
    console.log("LAYERS", layers);

    const configurationLayer = layers.get("configuration");
    if (configurationLayer === undefined) {
        throw new Error('Could not find a layer with the name "configuration" on the map');
    }

    new App({
        target: document.body,
        props: {
            WA: WA,
            configurationLayer: configurationLayer,
        },
    });
})().catch((e) => {
    console.error(e);
});

export {};
