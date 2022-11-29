/**
 * A value of a property that can be evaluated / tracked using Mustache templates
 */
import type { WorkadventureStateCommands } from "@workadventure/iframe-api-typings/front/Api/Iframe/state";
import Mustache from "mustache";

type RAW_VALUE = "text";
type ESCAPED_VALUE = "name";
type UNESCAPED_VALUE = "&";
type SECTION = "#";
type INVERTED = "^";
type COMMENT = "!";
type PARTIAL = ">";
type EQUAL = "=";

type TemplateSpanType =
    | RAW_VALUE
    | ESCAPED_VALUE
    | SECTION
    | UNESCAPED_VALUE
    | INVERTED
    | COMMENT
    | PARTIAL
    | EQUAL;

type TemplateSpans = Array<
    | [TemplateSpanType, string, number, number]
    | [TemplateSpanType, string, number, number, TemplateSpans, number]
    | [TemplateSpanType, string, number, number, string, number, boolean]
>;

export class TemplateValue {
    private readonly ast: TemplateSpans;
    private value: string | undefined;

    constructor(private template: string, private state: WorkadventureStateCommands) {
        this.ast = Mustache.parse(template);
    }

    public getValue(): string {
        if (this.value === undefined) {
            this.value = Mustache.render(this.template, this.state);
        }
        return this.value;
    }

    public onChange(callback: (newValue: string) => void): { unsubscribe: () => void } {
        const subscriptions: { unsubscribe(): void }[] = [];
        for (const variableName of this.getUsedVariables().values()) {
            subscriptions.push(
                this.state.onVariableChange(variableName).subscribe(() => {
                    const newValue = Mustache.render(this.template, this.state);
                    if (newValue !== this.value) {
                        this.value = newValue;
                        callback(this.value);
                    }
                }),
            );
        }
        return {
            unsubscribe: () => {
                for (const subscription of subscriptions) {
                    subscription.unsubscribe();
                }
            },
        };
    }

    public isPureString(): boolean {
        return this.ast.length === 0 || (this.ast.length === 1 && this.ast[0][0] === "text");
    }

    public getUsedVariables(): Set<string> {
        const variables = new Set<string>();
        this.recursiveGetUsedVariables(this.ast, variables);
        return variables;
    }

    private recursiveGetUsedVariables(ast: TemplateSpans, variables: Set<string>): void {
        for (const token of ast) {
            const type = token[0];
            const name = token[1];
            const subAst = token[4];
            if (["name", "&", "#", "^"].includes(type)) {
                variables.add(name);
            }
            if (subAst !== undefined && typeof subAst !== "string") {
                this.recursiveGetUsedVariables(subAst, variables);
            }
        }
    }
}
