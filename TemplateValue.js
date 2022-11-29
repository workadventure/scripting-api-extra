import Mustache from "mustache";
export class TemplateValue {
    constructor(template, state) {
        this.template = template;
        this.state = state;
        this.ast = Mustache.parse(template);
    }
    getValue() {
        if (this.value === undefined) {
            this.value = Mustache.render(this.template, this.state);
        }
        return this.value;
    }
    onChange(callback) {
        const subscriptions = [];
        for (const variableName of this.getUsedVariables().values()) {
            subscriptions.push(this.state.onVariableChange(variableName).subscribe(() => {
                const newValue = Mustache.render(this.template, this.state);
                if (newValue !== this.value) {
                    this.value = newValue;
                    callback(this.value);
                }
            }));
        }
        return {
            unsubscribe: () => {
                for (const subscription of subscriptions) {
                    subscription.unsubscribe();
                }
            },
        };
    }
    isPureString() {
        return this.ast.length === 0 || (this.ast.length === 1 && this.ast[0][0] === "text");
    }
    getUsedVariables() {
        const variables = new Set();
        this.recursiveGetUsedVariables(this.ast, variables);
        return variables;
    }
    recursiveGetUsedVariables(ast, variables) {
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
//# sourceMappingURL=TemplateValue.js.map