{.section-title.accent.text-primary}
# Binding variables to properties

{.alert.alert-info}
**Important!** To use variables to properties binding, you need to [import the "Scripting API Extra" script in your map](about.md#importing-the-extended-features)

In WorkAdventure maps, ["variables"](https://workadventu.re/map-building/api-state.md) are used to share a state between 
players.

Using the Scripting API Extra library, you can bind your variables values directly into properties on your map.

In a property of your map, use the `{{{ variableName }}}` to refer to the name of a property.

**Sample**

Let's imagine you want to dynamically change the URL of a co-website based on a variable value.
You can create a new variable named "myWebsiteUrl" and bind it to the `openWebsite` property of your co-website layer.

<figure class="figure">
    <img class="figure-img img-fluid rounded" src="images/variable.png" alt="" />
    <figcaption class="figure-caption">The variable</figcaption>
</figure>

<figure class="figure">
    <img class="figure-img img-fluid rounded" src="images/variable.png" alt="" />
    <figcaption class="figure-caption">The property referring to the variable</figcaption>
</figure>

### Configuration

Binding variables to properties can make your map reactive to variable changes, but you still need to find a way
to modify the values of variables. There are plenty of ways to do this, including:

- [Using the scripting API](https://workadventu.re/map-building/api-state.md)
- [Using auto-generated configuration screen]() // TODO
- [Using generic action zones](generic-action-zones.md)

### About bindings

Use `{{{ variableName }}}` to refer to a variable name.

Behind the scene the [Mustache templating engine](https://en.wikipedia.org/wiki/Mustache_(template_system)) is used.
This means you can use all the features of Mustache like conditional:

`openWebsite: {{#enableWebsite}}https://example.com{{/enableWebsite}}`

The website above will be displayed only if the `enableWebsite` variable is set to `true`.

{.alert.alert-warning}
Be sure to use `{{{ variableName }}}` for binding variable and NOT `{{ variableName }}`. The version with a double 
curly-braces will work most of the time, but it escapes HTML characters (which is not needed in properties of a map)
and this might cause weird behaviours (like breaking URLs)
