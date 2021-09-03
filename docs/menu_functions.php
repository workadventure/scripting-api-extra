<?php
/**
 * This file contains the menu as it will be displayed on the https://workadventu.re website.
 */

return [
    'title' => 'Utility functions',
    'url' => '/map-building-extra/utils.md',
    'markdown' => 'scripting_api_extra_doc.utils',
    'collapse' => true,
    'children' => [
        [
            'title' => 'Properties',
            'url' => '/map-building-extra/functions-properties.md',
            'markdown' => 'scripting_api_extra_doc.functions-properties'
        ],
        [
            'title' => 'Variables metadata',
            'url' => '/map-building-extra/functions-variables.md',
            'markdown' => 'scripting_api_extra_doc.functions-variables'
        ],
        [
            'title' => 'Layers',
            'url' => '/map-building-extra/functions-layers.md',
            'markdown' => 'scripting_api_extra_doc.functions-layers'
        ],
        [
            'title' => 'Svelte bindings',
            'url' => '/map-building-extra/functions-svelte.md',
            'markdown' => 'scripting_api_extra_doc.functions-svelte'
        ],
    ],
];
