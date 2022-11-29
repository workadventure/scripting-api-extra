import type { WorkadventureStateCommands } from "@workadventure/iframe-api-typings/front/Api/Iframe/state";
import { TemplateValue } from "../../src/TemplateValue";

describe("Test TemplateValue", () => {
    function buildTemplateValue(template: string): TemplateValue {
        return new TemplateValue(template, {} as WorkadventureStateCommands);
    }

    it("isPureString works", () => {
        expect(buildTemplateValue("foo").isPureString()).toBe(true);
        expect(buildTemplateValue("foo bar \n baz").isPureString()).toBe(true);
        expect(buildTemplateValue("foo bar \n {{ baz }}").isPureString()).toBe(false);
        expect(buildTemplateValue("").isPureString()).toBe(true);
        expect(buildTemplateValue("{{#repos}}<b>{{name}}</b>{{/repos}}").isPureString()).toBe(
            false,
        );
    });

    it("finds used variables", () => {
        expect(buildTemplateValue("foo").getUsedVariables().size).toBe(0);
        expect(buildTemplateValue("foo bar \n {{ baz }}").getUsedVariables().has("baz")).toBe(true);
        const template = buildTemplateValue("{{#repos}}<b>{{name}}</b>{{/repos}}");
        expect(template.getUsedVariables().has("repos")).toBe(true);
        expect(template.getUsedVariables().has("name")).toBe(true);
    });
});
