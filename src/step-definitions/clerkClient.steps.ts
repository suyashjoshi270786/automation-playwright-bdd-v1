import { When, Then } from "@cucumber/cucumber";
import { expect, request } from '@playwright/test'
import { newApi } from "../utils/apiClient";

import { CustomWorld } from '../support/world';


//let response: any;
//jj

When("user fetch the clerk client configuration", async function (this: CustomWorld) {
  const api = await newApi();

//  const context = await request.newContext();
this.apiResponse = await api.get("/v1/client?clerk_api_version=2025-04-10&clerk_js_version=5");
 //this.response  = await context.get('https://clerk.reqres.in/v1/client?__clerk_api_version=2025-04-10&_clerk_js_version=5.77.0');

});

Then("user should receive a 200 status code", async function (this: CustomWorld) {
expect(this.apiResponse).toBeTruthy();
expect(this.apiResponse!.status()).toBe(200);
});

Then("the response should contain client info", async function (this: CustomWorld) {
  const body = await this.apiResponse?.json();
  expect(body).toHaveProperty('client');
  console.log("API Response:", body);
  console.log("API Testing Completed Successfully");
});
