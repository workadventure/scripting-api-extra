<script lang="ts">
    import type {WorkAdventureApi} from "@workadventure/iframe-api-typings";
    import type {ITiledMapLayer} from "@workadventure/tiled-map-type-guard/dist";
    import Section from "./Section.svelte";

    export let WA: WorkAdventureApi;
    export let configurationLayer: ITiledMapLayer;
</script>

<div class="main-app">
    <h1>Configure the room</h1>

    {#if configurationLayer.type === 'objectgroup' }
        <Section layer={configurationLayer}></Section>
    {:else}
        Unsupported configuration layer type
    {/if}
</div>


<style lang="scss">
  div.main-app {
    h1 {
      margin-top: 10px;
      margin-bottom: 25px;
      text-align: center;
    }
  }

  div.main-app-btn {
    margin-top: 10px;
    text-align: right;
    font-size: 25px;
  }
</style>
