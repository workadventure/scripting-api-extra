{.section-title.accent.text-primary}
# Action zones

{.alert.alert-info}
**Important!** To use these action zones, you need to [import the "Scripting API Extra" script in your map](about.md#importing-the-extended-features)

You can define special zones that will **alter the value of a ["variable"](https://workadventu.re/map-building/api-state.md)**
when walked upon.

To define such a zone, create a new "tile layer" in Tiled.

In this layer, add these properties:

- `zone`: A unique name for this zone
- `bindVariable`: The name of the variable that will be altered when one enters/leaves the zone
- `enterValue`: (optional) The value the variable will be set to when entering the zone
- `leaveValue`: (optional) The value the variable will be set to when leaving the zone

## User interaction

By default, as soon as anyone enters or leaves the zone, the value of the variable will be changed.

Optionally, you can request a user interaction to trigger the change of the value. Use the `triggerMessage` property
to display a message to the player. When the player presses "SPACE", the value of the variable will be changed to `enterValue`.

## Managing rights

You can restrict who will trigger an action zone using user **tags**.

{.alert.alert-info}
User tags is a feature of the "pro" accounts.

Add a `tag` property on the layer. The variable will only change value if the player walking on the layer has the specified tag.