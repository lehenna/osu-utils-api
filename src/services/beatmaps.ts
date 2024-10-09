import axios from "axios";
import { Performance, Beatmap as RosuBeatmap } from "rosu-pp-js";
import { APIError, APIErrorCode } from "../lib/api-error";
import { nodesu } from "../lib/nodesu";
import { Beatmap } from "../models/beatmap";
import { transformModsToString } from "../lib/mods";

export type DownloadHostName =
  | "osu"
  | "chimu"
  | "beatconnect"
  | "sayobot"
  | "nerinyan"
  | "mino";

export class BeatmapServices {
  static async getById(beatmapId: string | number): Promise<Beatmap> {
    try {
      const beatmaps = await nodesu.beatmaps.getByBeatmapId(beatmapId);
      if (beatmaps.length === 0) throw new Error("Not found.");
      return beatmaps[0] as Beatmap;
    } catch {
      throw new APIError({
        status: 404,
        code: APIErrorCode.NotFound,
        message: "Not found.",
      });
    }
  }

  static async getBySetId(setId: string | number): Promise<Beatmap[]> {
    try {
      const beatmaps = await nodesu.beatmaps.getBySetId(setId);
      return beatmaps as Beatmap[];
    } catch {
      throw new APIError({
        status: 404,
        code: APIErrorCode.NotFound,
        message: "Not found.",
      });
    }
  }

  static async download(
    setId: string | number,
    hostName: DownloadHostName,
    noVideo: boolean
  ): Promise<ArrayBuffer> {
    try {
      const url = this.getDownloadUrl(setId, hostName, noVideo);
      const res = await axios.get(url, {
        responseType: "arraybuffer",
      });
      return res.data as ArrayBuffer;
    } catch (error) {
      throw new APIError({
        status: 502,
        code: APIErrorCode.BadGateway,
        message: "Error downloading beatmaps.",
      });
    }
  }

  static getDownloadUrl(
    setId: string | number,
    hostName: DownloadHostName,
    noVideo: boolean
  ) {
    switch (hostName) {
      case "chimu":
        return `https://chimu.moe/v1/download/${setId}`;

      case "beatconnect":
        return `https://beatconnect.io/b/${setId}/`;

      case "sayobot":
        return `https://dl.sayobot.cn/beatmaps/download/${
          noVideo ? "novideo" : "full"
        }/${setId}`;

      case "nerinyan":
        return `https://api.nerinyan.moe/d/${setId}${noVideo ? "?nv=1" : ""}`;

      case "mino":
        return `https://catboy.best/d/${setId}${noVideo ? "n" : ""}`;

      default:
        return `https://osu.direct/api/d/${setId}?${
          noVideo ? "noVideo=1" : ""
        }`;
    }
  }

  static async calcPerformance(
    beatmapId: string | number,
    options: {
      mods?: string | number;
      combo: number;
      accuracy: number;
      misses: number;
    }
  ) {
    const beatmap = await this.getRosuBeatmapById(beatmapId);
    if (!beatmap)
      throw new APIError({
        status: 404,
        code: APIErrorCode.NotFound,
        message: "Beatmap not found.",
      });
    const mods = options.mods
      ? typeof options.mods === "number"
        ? transformModsToString(options.mods)
        : options.mods
      : "";
    const attrs = new Performance({
      accuracy: options.accuracy,
      combo: options.combo,
      mods,
      misses: options.misses,
    }).calculate(beatmap);
    return attrs;
  }

  static async getRosuBeatmapById(beatmapId: string | number) {
    const response = await axios.get(`https://osu.ppy.sh/osu/${beatmapId}`, {
      responseType: "arraybuffer",
    });
    const beatmapBuffer = response.data;
    if (!beatmapBuffer) return null;
    const beatmapArray = new Uint8Array(beatmapBuffer);
    const beatmap = new RosuBeatmap(beatmapArray);
    return beatmap;
  }
}
