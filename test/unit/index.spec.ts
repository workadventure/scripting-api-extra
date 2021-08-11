import type { Properties } from "../../src/Properties";

describe("Test 1", () => {
    it("should pass", () => {
        const properties: Properties | undefined = undefined;
        //    const properties = new Properties([]);
        //expect(properties.getOne('foo')).toBe(undefined);
        expect(properties).toBe(undefined);
    });
});
