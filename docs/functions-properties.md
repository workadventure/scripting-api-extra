{.section-title.accent.text-primary}
# Tiled properties

{.alert.alert-info}
**Important!** To use these functions, you need to [import the "Scripting API Extra"](utils.md#importing-the-utility-functions) library.

In your Tiled map, a number of items can have "properties" (the map itself, layers, tiles, tilesets, objects...).

The JSON map can be fetched using `WA.room.getTiledMap`. But when it comes to analyzing the JSON map, you are on your own.

The Scripting API Extra package comes with a useful `Properties` class to analyze these properties.

Usage:

```typescript
const map = await WA.room.getTiledMap();

const mapProperties = new Properties(map.properties);

// getOne fetches the value of the property passed in parameter.
const name = mapProperties.get('name') as string;

// getString is the same as get except it ensures the value is a string (and throws an exception if it is not)
const name = mapProperties.getString('name');
```

Methods available:

```typescript
class Properties {
    get(name: string): string | boolean | number | undefined; // returns the property
    getString(name: string): string | undefined; // returns the property (and checks it is a string)
    getNumber(name: string): number | undefined; // returns the property (and checks it is a number)
    getBoolean(name: string): boolean | undefined; // returns the property (and checks it is a boolean)
    mustGetString(name: string): string; // returns the property as a string (throws an Error if not found)
    mustGetNumber(name: string): string; // returns the property as a number (throws an Error if not found)
    mustGetBoolean(name: string): string; // returns the property as a boolean (throws an Error if not found)
    getType(name: string): string | undefined; // returns the type of property (as defined in the map)
}
```
