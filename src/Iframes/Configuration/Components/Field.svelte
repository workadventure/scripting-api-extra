<script lang="ts">
    import type {VariableDescriptor} from "../../../VariablesExtra";
    import {createStoreFromVariable} from "../../../VariableMapper";
    import type {Writable} from "svelte/store";

    export let variable: VariableDescriptor;

    let label: string = variable.properties.getString('label') ?? variable.name;
    let type: string = variable.properties.getString('type') ?? (variable.properties.getType('default') === 'bool' ? 'checkbox' : 'text');

    const variableStore = createStoreFromVariable(variable.name);
    const description = variable.properties.getString('description');

    const stringVariableStore = variableStore as Writable<string>;
    const boolVariableStore = variableStore as Writable<boolean>;

    function getAllowedValues() {
        const allowedValuesStr = variable.properties.mustGetString('allowed_values');
        return JSON.parse(allowedValuesStr) as {[key: string]: string | number | undefined};
    }

    function onChange(event: Event) {
        $variableStore = (event.target as HTMLInputElement).value;
    }
</script>

{#if type === 'checkbox' }
    <label class="field">
        <input type="checkbox" class="nes-checkbox" bind:checked={ $boolVariableStore } disabled={!variable.isWritable} />
        <span>{label}</span>
    </label>
{:else if type === 'select' }
    <label for={variable.name}>{label}</label>
    <div class="nes-select field">
    <select id={variable.name} bind:value={ $variableStore } disabled={!variable.isWritable}>
    {#each Object.entries(getAllowedValues()) as [name, value] }
        <option value={value}>{ name }</option>
    {/each}
    </select>
    </div>
{:else if type === 'radio' }
    <span>{label}</span>
    <div class="field">
            {#each Object.entries(getAllowedValues()) as [name, value] }
                <label>
                    <input type="radio" class="nes-radio" bind:group={$stringVariableStore} name={variable.name} value={ value } disabled={!variable.isWritable} />
                    <span>{name}</span>
                </label>
            {/each}
    </div>
{:else}
    <div class="nes-field field">
        <label for="input_{variable.name}">{label}</label>
        <input id="input_{variable.name}" type="text" value={ $stringVariableStore } on:change={onChange} class="nes-input" disabled={!variable.isWritable} />
    </div>
{/if}
{#if description }
<div class="description">{ description }</div>
{/if}


<style lang="scss">
    .field {
        margin-bottom: 30px;
    }

    .description {
        margin-top: -25px;
        color: #777;
        margin-bottom: 30px;
    }
</style>
