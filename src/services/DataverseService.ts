import type { DataverseUser } from "../model/DataverseUser";
import type { HttpClient } from "./HttpClient";

export class DataverseService {
    private readonly client: HttpClient;
    private readonly resource: string;

    constructor(client: HttpClient, resource: string) {
        this.client = client;
        this.resource = resource;
    }

    async getCurrentUser(): Promise<DataverseUser | null> {
        const response = await this.client.get(`${this.resource}/api/data/v9.2/WhoAmI`, {
            headers: { accept: "application/json" }
        });

        if (!response.ok) {
            return null;
        }

        return await response.json() as DataverseUser;
    }
}