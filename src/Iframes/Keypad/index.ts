import { getLayersMap } from "../../LayersFlattener";
import { Properties } from "../../Properties";

let code!: string;
let inputCode = "";
let doorVariable!: string;

WA.onInit().then(async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const layerName = urlSearchParams.get("layer");

    if (layerName === null) {
        throw new Error('Missing "layer" argument in search params');
    }

    const layers = await getLayersMap();
    const layer = layers.get(layerName);

    if (layer === undefined) {
        throw new Error('Cannot find layer whose name is "' + layerName + '".');
    }

    const properties = new Properties(layer.properties);
    code = properties.getOneString("code");

    if (code === undefined) {
        throw new Error('Missing "code" for layer "' + layerName + '".');
    }

    doorVariable = properties.getOneString("doorVariable");

    if (doorVariable === undefined) {
        throw new Error('Missing "doorVariable" for layer "' + layerName + '".');
    }

    initKeyBindings();
});

function initKeyBindings(): void {
    document.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
        button.addEventListener("click", function () {
            console.log(this.innerText);
            inputCode += this.innerText.trim();
            if (inputCode.length > code.length) {
                inputCode = inputCode.substr(inputCode.length - code.length, code.length);
            }
            if (inputCode === code) {
                WA.state[doorVariable] = true;
            }
        });
    });
}

export {};
