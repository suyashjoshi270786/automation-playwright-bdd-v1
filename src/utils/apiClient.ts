// src/utils/apiClient.ts
import { request, APIRequestContext } from "@playwright/test";
import { Env } from "../config/env.config";

export async function newApi(): Promise<APIRequestContext> {
  return await request.newContext({ baseURL: Env.apiBaseUrl });
}
