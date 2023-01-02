/// <reference types="@workadventure/iframe-api-typings" />

import type { UIWebsite } from "@workadventure/iframe-api-typings";

export async function getIdByUrl(url: string) {
    WA.onInit().then(async () => {
        const website: UIWebsite = (await WA.ui.website.getAll()).find((obj) => obj.url.includes(url))!;

        return website.id;
    });
}

export async function adaptIframe(url: string, width: string, height: string): Promise<UIWebsite> {
    return WA.onInit().then(async () => {
        const website: UIWebsite = (await WA.ui.website.getAll()).find((obj) =>
            obj.url.includes(url),
        )!;
        console.log({ website });
        if (website) {
            website.size.width = width;
            website.size.height = height;
        }
        return website;
    });
}
