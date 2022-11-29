import type { ITiledMapProperty } from "@workadventure/tiled-map-type-guard";
export declare class Properties {
    private properties;
    constructor(properties: ITiledMapProperty[] | undefined);
    get(name: string): ITiledMapProperty["value"];
    getString(name: string): string | undefined;
    getNumber(name: string): number | undefined;
    getBoolean(name: string): boolean | undefined;
    private getByType;
    mustGetString(name: string): string;
    mustGetNumber(name: string): number;
    mustGetBoolean(name: string): boolean;
    private mustGetByType;
    getType(name: string): string | undefined;
}
