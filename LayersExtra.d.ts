import type { ITiledMapTileLayer } from "@workadventure/tiled-map-type-guard/dist/ITiledMapTileLayer";
export declare function findLayerBoundaries(layer: ITiledMapTileLayer): {
    top: number;
    left: number;
    right: number;
    bottom: number;
};
export declare function findLayersBoundaries(layers: ITiledMapTileLayer[]): {
    top: number;
    left: number;
    right: number;
    bottom: number;
};
