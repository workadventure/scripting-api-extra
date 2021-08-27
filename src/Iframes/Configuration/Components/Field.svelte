<script lang="ts">
    import {VariableDescriptor} from "../../../VariablesExtra";
    import {createStoreFromVariable} from "../../../VariableMapper";

    export let variable: VariableDescriptor;

    export let label: string = variable.properties.getString('label') ?? variable.name;
    export let type: string = variable.properties.getString('type') ?? variable.properties.getType('default');

    const variableStore = createStoreFromVariable(variable.name);

    function onChange(event) {
        $variableStore = event.target.value;
    }
</script>

<div>
    <label>{label}</label>
    {#if type === 'bool' }
        <input type="checkbox" bind:checked={ $variableStore } />
    {:else}
        <input type="text" value={ $variableStore } on:change={onChange} />
    {/if}
</div>


<style lang="scss">
</style>
