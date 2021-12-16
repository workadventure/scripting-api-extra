import { getLayersMap } from "../../LayersFlattener";
import { Properties } from "../../Properties";
import { DtmfPlayer } from "play-dtmf";

let code!: string;
let inputCode = "";
let doorVariable!: string;
const dtmfPlayer = new DtmfPlayer();

WA.onInit()
    .then(async () => {
        const layerName = window.location.hash.substr(1);

        if (!layerName) {
            throw new Error('Missing "layer" in hash');
        }

        const layers = await getLayersMap();
        const layer = layers.get(layerName);

        if (layer === undefined) {
            throw new Error('Cannot find layer whose name is "' + layerName + '".');
        }

        const properties = new Properties(layer.properties);
        const tmpCode = properties.getString("code");
        const codeVariable = properties.getString("codeVariable");

        if (tmpCode === undefined && codeVariable === undefined) {
            throw new Error('Missing "code" or "codeVariable" for layer "' + layerName + '".');
        }

        if (codeVariable) {
            const value = WA.state[codeVariable];
            if (value && (typeof value === "string" || typeof value === "number")) {
                code = value.toString();
            }
        } else {
            code = tmpCode as string;
        }

        const doorVariableVal = properties.getString("doorVariable");

        if (doorVariableVal === undefined) {
            throw new Error('Missing "doorVariable" for layer "' + layerName + '".');
        }

        doorVariable = doorVariableVal;

        initKeyBindings();
    })
    .catch((e) => console.error(e));

function initKeyBindings(): void {
    document.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
        button.addEventListener("mousedown", function () {
            dtmfPlayer.play(this.innerText);
        });

        button.addEventListener("mouseup", function () {
            dtmfPlayer.stop();
        });

        button.addEventListener("click", function () {
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
