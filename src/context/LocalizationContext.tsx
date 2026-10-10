import * as React from "react";
import { type ILocalizationProvider, JSONObjectLocalizationProvider, LocalizationService } from "../services/localization";


export const getLocalizationService = async (language: string) => {
    const localization = (await import(`../localization/${language}.json`)).default ?? (await import(`../localization/${language}.json`));
    let provider = new JSONObjectLocalizationProvider(localization);

    let localizationProviders: ILocalizationProvider[] = [provider];
    let localizationService = new LocalizationService(localizationProviders);
    return localizationService;
}
export const supportedLanguages = [
    { key: "en-us", text: "English", lcid: 1033 },
    { key: "de-de", text: "German", lcid: 1031 },
    { key: "fr-fr", text: "French", lcid: 1036 },
    { key: "pl-pl", text: "Polski", lcid: 1045 },
];

const normalizeLanguage = (value?: string | null) => {
    const normalized = value?.trim().toLowerCase();
    if (!normalized) {
        return undefined;
    }

    if (supportedLanguages.some((language) => language.key === normalized)) {
        return normalized;
    }

    const exactLocale = supportedLanguages.find((language) => language.key === normalized.split("-")[0]);
    if (exactLocale) {
        return exactLocale.key;
    }

    const browserMatch = supportedLanguages.find((language) => normalized.startsWith(language.key.split("-")[0]));
    return browserMatch?.key;
};

export const getPreferredLanguage = () => {
    const storedLanguage = localStorage.getItem("preferredLanguage");
    const fromStorage = normalizeLanguage(storedLanguage);
    if (fromStorage) {
        return fromStorage;
    }

    const browserLanguages = [navigator.language, ...(navigator.languages ?? [])];
    const browserLanguage = browserLanguages.map((language) => normalizeLanguage(language)).find(Boolean);
    return browserLanguage ?? "en-us";
};

export interface ILocalizationContextProps {
    getLocalization: (localizationKey: string, ...args: Record<string, string>[]) => string;
    language: string;
    setLanguage: (language: string) => void;
}

export const LocalizationContext = React.createContext<ILocalizationContextProps>({
    getLocalization: (localizationKey: string, ..._args: Record<string, string>[]) => localizationKey,
    language: "en-us",
    setLanguage: () => { }
});

export const useLocalization = () => React.useContext<ILocalizationContextProps>(LocalizationContext);

export interface ILocalizationProviderProps extends React.PropsWithChildren<{}> {
    language?: string;
}

export const LocalizationProvider: React.FunctionComponent<ILocalizationProviderProps> = (props) => {
    const [language, setLanguage] = React.useState<string>(() => {
        const preferredLanguage = props.language ?? getPreferredLanguage();
        return preferredLanguage;
    });
    const [localizationService, setLocalizationService] = React.useState<LocalizationService | undefined>(undefined);

    React.useEffect(() => {
        const currentLanguage = props.language ?? getPreferredLanguage();
        if (!props.language && currentLanguage !== language) {
            setLanguage(currentLanguage);
        }
    }, [language, props.language]);

    React.useEffect(() => {
        localStorage.setItem("preferredLanguage", language);
    }, [language]);

    React.useEffect(() => {
        getLocalizationService(language).then((service) => {
            setLocalizationService(service);
        });
    }, [language]);

    const getLocalization = (localizationKey: string, ...args: Record<string, string>[]) => {
        if (localizationService) {
            return localizationService.getLocalization(localizationKey, ...args);
        }
        return localizationKey;
    }

    return <LocalizationContext.Provider value={{ getLocalization, language, setLanguage: (nextLanguage: string) => {
        const normalizedLanguage = normalizeLanguage(nextLanguage) ?? "en-us";
        setLanguage(normalizedLanguage);
        localStorage.setItem("preferredLanguage", normalizedLanguage);
    } }}>
        {localizationService && props.children}
    </LocalizationContext.Provider>
}