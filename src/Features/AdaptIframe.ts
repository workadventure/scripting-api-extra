/// <reference types="@workadventure/iframe-api-typings" />
import type { UIWebsite } from "@workadventure/iframe-api-typings";

export async function adaptIframe(id: string, width: string, height: string): Promise<UIWebsite> {
    return WA.onInit().then(async () => {
        const website: UIWebsite = WA.ui.website.getById(id);
        if (website) {
            website.size.width = width;
            website.size.height = height;
        }
        return website;
    });
}
