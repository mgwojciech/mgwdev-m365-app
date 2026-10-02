import { describe, expect, it, vi } from "vitest";
import type { DataverseUser } from "../model/DataverseUser";
import type { HttpClient } from "./HttpClient";
import { DataverseService } from "./DataverseService";

describe("DataverseService", () => {
    it("requests and returns the current Dataverse user", async () => {
        const user: DataverseUser = {
            BusinessUnitId: "business-unit-id",
            OrganizationId: "organization-id",
            UserId: "user-id"
        };
        const get = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue(user) });
        const service = new DataverseService({ get } as HttpClient, "https://example.crm.dynamics.com");

        await expect(service.getCurrentUser()).resolves.toEqual(user);
        expect(get).toHaveBeenCalledWith(
            "https://example.crm.dynamics.com/api/data/v9.2/WhoAmI",
            { headers: { accept: "application/json" } }
        );
    });

    it("returns null when the request is not successful", async () => {
        const get = vi.fn().mockResolvedValue({ ok: false, json: vi.fn() });
        const service = new DataverseService({ get } as HttpClient, "https://example.crm.dynamics.com");

        await expect(service.getCurrentUser()).resolves.toBeNull();
    });
});