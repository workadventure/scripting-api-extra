import { getLayersMap } from "../../LayersFlattener";
import { Properties } from "../../Properties";
import { PhoneTonePlayer, type Dtmf, Tone } from "play-dtmf";

let code!: string;
let inputCode = "";
let doorVariable!: string;
const audioContext = new AudioContext();
const dtmfPlayer = new PhoneTonePlayer(audioContext);

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
        let tonePlaying: Tone | undefined;

        button.addEventListener("mousedown", function () {
            if (isDtmf(this.innerText)) {
                tonePlaying?.stop();
                tonePlaying = dtmfPlayer.playDtmf(this.innerText);
            } else {
                console.error("Invalid DTMF key: " + this.innerText);
            }
        });

        button.addEventListener("mouseup", function () {
            tonePlaying?.stop();
        });

        button.addEventListener("mouseout", function () {
            tonePlaying?.stop();
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

function isDtmf(key: string): key is Dtmf {
    return [
        "*",
        "#",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
    ].includes(key);
}

export {};
