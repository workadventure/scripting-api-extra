import type { WorkadventureStateCommands } from "@workadventure/iframe-api-typings/front/Api/Iframe/state";
export declare class TemplateValue {
    private template;
    private state;
    private readonly ast;
    private value;
    constructor(template: string, state: WorkadventureStateCommands);
    getValue(): string;
    onChange(callback: (newValue: string) => void): {
        unsubscribe: () => void;
    };
    isPureString(): boolean;
    getUsedVariables(): Set<string>;
    private recursiveGetUsedVariables;
}
