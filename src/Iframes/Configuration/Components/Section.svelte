<script lang="ts">
    //import type {WorkAdventureApi} from "@workadventure/iframe-api-typings";
    import type {ITiledMapObjectLayer} from "@workadventure/tiled-map-type-guard/dist";
    import {Properties} from "../../../Properties";
    import {VariableDescriptor} from "../../../VariablesExtra";
    import Field from "./Field.svelte";

    //export let WA: WorkAdventureApi;
    export let layer: ITiledMapObjectLayer;

    const properties = new Properties(layer.properties);

    const variables = layer.objects.filter((object) => object.type === 'variable').map((variable) => new VariableDescriptor(variable));

</script>

<div>
        <div class="{ properties.get('name') ? 'nes-container with-title': '' }">
            {#if properties.get("name") }
                <p class="title">{ properties.get("name") }</p>
            {/if}

            {#each variables as variable }
                {#if variable.isReadable }
                    <Field variable={variable} />
                {/if}
            {/each}
        </div>
</div>


<style lang="scss">
</style>
