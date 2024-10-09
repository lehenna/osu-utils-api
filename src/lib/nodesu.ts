import { Client } from "nodesu";

export const nodesu = new Client(process.env.OSU_APIKEY ?? "");
