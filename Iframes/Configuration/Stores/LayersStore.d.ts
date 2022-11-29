import { Readable } from "svelte/store";
export declare const configurationLayerStore: Readable<{
    class?: string | undefined;
    x?: number | undefined;
    y?: number | undefined;
    chunks?: {
        data: string | number[];
        height: number;
        width: number;
        x: number;
        y: number;
    }[] | undefined;
    compression?: string | undefined;
    encoding?: "csv" | "base64" | undefined;
    offsetx?: number | undefined;
    offsety?: number | undefined;
    parallaxx?: number | undefined;
    parallaxy?: number | undefined;
    properties?: ({
        value?: string | undefined;
        propertytype?: string | undefined;
        type: "string" | "color" | "file";
        name: string;
    } | {
        value?: number | undefined;
        propertytype?: string | undefined;
        type: "object" | "int";
        name: string;
    } | {
        value?: number | undefined;
        propertytype?: string | undefined;
        type: "float";
        name: string;
    } | {
        value?: boolean | undefined;
        propertytype?: string | undefined;
        type: "bool";
        name: string;
    } | {
        value?: import("@workadventure/tiled-map-type-guard/dist").Json | undefined;
        propertytype?: string | undefined;
        type: "class";
        name: string;
    })[] | undefined;
    startx?: number | undefined;
    starty?: number | undefined;
    tintcolor?: string | undefined;
    type: "tilelayer";
    name: string;
    data: string | number[];
    height: number;
    width: number;
    id: number;
    opacity: number;
    visible: boolean;
} | import("@workadventure/tiled-map-type-guard/dist/ITiledMapGroupLayer").TiledMapGroupLayer | {
    class?: string | undefined;
    height?: number | undefined;
    width?: number | undefined;
    x?: number | undefined;
    y?: number | undefined;
    id?: number | undefined;
    offsetx?: number | undefined;
    offsety?: number | undefined;
    parallaxx?: number | undefined;
    parallaxy?: number | undefined;
    properties?: ({
        value?: string | undefined;
        propertytype?: string | undefined;
        type: "string" | "color" | "file";
        name: string;
    } | {
        value?: number | undefined;
        propertytype?: string | undefined;
        type: "object" | "int";
        name: string;
    } | {
        value?: number | undefined;
        propertytype?: string | undefined;
        type: "float";
        name: string;
    } | {
        value?: boolean | undefined;
        propertytype?: string | undefined;
        type: "bool";
        name: string;
    } | {
        value?: import("@workadventure/tiled-map-type-guard/dist").Json | undefined;
        propertytype?: string | undefined;
        type: "class";
        name: string;
    })[] | undefined;
    startx?: number | undefined;
    starty?: number | undefined;
    tintcolor?: string | undefined;
    draworder?: string | undefined;
    type: "objectgroup";
    name: string;
    opacity: number;
    visible: boolean;
    objects: {
        type?: string | undefined;
        class?: string | undefined;
        height?: number | undefined;
        width?: number | undefined;
        properties?: ({
            value?: string | undefined;
            propertytype?: string | undefined;
            type: "string" | "color" | "file";
            name: string;
        } | {
            value?: number | undefined;
            propertytype?: string | undefined;
            type: "object" | "int";
            name: string;
        } | {
            value?: number | undefined;
            propertytype?: string | undefined;
            type: "float";
            name: string;
        } | {
            value?: boolean | undefined;
            propertytype?: string | undefined;
            type: "bool";
            name: string;
        } | {
            value?: import("@workadventure/tiled-map-type-guard/dist").Json | undefined;
            propertytype?: string | undefined;
            type: "class";
            name: string;
        })[] | undefined;
        text?: {
            color?: string | undefined;
            bold?: boolean | undefined;
            fontfamily?: string | undefined;
            halign?: "center" | "right" | "justify" | "left" | undefined;
            italic?: boolean | undefined;
            kerning?: boolean | undefined;
            pixelsize?: number | undefined;
            strikeout?: boolean | undefined;
            underline?: boolean | undefined;
            valign?: "center" | "bottom" | "top" | undefined;
            wrap?: boolean | undefined;
            text: string;
        } | undefined;
        ellipse?: boolean | undefined;
        gid?: number | undefined;
        point?: boolean | undefined;
        polygon?: {
            x: number;
            y: number;
        }[] | undefined;
        polyline?: {
            x: number;
            y: number;
        }[] | undefined;
        rotation?: number | undefined;
        template?: string | undefined;
        name: string;
        x: number;
        y: number;
        id: number;
        visible: boolean;
    }[];
} | {
    class?: string | undefined;
    height?: number | undefined;
    width?: number | undefined;
    x?: number | undefined;
    y?: number | undefined;
    id?: number | undefined;
    offsetx?: number | undefined;
    offsety?: number | undefined;
    parallaxx?: number | undefined;
    parallaxy?: number | undefined;
    properties?: ({
        value?: string | undefined;
        propertytype?: string | undefined;
        type: "string" | "color" | "file";
        name: string;
    } | {
        value?: number | undefined;
        propertytype?: string | undefined;
        type: "object" | "int";
        name: string;
    } | {
        value?: number | undefined;
        propertytype?: string | undefined;
        type: "float";
        name: string;
    } | {
        value?: boolean | undefined;
        propertytype?: string | undefined;
        type: "bool";
        name: string;
    } | {
        value?: import("@workadventure/tiled-map-type-guard/dist").Json | undefined;
        propertytype?: string | undefined;
        type: "class";
        name: string;
    })[] | undefined;
    startx?: number | undefined;
    starty?: number | undefined;
    tintcolor?: string | undefined;
    repeatx?: boolean | undefined;
    repeaty?: boolean | undefined;
    type: "imagelayer";
    name: string;
    opacity: number;
    visible: boolean;
    image: string;
} | undefined>;
