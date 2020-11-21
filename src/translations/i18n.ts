import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import profile_en from "./en/profile.json";
import profile_fr from "./fr/profile.json";
i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                profile: profile_en,
            },
            fr: {
                profile: profile_fr,
            },
        },
        fallbackLng: 'fr',
        debug: true,
    });


export default i18n;