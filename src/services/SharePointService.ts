import type { SPSite } from "../model/SPSite";
import type { HttpClient } from "./HttpClient";

export class SharePointService {
    private readonly client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    async getSite(siteUrl: string): Promise<SPSite | null> {
        const response = await this.client.get(`${siteUrl}/_api/site?$select=Id,Url`, {
            headers: { accept: "application/json" }
        });

        if (!response.ok) {
            return null;
        }

        return await response.json() as SPSite;
    }
}