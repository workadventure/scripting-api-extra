import { ITiledMapProperty } from "@workadventure/tiled-map-type-guard/dist";

export class Properties {
    private properties: ITiledMapProperty[];

    public constructor(properties: ITiledMapProperty[] | undefined) {
        this.properties = properties ?? [];
    }

    public getMany(name: string): (string | boolean | number | undefined)[] {
        return this.properties
            .filter((property) => property.name === name)
            .map((property) => property.value);
    }

    public getOne(name: string): string | boolean | number | undefined {
        const values = this.getMany(name);
        if (values.length > 1) {
            throw new Error('Expected only one property to be named "' + name + '"');
        }
        if (values.length === 0) {
            return undefined;
        }
        return values[0];
    }

    public getOneString(name: string): string | undefined {
        const value = this.getOne(name);
        if (value === undefined) {
            return undefined;
        }
        if (typeof value !== "string") {
            throw new Error('Expected property "' + name + '" to have type "string"');
        }
        return value;
    }

    public getOneBoolean(name: string): boolean | undefined {
        const value = this.getOne(name);
        if (value === undefined) {
            return undefined;
        }
        if (typeof value !== "boolean") {
            throw new Error('Expected property "' + name + '" to have type "boolean"');
        }
        return value;
    }
}
