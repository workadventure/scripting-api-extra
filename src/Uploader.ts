// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import { defaultApiUrl } from "./Features/default_api_url";
import { formStore } from "./Iframes/Configuration/Stores/form";
import type { VariableDescriptor } from "./VariablesExtra";

let formData: FormData;
const unsubscribe = formStore.subscribe((form) => {
    formData = form.formData;
});

/**
 * Builds the image preview and the form data
 */
export function prepareUpload(event: Event, variable: VariableDescriptor): void {
    const files = (event.target as HTMLInputElement).files;
    const file = files ? files[0] : null;
    formStore.clearError();

    if (file) {
        formStore.changeImageVisibility(true);
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                formStore.setFormDataFile(file);
                formStore.setFormDataProperty("identifier", variable.name);
                if (variable.properties.getString("imageWidth")) {
                    const width = variable.properties.mustGetString("imageWidth");
                    // Just for the rendering, doesn't resize the actual file
                    formStore.setImagePreviewMaxWidth(width);
                    // This will resize the file, on server side
                    formStore.setFormDataProperty("imageWidth", width);
                }
                if (variable.properties.getString("imageHeight")) {
                    const height = variable.properties.mustGetString("imageHeight");
                    // Just for the rendering, doesn't resize the actual file
                    formStore.setImagePreviewMaxHeight(height);
                    // This will resize the file, on server side
                    formStore.setFormDataProperty("imageHeight", height);
                }
                formStore.setImageSource(reader.result);
            }
        };
        reader.readAsDataURL(file);
        return;
    }
    formStore.changeImageVisibility(false);
}

/**
 * Performs the upload and update the url variable
 */
export async function uploadFile(): Promise<string> {
    const token = WA.player.userRoomToken;
    formStore.clearError();
    //!\ if you are self-hosting WA, this API must be added by your side
    const response = await fetch(defaultApiUrl + "/upload-file", {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).catch((e) => {
        formStore.setError("Upload error. Please contact the support.");
        throw e;
    });

    unsubscribe();
    const data = await response.json();
    return data.url;
}
