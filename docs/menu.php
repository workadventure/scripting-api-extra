<?php
/**
 * This file contains the menu as it will be displayed on the https://workadventu.re website.
 */

return [
    'title' => 'Extended features',
    'url' => '/map-building-extra/about.md',
    'markdown' => 'scripting_api_extra_doc.about',
    'editUrl' => 'https://github.com/workadventure/scripting-api-extra/edit/main/docs/about.md',
    'collapse' => true,
    'children' => [
        [
            'title' => 'Doors',
            'url' => '/map-building-extra/doors.md',
            'markdown' => 'scripting_api_extra_doc.doors',
            'editUrl' => 'https://github.com/workadventure/scripting-api-extra/edit/main/docs/doors.md',
        ],
        [
            'title' => 'Bells',
            'url' => '/map-building-extra/bells.md',
            'markdown' => 'scripting_api_extra_doc.bells',
            'editUrl' => 'https://github.com/workadventure/scripting-api-extra/edit/main/docs/bells.md',
        ],
        [
            'title' => 'Action layers',
            'url' => '/map-building-extra/generic-action-layers.md',
            'markdown' => 'scripting_api_extra_doc.generic-action-layers',
            'editUrl' => 'https://github.com/workadventure/scripting-api-extra/edit/main/docs/generic-action-layers.md',
        ],
        [
            'title' => 'Binding variables to properties',
            'url' => '/map-building-extra/variable-to-property-binding.md',
            'markdown' => 'scripting_api_extra_doc.variable-to-property-binding',
            'editUrl' => 'https://github.com/workadventure/scripting-api-extra/edit/main/docs/variable-to-property-binding.md',
        ],[
            'title' => 'Configuration screen',
            'url' => '/map-building-extra/automatic-configuration.md',
            'markdown' => 'scripting_api_extra_doc.automatic-configuration',
            'editUrl' => 'https://github.com/workadventure/scripting-api-extra/edit/main/docs/automatic-configuration.md',
        ],[
            'title' => 'Properties reference',
            'url' => '/map-building-extra/reference.md',
            'markdown' => 'scripting_api_extra_doc.reference',
            'editUrl' => 'https://github.com/workadventure/scripting-api-extra/edit/main/docs/reference.md',
        ],
    ],
];
