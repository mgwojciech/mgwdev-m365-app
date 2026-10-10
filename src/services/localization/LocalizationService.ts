import { type ILocalizationProvider } from "./ILocalizationProvider";

export class LocalizationService implements ILocalizationProvider {
    protected localizationProviders: ILocalizationProvider[];
    constructor(localizationProvider: ILocalizationProvider[] = []) {
        this.localizationProviders = localizationProvider;
    }

    public getLocalization(localizationKey: string, ...args: Record<string, string>[]): string {
        let localizedString = localizationKey;
        this.localizationProviders.forEach((provider: ILocalizationProvider) => {
            localizedString = provider.getLocalization(localizationKey) || localizedString;
        });
        if (args && args.length > 0) {
            args.forEach((arg) => {
                Object.keys(arg).forEach((key) => {
                    const value = arg[key];
                    localizedString = localizedString.replace(`{${key}}`, value);
                });
            });
        }
        return localizedString;
    }

    public addLocalizationProvider(localizationProvider: ILocalizationProvider): void {
        this.localizationProviders.push(localizationProvider);
    }
}