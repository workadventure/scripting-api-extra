<script lang="ts">
    import type {ITiledMapLayer} from "@workadventure/tiled-map-type-guard/dist";
    import Section from "./Section.svelte";
    import Sections from "./Sections.svelte";

    export let layer: ITiledMapLayer;
</script>

{#if layer.type === 'objectgroup' }
    <Section layer={layer}></Section>
{:else if layer.type === 'group' }
    <Sections groupLayer={layer}></Sections>
{:else}
    <div>Unsupported configuration layer type</div>
{/if}
