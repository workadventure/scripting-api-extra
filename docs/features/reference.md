---

sidebar_position: 1000

---

# Properties Reference

:::info
To use the properties in this document, you need to [import the "Scripting API Extra" script in your map](/developer/map-scripting/scripting-api-extra/#importing-the-extended-features)
:::

This document does not list the properties available out-of-the-box in WorkAdventure but **only the properties added
by the "Scripting API Extra" package**.

## Layer Properties

Those properties can be set on layers.

| Name                                                                      | Type    | Context        | Description                                                                                                                  |
|---------------------------------------------------------------------------|---------|----------------|------------------------------------------------------------------------------------------------------------------------------|
| [`bellVariable`](bells#the-bell-display-layer)                         | string  | Bell layer     | Points to the name of the variable containing the bell settings                                                              |
| [`bellPopup`](bells#adding-a-bell-button)                              | string  | Bell layer     | The name of a rectangle object on the object layer in the map that will display the "Ring" button to ring the bell.          |
| [`bellButtonText`](bells#adding-a-bell-button)                         | string  | Bell layer     | the text to display in the button to ring the bell. Defaults to "Ring"                                                       |
| [`autoOpen`](doors#automatically-vs-manually-opening-the-door)         | boolean | Doorstep layer | By setting `autoOpen` to true, the door will automatically open when someone walks in the door step layer.                   |
| [`autoClose`](doors#automatically-vs-manually-opening-the-door)        | boolean | Doorstep layer | By setting `autoClose` to true, the door will automatically close when someone walks out of the door step layer.             |
| [`openTriggerMessage`](doors#configuring-the-openclose-door-message)   | string  | Doorstep layer | The action message displayed to open the door                                                                                |
| [`closeTriggerMessage`](doors#configuring-the-openclose-door-message)  | string  | Doorstep layer | The action message displayed to close the door                                                                               |
| [`tag`](doors#limiting-who-can-openclose-the-door)                     | string  | Doorstep layer | Limits who can operate the door from this doorstep                                                                           |
| [`code`](doors#setting-a-digital-code-access-on-your-door)             | string  | Doorstep layer | A digital access code                                                                                                        |
| [`bindVariable`](generic-action-layers)                                | string  | Action layer   | The name of the variable that will be altered when one enters/leaves the layer                                               |
| [`enterValue`](generic-action-layers)                                  | string  | Action layer   | (optional) The value the variable will be set to when entering the layer                                                     |
| [`leaveValue`](generic-action-layers)                                  | string  | Action layer   | (optional) The value the variable will be set to when leaving the layer                                                      |
| [`visible`](variable-to-property-binding#the-special-visible-property) | string  | *Any layer*    | This property can control the visibility of a layer. Any "truthy" value will display the layer. An empty value will hide it. |
| [`tutorial`](tutorial)                                                 | boolean | Map            | This property indicates whether the tutorial will be displayed on this map or not.                                           |

## Variables properties

Those properties can be set on variables.

Name                    |  Type              | Description
------------------------|--------------------|-----------------------
[`bell`](bells#the-bell-variable)               | boolean (`true`)   | Adding this property marks the variable as representing a bell
[`bellSound`](bells#the-bell-variable)          | string             | URL of the sound of the bell ringing
[`soundRadius`](bells#the-bell-variable)        | number             | The radius (in pixels) of the sound of the bell or door opening/closing
[`door`](doors#the-door-variable)               | boolean (`true`)   | Adding this property marks the variable as representing a door
[`openLayer`](doors#the-door-variable)          | string             | On a "door" variable, this MUST contain the name of the opened door layer (or several layers on multiple lines)
[`clodeLayer`](doors#the-door-variable)         | string             | On a "door" variable, this MUST contain the name of the closed door layer (or several layers on multiple lines)
[`openSound`](doors#opening--closing-sound)     | string             | URL of the sound of a door opening
[`closeSound`](doors#opening--closing-sound)    | string             | URL of the sound of a door closing
