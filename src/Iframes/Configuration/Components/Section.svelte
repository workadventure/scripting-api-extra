<script lang="ts">
    import Field from "./Field.svelte";
    import {currentPage} from "../Stores/NavigationStore";
    import {variablesStore} from "../Stores/VariablesStore";
    import type {ITiledMapObjectLayer} from "@workadventure/tiled-map-type-guard/dist";
    import {Properties} from "../../../Properties";
    import {layerStore} from "../Stores/LayersStore";

    let layer = $layerStore as ITiledMapObjectLayer;

    const properties = new Properties(layer.properties);
</script>

{#if $currentPage !== 'configuration' }
    <div class="left mb-20">
        <button class="nes-btn" on:click={() => { $currentPage = $currentPage.substr(0, $currentPage.indexOf('/')) }}>&lt; Back</button>
    </div>
{/if}

<div>
    {#if $variablesStore}
        <div class="{ properties.get('name') ? 'nes-container with-title' : '' }">
            {#if properties.get("name") }
                <p class="title">{ properties.get("name") }</p>
            {/if}
            {#each [...$variablesStore.values()] as variable }
                {#if variable.isReadable}
                    <Field variable={variable} />
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    div.left {
        text-align: left;
    }
    .mb-20 {
        margin-bottom: 20px;
    }
</style>
