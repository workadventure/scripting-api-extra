{.section-title.accent.text-primary}
# Layers utility functions

{.alert.alert-info}
**Important!** To use these functions, you need to [import the "Scripting API Extra"](utils.md#importing-the-utility-functions) library.

### Return a Map of all layers

Layers can be nested in group layers.

The `getLayersMap()` function returns a map of all layers in a uni-dimensional map.

Layers are **renamed**: if they are in a group layer, the name of the group layer is prepended with a "/" as a separator.

Layers are indexed by name.

```typescript
import {getLayersMap} from '@workadventure/scripting-api-extra';

const layers = await getLayersMap();

// Access a layer directly by name
const mylayer = layers.get('my_layer');

// Iterate over all layers
for (const layer of layers.values()) {
    // ...
}
```

### Get boundaries of a layer

`findLayerBoundaries` returns the boundaries of a given layer as an object with properties: { top: number, left: number, right: number, bottom: number }

Numbers are expressed in "tiles", not pixels.

```
findLayerBoundaries(layer: ITiledMapTileLayer): {
    top: number;
    left: number;
    right: number;
    bottom: number;
}
```

Example:

```typescript
import {getLayersMap, findLayerBoundaries} from '@workadventure/scripting-api-extra';
import {ITiledMapTileLayer} from "@workadventure/tiled-map-type-guard/dist/ITiledMapTileLayer";

const layers = await getLayersMap();

const layer = layers.get("my_layer") as ITiledMapTileLayer;

const boundaries = findLayerBoundaries(layer);
console.log('Top:' , boundaries.top);
console.log('Left:' , boundaries.left);
console.log('Bottom:' , boundaries.bottom);
console.log('Right:' , boundaries.right);
```

### Get boundaries of several layers

If you are looking for the boundaries of several layers at once, you can use the `findLayersBoundaries` variant.

```
findLayersBoundaries(layers: ITiledMapTileLayer[]): {
    top: number;
    left: number;
    right: number;
    bottom: number;
}
```

It will return a square containing all the tiles of all the layers passed in parameters.

