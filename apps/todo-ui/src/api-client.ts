import { initQueryClient } from "@ts-rest/vue-query";
import { contract } from "shared-api";

export const client = initQueryClient(contract, {
  baseUrl: "http://localhost:3000",
  baseHeaders: {},
});

export default client;
