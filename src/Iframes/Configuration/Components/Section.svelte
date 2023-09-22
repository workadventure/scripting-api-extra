<script lang="ts">
    import Field from "./Field.svelte";
    import {currentPage} from "../Stores/NavigationStore";
    import {variablesStore} from "../Stores/VariablesStore";
    import type {ITiledMapObjectLayer} from "@workadventure/tiled-map-type-guard/dist";
    import {Properties} from "../../../Properties";
    import {configurationLayerStore} from "../Stores/LayersStore";

    let layer = $configurationLayerStore as ITiledMapObjectLayer;

    const properties = new Properties(layer.properties);

    function closeCowebsite(){
        WA.nav.closeCoWebSite();
    }
</script>

{#if $currentPage !== 'configuration' }
    <div class="left mb-20">
        <button class="btn light tw-w-1/3 tw-justify-center tw-mx-6 tw-relative tw-cursor-pointer" on:click={() => { $currentPage = $currentPage.substring(0, $currentPage.indexOf('/')) }}>&lt; Back</button>
    </div>
{/if}

<div>
    {#if $variablesStore}
        <section class="tw-flex tw-flex-col tw-content-start tw-items-start tw-my-0 tw-py-0">
            {#if properties.get("name") }
                <p class="title">{ properties.get("name") }</p>
            {/if}
            {#each [...$variablesStore.values()] as variable }
                {#if variable.isReadable}
                    <Field variable={variable} />
                {/if}
            {/each}
        </section>
        <div class="left mb-20">
            <button class="btn light tw-w-1/3 tw-justify-center tw-mx-6 tw-relative tw-cursor-pointer" 
                on:click={() => closeCowebsite()}
            >
                Finish
            </button>
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
