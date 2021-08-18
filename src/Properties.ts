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
        return this.getOneByType(name, "string") as string | undefined;
    }

    public getOneNumber(name: string): number | undefined {
        return this.getOneByType(name, "number") as number | undefined;
    }

    public getOneBoolean(name: string): boolean | undefined {
        return this.getOneByType(name, "boolean") as boolean | undefined;
    }

    private getOneByType(name: string, type: 'string'|'number'|'boolean'): string | boolean | number | undefined {
        const value = this.getOne(name);
        if (value === undefined) {
            return undefined;
        }
        if (typeof value !== type) {
            throw new Error('Expected property "' + name + '" to have type "' + type + '"');
        }
        return value;
    }

    public mustGetOneString(name: string): string {
        return this.mustGetOneByType(name, "string") as string;
    }

    public mustGetOneNumber(name: string): number {
        return this.mustGetOneByType(name, "number") as number;
    }

    public mustGetOneBoolean(name: string): boolean {
        return this.mustGetOneByType(name, "boolean") as boolean;
    }

    private mustGetOneByType(name: string, type: 'string'|'number'|'boolean'): string | boolean | number | undefined {
        const value = this.getOne(name);
        if (value === undefined) {
            throw new Error('Property "' + name + '" is missing');
        }
        if (typeof value !== type) {
            throw new Error('Expected property "' + name + '" to have type "' + type + '"');
        }
        return value;
    }
}
