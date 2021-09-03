{.section-title.accent.text-primary}
# Variables metadata

{.alert.alert-info}
**Important!** To use these functions, you need to [import the "Scripting API Extra"](utils.md#importing-the-utility-functions) library.

## Return a list of all variables defined in the map

```
// returns a list of all the variables defined in the map.
getAllVariables(): Promise<Map<string, VariableDescriptor>>
```

Variables are returned as a Map. The key is the name of the variable, the value if an object representing the variable.
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
