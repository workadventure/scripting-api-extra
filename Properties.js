export class Properties {
    constructor(properties) {
        this.properties = properties !== null && properties !== void 0 ? properties : [];
    }
    get(name) {
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
    getString(name) {
        return this.getByType(name, "string");
    }
    getNumber(name) {
        return this.getByType(name, "number");
    }
    getBoolean(name) {
        return this.getByType(name, "boolean");
    }
    getByType(name, type) {
        const value = this.get(name);
        if (value === undefined) {
            return undefined;
        }
        if (type !== "json" && typeof value !== type) {
            throw new Error('Expected property "' + name + '" to have type "' + type + '"');
        }
        return value;
    }
    mustGetString(name) {
        return this.mustGetByType(name, "string");
    }
    mustGetNumber(name) {
        return this.mustGetByType(name, "number");
    }
    mustGetBoolean(name) {
        return this.mustGetByType(name, "boolean");
    }
    mustGetByType(name, type) {
        const value = this.get(name);
        if (value === undefined) {
            throw new Error('Property "' + name + '" is missing');
        }
        if (type !== "json" && typeof value !== type) {
            throw new Error('Expected property "' + name + '" to have type "' + type + '"');
        }
        return value;
    }
    getType(name) {
        const types = this.properties
            .filter((property) => property.name === name)
            .map((property) => property.type);
        if (types.length > 1) {
            throw new Error('Expected only one property to be named "' + name + '"');
        }
        if (types.length === 0) {
            return undefined;
        }
        return types[0];
    }
}
//# sourceMappingURL=Properties.js.map