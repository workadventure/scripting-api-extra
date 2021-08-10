# WorkAdventure Scripting API Extra features

![Github Actions](https://github.com/workadventure/scripting-api-extra/workflows/Release/badge.svg) [![codecov](https://codecov.io/gh/workadventure/scripting-api-extra/branch/main/graph/badge.svg?token=UCCA6D6JCB)](https://codecov.io/gh/workadventure/scripting-api-extra)

This NPM package contains a set of reusable utility functions and features that can be used to enhance WorkAdventure maps.

## Usage

TODO

## Functions

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

### Return a flattened list of layers

Layers can be nested in group layers.

The `getFlattenedLayers()` function returns the list of layers in a uni-dimensional array.
Layers are renamed: if they are in a group layer, the name of the group layer is prepended with a "/" as a separator.


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

