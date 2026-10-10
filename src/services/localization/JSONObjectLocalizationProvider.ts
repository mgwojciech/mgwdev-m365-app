import { type ILocalizationProvider } from "./ILocalizationProvider";

/**
 * Localization provider that uses JSON object as localization source.
 */
export class JSONObjectLocalizationProvider implements ILocalizationProvider {
    public localization: {
        [key: string]: string
    };
    /**
     * Initialized new instance of JSONObjectLocalizationProvider.
     * @param localization JSON object that contains localization strings.
     */
    constructor(localization: {
        [key: string]: string
    }) {
        this.localization = localization;
    }

    public getLocalization(localizationKey: string): string {
        return this.localization[localizationKey] || "";
    }

}