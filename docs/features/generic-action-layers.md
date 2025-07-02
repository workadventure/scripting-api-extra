---
sidebar_position: 60
---

# Action Layers

:::info Important
To use these action layers, you need to [import the "Scripting API Extra" script in your map](/developer/map-scripting/scripting-api-extra/#importing-the-extended-features)
:::

You can define special layers that will **alter the value of a ["variable"](/developer/map-scripting/references/api-state)**
when walked upon.

To define such a layer, create a new "tile layer" in Tiled.

In this layer, add these properties:

-   `bindVariable`: The name of the variable that will be altered when one enters/leaves the layer
-   `enterValue`: (optional) The value the variable will be set to when entering the layer
-   `leaveValue`: (optional) The value the variable will be set to when leaving the layer

## User interaction

By default, as soon as anyone enters or leaves the layer, the value of the variable will be changed.

Optionally, you can request a user interaction to trigger the change of the value. Use the `triggerMessage` property
to display a message to the player. When the player presses "SPACE", the value of the variable will be changed to `enterValue`.

## Managing rights

You can restrict who will trigger an action layer using user **tags**.

:::info
User tags is a feature of the "pro" accounts.
:::

Add a `tag` property on the layer. The variable will only change value if the player walking on the layer has the specified tag.
