// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import "./style/style.scss";
import App from "./Components/App.svelte";
import type {ITiledMap} from "@workadventure/tiled-map-type-guard/dist";

(async () => {
    const map : ITiledMap = await WA.room.getTiledMap();

    const configurationLayer = map.layers.find(layer => layer.name === 'configuration');

    if (configurationLayer === undefined) {
        throw new Error('Could not find a layer with the name "configuration" on the map');
    }

    new App({
        target: document.body,
        props: {
            configurationLayer: configurationLayer,
        },
    });
})().catch((e) => {
    console.error(e);
});

export {};
