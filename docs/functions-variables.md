{.section-title.accent.text-primary}
# Variables utility functions

{.alert.alert-info}
**Important!** To use these functions, you need to [import the "Scripting API Extra"](utils.md#importing-the-utility-functions) library.

## Return a list of all variables defined in the map

```
// returns a list of all the variables defined in the map.
getAllVariables(): Promise<Map<string, VariableDescriptor>>
```

Variables are returned as a Map. The key is the name of the variable, the value is an object representing the variable.
You can fetch individual properties defined in Tiled for this variable using this object's `properties` attribute.

For instance:

```typescript
import { getAllVariables, VariableDescriptor } from '@workadventure/scripting-api-extra';

const variables = await getAllVariables();
console.log(variables['my_variable'].properties.getOne('persist'));
```

Note: the `VariableDescriptor` class returned does not contain the value of the variable itself. It represents the 
variable object as defined in the Tiled map. This can be useful to access additional metadata that can be stored
in special properties of the variable, or to access the variable "position" in the map (since a variable is represented
by a "Point" object in a map).

```typescript
class VariableDescriptor {
    // the name of the variable
    name: string
    // an object representing the properties of the variable
    properties: Properties
    // The position of the variable
    x: number
    y: number
    // True if the variable can be read by the current player
    isReadable: boolean
    // True if the variable can be written by the current player
    isWritable: boolean
}
```

{.section-title.accent.text-primary}
## Configuration panel

### Opening the local configuration panel

```
// Signature of the function
function openConfig(variables?: string[]): void
```

You can open the local configuration panel inside an iFrame just like you do via the Tiled `openConfig` property.
This property let you filter which variables you want to display in the configuration page.

Well, you can do exactly that thanks to the `openConfig()` function. Here's how it works:

```typescript
import {openConfig} from '@workadventure/scripting-api-extra';

// This will open the local configuration panel with all the variables in the Tiled 'configuration' layer.
openConfig();
```

### Filtering the local configuration panel

You can filter which variables to display by passing an array of variable names to the function.

```typescript
import {openConfig} from '@workadventure/scripting-api-extra';

// This will open the local configuration panel with the specified variables in the Tiled 'configuration' layer.
openConfig(['leftDoorExit']);
```

Here is a quick example of how you can edit a variable by walking near the object that represents it in your map:

```typescript
import { openConfig } from '@workadventure/scripting-api-extra';

WA.room.onEnterLayer('leftDoorStep').subscribe(() => {
    openConfig(['leftDoorExit']);
});
```
