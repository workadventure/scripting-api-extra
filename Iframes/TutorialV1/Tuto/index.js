import "./style/index.scss";
import App from "./Components/App.svelte";
import i18next from "i18next";
import * as en from "../../../translate/en-US/index";
import * as fr from "../../../translate/fr-FR/index";
import * as ar from "../../../translate/ar-SA/index";
import * as de from "../../../translate/de-DE/index";
import * as pt from "../../../translate/pt-Br/index";
i18next.init({
    debug: true,
    fallbackLng: "en",
    resources: {
        en: {
            translation: en,
        },
        fr: {
            translation: fr,
        },
        ar: {
            translation: ar,
        },
        de: {
            translation: de,
        },
        pt: { translation: pt },
    },
});
const startTuto = () => {
    new App({
        target: document.body,
    });
};
try {
    WA.onInit().then(() => {
        const lang = WA.player.language;
        i18next.changeLanguage(lang);
        startTuto();
    });
}
catch (e) {
    console.warn("error", e);
    startTuto();
}
//# sourceMappingURL=index.js.map