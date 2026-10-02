export type HttpClientResponse = {
    ok: boolean;
    json(): Promise<unknown>;
};

export type HttpClient = {
    get(url: string, init?: RequestInit): Promise<HttpClientResponse>;
};