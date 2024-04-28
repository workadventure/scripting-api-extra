import "./style/index.scss";
import App from "./Components/App.svelte";
import i18next from "i18next";
import * as en from "../../../translate/en-US/index";
import * as fr from "../../../translate/fr-FR/index";
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