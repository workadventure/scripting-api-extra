{.section-title.accent.text-primary}
# About the extended features

WorkAdventure features can be extended through the use of the [scripting API](https://workadventu.re/map-building/scripting).

This means anyone can write "scripts" that can be imported in any map and that add new properties to WorkAdventure.
If you are a developer, do not hesitate to have a look at the [scripting API](https://workadventu.re/map-building/scripting)
and to create your own custom properties / features.

The WorkAdventure team also provides its own scripts that add various features. We put those features
in a common package we call [Scripting API Extra](https://github.com/workadventure/scripting-api-extra).

In this section, you will find a list of these extended features.

## Importing the "extended features"

Because a script is hosting the extended features, you need to import that script explicitly into your map.

You can do so by adding a "script" property at the top level of your map, pointing to the URL:
`https://unpkg.com/@workadventure/scripting-api-extra@^1/dist/bundle.js`

