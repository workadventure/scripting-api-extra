{.section-title.accent.text-primary}
# Svelte utility functions

{.alert.alert-info}
**Important!** To use these functions, you need to [import the "Scripting API Extra"](utils.md#importing-the-utility-functions) library.

If you happen to use the [Svelte framework](https://svelte.dev/), the Scripting API Extra package provide some
utility functions to easily bind your Svelte components to your WorkAdventure map.

## Mapping a WorkAdventure variable to a Svelte store

Use `createStoreFromVariable` to create a Svelte store thas is bound to a WorkAdventure variable.

```typescript
const myVariableStore = createStoreFromVariable('my_variable');
```

`createStoreFromVariable` returns a `writable` store.

If you already have a Svelte store and you want to bind it to a WorkAdventure variable, use `mapVariableToStore`.

```typescript
// Maps a WorkAdventure variable to an existing store.
// The "myVariableStore" must be a Svelte store with a "set" function.
mapVariableToStore('my_variable', myVariableStore);
```
