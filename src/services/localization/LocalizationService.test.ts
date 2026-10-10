import { describe, expect, it, vi } from "vitest";
import { LocalizationService } from "./LocalizationService";
import type { ILocalizationProvider } from "./ILocalizationProvider";

describe("LocalizationService", () => {
    it("returns the localization key when no provider is registered", () => {
        const service = new LocalizationService();

        expect(service.getLocalization("common.settings")).toBe("common.settings");
    });

    it("returns the value from the first matching provider", () => {
        const provider: ILocalizationProvider = {
            getLocalization: vi.fn().mockReturnValue("Settings")
        };

        const service = new LocalizationService([provider]);

        expect(service.getLocalization("common.settings")).toBe("Settings");
        expect(provider.getLocalization).toHaveBeenCalledWith("common.settings");
    });

    it("prefers the latest provider value when multiple providers are registered", () => {
        const firstProvider: ILocalizationProvider = {
            getLocalization: vi.fn().mockReturnValue("Settings")
        };
        const secondProvider: ILocalizationProvider = {
            getLocalization: vi.fn().mockReturnValue("Ustawienia")
        };

        const service = new LocalizationService([firstProvider, secondProvider]);

        expect(service.getLocalization("common.settings")).toBe("Ustawienia");
    });

    it("replaces named placeholders in a localized string", () => {
        const provider: ILocalizationProvider = {
            getLocalization: vi.fn().mockReturnValue("Hello {firstName} {lastName}!")
        };

        const service = new LocalizationService([provider]);

        expect(service.getLocalization("greeting", { firstName: "John", lastName: "Doe" })).toBe("Hello John Doe!");
    });

    it("adds a provider to the service", () => {
        const provider: ILocalizationProvider = {
            getLocalization: vi.fn().mockReturnValue("German")
        };

        const service = new LocalizationService();
        service.addLocalizationProvider(provider);

        expect(service.getLocalization("common.language")).toBe("German");
    });
});
