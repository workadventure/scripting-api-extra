<script lang="ts">
    import {VariableDescriptor} from "../../../VariablesExtra";
    import {createStoreFromVariable} from "../../../VariableMapper";

    export let variable: VariableDescriptor;

    let label: string = variable.properties.getString('label') ?? variable.name;
    let type: string = variable.properties.getString('type') ?? (variable.properties.getType('default') === 'bool' ? 'checkbox' : 'text');

    const variableStore = createStoreFromVariable(variable.name);
    const description = variable.properties.getString('description');

    function getAllowedValues() {
        const allowedValuesStr = variable.properties.mustGetString('allowed_values');
        return JSON.parse(allowedValuesStr);
    }

    function onChange(event) {
        $variableStore = event.target.value;
    }
</script>


{#if type === 'checkbox' }
    <label class="field">
        <input type="checkbox" class="nes-checkbox" bind:checked={ $variableStore } disabled={!variable.isWritable} />
        <span>{label}</span>
    </label>
{:else if type === 'select' }
    <label>{label}</label>
    <div class="nes-select field">
    <select bind:value={ $variableStore } disabled={!variable.isWritable}>
    {#each Object.entries(getAllowedValues()) as [name, value] }
        <option value={value}>{ name }</option>
    {/each}
    </select>
    </div>
{:else if type === 'radio' }
    <label>{label}</label>
    <div class="field">
            {#each Object.entries(getAllowedValues()) as [name, value] }
                <label>
                    <input type="radio" class="nes-radio" bind:group={$variableStore} name={variable.name} value={value} disabled={!variable.isWritable} />
                    <span>{name}</span>
                </label>
            {/each}
    </div>
{:else}
    <div class="nes-field field">
        <label>{label}</label>
        <input type="text" value={ $variableStore } on:change={onChange} class="nes-input" disabled={!variable.isWritable} />
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
