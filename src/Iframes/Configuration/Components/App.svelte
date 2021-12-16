<script lang="ts">
    import Section from "./Section.svelte";
    import Sections from "./Sections.svelte";
    import { configurationLayerStore } from "../Stores/LayersStore";

    let hasFilteredVariables = !!window.location.hash
</script>

<div class="main-app">
    <h1>Configure the room</h1>

    {#if $configurationLayerStore}
        {#if $configurationLayerStore.type === 'objectgroup' || hasFilteredVariables}
            <Section></Section>
        {:else if $configurationLayerStore.type === 'group'}
            <Sections></Sections>
        {:else}
            <div>Unsupported configuration layer type</div>
        {/if}
    {/if}
</div>


<style lang="scss">
  div.main-app {
      margin-left: 3%;
      margin-right: 3%;

    h1 {
      margin-top: 10px;
      margin-bottom: 40px;
      text-align: center;
    }
  }
</style>
