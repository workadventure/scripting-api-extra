<script lang="ts">
    //import type {WorkAdventureApi} from "@workadventure/iframe-api-typings";
    import type {ITiledMapObjectLayer} from "@workadventure/tiled-map-type-guard/dist";
    import {Properties} from "../../../Properties";
    import {VariableDescriptor} from "../../../VariablesExtra";
    import Field from "./Field.svelte";
    import {currentPage} from "../Stores/currentPage";
    export let layer: ITiledMapObjectLayer;

    const properties = new Properties(layer.properties);

    // remove the "#" in order to split the hash into an array
    let hash = window.location.hash
    hash = hash.substring(1);
    const variablesToDisplay = hash.split(',');

    let variables = initVariables()
    // if a hash is passed in the URL, use the parameters to filter the variables to display
    if (hash) variables = initFilterVariables()

    function initVariables() {
        return layer.objects.filter((object) => object.type === 'variable').map((variable) => new VariableDescriptor(variable));
    }
    function initFilterVariables() {
        return layer.objects.filter((object) => object.type === 'variable' && variablesToDisplay.includes(object.name)).map((variable) => new VariableDescriptor(variable));
    }
</script>

{#if $currentPage !== 'configuration' }
    <div class="left mb-20">
        <button class="nes-btn" on:click={() => { $currentPage = $currentPage.substr(0, $currentPage.indexOf('/')) }}>&lt; Back</button>
    </div>
{/if}

<div>
    <div class="{ properties.get('name') ? 'nes-container with-title': '' }">
            {#if properties.get("name") }
            <p class="title">{ properties.get("name") }</p>
        {/if}

        {#each variables as variable }
            {#if variable.isReadable}
                <Field variable={variable} />
            {/if}
        {/each}
    </div>
</div>

<style lang="scss">
    div.left {
        text-align: left;
    }
    .mb-20 {
        margin-bottom: 20px;
    }
</style>
