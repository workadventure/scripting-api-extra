import type { ITiledMapObject } from "@workadventure/tiled-map-type-guard/dist";
import { Properties } from "./Properties";
export declare class VariableDescriptor {
    readonly name: string;
    readonly x: number;
    readonly y: number;
    readonly properties: Properties;
    constructor(object: ITiledMapObject);
    get isReadable(): boolean;
    get isWritable(): boolean;
}
export declare function openConfig(variables?: string[]): void;
export declare function getVariables(layerFilter?: string, variablesFilter?: Array<string>): Promise<Map<string, VariableDescriptor>>;
