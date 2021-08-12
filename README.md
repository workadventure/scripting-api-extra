# WorkAdventure Scripting API Extra features

![Github Actions](https://github.com/workadventure/scripting-api-extra/workflows/Release/badge.svg) [![codecov](https://codecov.io/gh/workadventure/scripting-api-extra/branch/main/graph/badge.svg?token=UCCA6D6JCB)](https://codecov.io/gh/workadventure/scripting-api-extra)

This NPM package contains a set of reusable utility functions and features that can be used to enhance WorkAdventure maps.

## Usage

There are many ways to import the `@workadventure/scripting-api-extra` package.

### Importing directly in a map

If you only want to use the extra "features", you can directly import the package in your map,
by adding a "script" property at the map level, pointing to the "bundled" package:

`script: https://unpkg.com/@workadventure/scripting-api-extra@1.0.0-alpha.2/dist/bundle.js`

Please note that you can change the version number of the package in the URL.

### Importing in your application / own scripts

If you are developing your own scripts, you can import the library using NPM.

```
npm install --save @workadventure/scripting-api-extra@
```

## Functions

### Utility class to analyze properties

The JSON map can already be fetched using `WA.room.getTiledMap`. But when it comes to analyzing the JSON map, you are on your own.

This library comes with helpers to help you read the map.

The `Properties` class can be used to analyze properties (that can be put on a variety of objects in Tiled).

Usage:

```typescript
const map = await WA.room.getTiledMap();

const mapProperties = new Properties(map.properties);

// getOne fetches the value of the property passed in parameter.
// Note that it will throw an exception if many properties have the same name.
const name = mapProperties.getOne('name') as string;

// getMany returns an array of values for all properties whose name is passed in parameter.
const scripts = mapProperties.getMany('scripts');

// getOneString is the same as getOne except it ensures the value is a string (and throws an exception if it is not)
const name = mapProperties.getOneString('name');
```

### Return a list of all variables defined in the map

`getAllVariables(): Promise<Map<string, VariableDescriptor>>`: returns a list of all the variables defined in the map.

Variables are returned as a Map. The key is the name of the variable, the value if an object representing the variable.
You can fetch individual properties defined in Tiled for this variable using this object's `properties` attribute.

For instance:

```typescript
import { getAllVariables, VariableDescriptor } from '../VariablesExtra';

const variables = await getAllVariables();
console.log(variables['my_variable'].properties.getOne('persist'));
```

```typescript
class VariableDescriptor {
    name: string // the name of the variable
    properties: Properties // an object representing the properties of the variable
}
```

### Return a Map of all layers

Layers can be nested in group layers.

The `getLayersMap()` function returns a map of all layers in a uni-dimensional map.
Layers are renamed: if they are in a group layer, the name of the group layer is prepended with a "/" as a separator.
Layers are indexed by name.

```typescript
const layers = await getLayersMap();
const mylayer = layers.get('my_layer');
for (const layer of layers.values()) {
    // Iterate over all layers
}
```

### Get boundaries of a layer

`findLayerBoundaries()` can be used to find the boundaries of a given layer.



## Features

### Changing the value of a variable using an action message in a zone

`bindVariable`: The name of a variable that will be altered when one enters/leaves the zone
`zone`: You need to define a zone property for the layer that contains `bindVariable`.
`enterValue`: The value the variable will be set to when entering the zone
`leaveValue`: The value the variable will be set to when leaving the zone
`triggerMessage` (optional): You can optionally add a "trigger message". In this case, the message will be displayed when entering the zone and the variable will only change value when the trigger message is activated by pressing the space bar.
`tag` (optional): Only users with the "tag" passed in parameter will be allowed to set the value. (Note: this is only enforced client side and could be circumvented)

### Doors

In order to create a door, you need to create a "variable" that will contain the state of the door (so "opened" or "closed").

Set the "default" property to "true" (opened by default) or "false" (closed by default).

Then, add a new "door" boolean property and set it to true.

Add 2 layers in your map. One will contain the open door, and the other one the closed door.

Now, add 2 properties to the variable:

- `openLayer`: this will contain the name of the layer that has the opened door
- `closeLayer`: this will contain the name of the layer that has the closed door

Whenever the value of the variable switches from true to false (or the opposite), the door will open or close.

### Door step

To open or close a door

```
zone: string // Compulsory: the name of a zone
doorVariable: string // The name of the variable holding the state of the door 
autoOpen: boolean // True to open automatically. False to force an interaction
autoClose: boolean // True to close automatically when zone is left. False to force an interaction
openTriggerMessage: string // Message to be displayed to open the door
closeTriggerMessage: string // Message to be displayed to close the door
code: string // The code to open the door (clear text, so not very secure)
codeVariable: string // The name of the variable containing the secret code
```

