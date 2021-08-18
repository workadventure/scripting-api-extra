import { ITiledMapProperty } from "@workadventure/tiled-map-type-guard/dist";

export class Properties {
    private properties: ITiledMapProperty[];

    public constructor(properties: ITiledMapProperty[] | undefined) {
        this.properties = properties ?? [];
    }

    public get(name: string): string | boolean | number | undefined {
        const values = this.properties
            .filter((property) => property.name === name)
            .map((property) => property.value);
        if (values.length > 1) {
            throw new Error('Expected only one property to be named "' + name + '"');
        }
        if (values.length === 0) {
            return undefined;
        }
        return values[0];
    }

    public getString(name: string): string | undefined {
        return this.getByType(name, "string") as string | undefined;
    }

    public getNumber(name: string): number | undefined {
        return this.getByType(name, "number") as number | undefined;
    }

    public getBoolean(name: string): boolean | undefined {
        return this.getByType(name, "boolean") as boolean | undefined;
    }

    private getByType(
        name: string,
        type: "string" | "number" | "boolean",
    ): string | boolean | number | undefined {
        const value = this.get(name);
        if (value === undefined) {
            return undefined;
        }
        if (typeof value !== type) {
            throw new Error('Expected property "' + name + '" to have type "' + type + '"');
        }
        return value;
    }

    public mustGetString(name: string): string {
        return this.mustGetByType(name, "string") as string;
    }

    public mustGetNumber(name: string): number {
        return this.mustGetByType(name, "number") as number;
    }

    public mustGetBoolean(name: string): boolean {
        return this.mustGetByType(name, "boolean") as boolean;
    }

    private mustGetByType(
        name: string,
        type: "string" | "number" | "boolean",
    ): string | boolean | number | undefined {
        const value = this.get(name);
        if (value === undefined) {
            throw new Error('Property "' + name + '" is missing');
        }
        if (typeof value !== type) {
            throw new Error('Expected property "' + name + '" to have type "' + type + '"');
        }
        return value;
    }
}
