<?php
/**
 * This file contains the menu as it will be displayed on the https://workadventu.re website.
 */

return [
    'title' => 'Extended features',
    'url' => '/map-building-extra/about.md',
    'markdown' => 'scripting_api_extra_doc.about',
    'collapse' => true,
    'children' => [
        [
            'title' => 'Doors',
            'url' => '/map-building-extra/doors.md',
            'markdown' => 'scripting_api_extra_doc.doors'
        ],
        [
            'title' => 'Bells',
            'url' => '/map-building-extra/bells.md',
            'markdown' => 'scripting_api_extra_doc.bells'
        ],
        [
            'title' => 'Action zones',
            'url' => '/map-building-extra/generic-action-zones.md',
            'markdown' => 'scripting_api_extra_doc.generic-action-zones'
        ],
        [
            'title' => 'Binding variables to properties',
            'url' => '/map-building-extra/variable-to-property-binding.md',
            'markdown' => 'scripting_api_extra_doc.variable-to-property-binding'
        ],[
            'title' => 'Configuration screen',
            'url' => '/map-building-extra/automatic-configuration.md',
            'markdown' => 'scripting_api_extra_doc.automatic-configuration'
        ],
    ],
];
