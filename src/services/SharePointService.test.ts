import { describe, expect, it, vi } from "vitest";
import type { SPSite } from "../model/SPSite";
import type { HttpClient } from "./HttpClient";
import { SharePointService } from "./SharePointService";

describe("SharePointService", () => {
    it("requests and returns the current site", async () => {
        const site: SPSite = { Id: "site-id", Url: "https://example.sharepoint.com" };
        const get = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue(site) });
        const service = new SharePointService({ get } as HttpClient);

        await expect(service.getSite("https://example.sharepoint.com")).resolves.toEqual(site);
        expect(get).toHaveBeenCalledWith(
            "https://example.sharepoint.com/_api/site?$select=Id,Url",
            { headers: { accept: "application/json" } }
        );
    });

    it("returns null when the request is not successful", async () => {
        const get = vi.fn().mockResolvedValue({ ok: false, json: vi.fn() });
        const service = new SharePointService({ get } as HttpClient);

        await expect(service.getSite("https://example.sharepoint.com")).resolves.toBeNull();
    });
});