<script lang="ts">
    import type {ITiledMapGroupLayer} from "@workadventure/tiled-map-type-guard/dist";
    import {Properties} from "../../../Properties";
    import {currentPage} from "../Stores/NavigationStore";
    import {configurationLayerStore} from "../Stores/LayersStore";

    let groupLayer = $configurationLayerStore as ITiledMapGroupLayer;
    const layers = groupLayer.layers;
</script>

<div class="flex-container">
    {#each layers as layer}
        <button class="btn light tw-w-1/3 tw-justify-center tw-mx-6 tw-relative tw-cursor-pointer" on:click={() => { $currentPage = layer.name }}>
        { new Properties(layer.properties).getString('label') ?? layer.name }
        </button>
    {/each}
</div>

{#if $currentPage !== 'configuration' }
    <button class="btn blue-title tw-underline tw-decoration-light-blue tw-cursor-pointe" on:click={() => { $currentPage = $currentPage.substring(0, $currentPage.indexOf('/')) }}>Back</button>
{/if}

<style lang="scss">
    .flex-container {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;

        button {
            padding: 5px;
            width: 40%;
            height: 100px;
            margin: 5%;

            text-align: center;
            word-wrap: break-word;
        }
    }
</style>
