<script lang="ts">
    import type {ITiledMapLayer} from "@workadventure/tiled-map-type-guard/dist";
    import LayerPage from "./LayerPage.svelte";
    import {currentPage} from "../Stores/currentPage";

    export let configurationLayer: ITiledMapLayer;

    function findLayer(name: string): ITiledMapLayer {
        const layer = recursiveFindLayer(name, configurationLayer);
        if (layer === undefined) {
            throw new Error("Cannot find layer with name "+name);
        }
        return layer;
    }

    function recursiveFindLayer(name: string, layer: ITiledMapLayer): ITiledMapLayer|undefined {
        if (name === layer.name) {
            return layer;
        }

        if (layer.type === 'group') {
            for (const innerLayer of layer.layers) {
                const result = recursiveFindLayer(name, innerLayer);
                if (result) {
                    return result;
                }
            }
        }

        return undefined;
    }

</script>

<div class="main-app">
    <h1>Configure the room</h1>

    <LayerPage layer={findLayer($currentPage)} />
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
