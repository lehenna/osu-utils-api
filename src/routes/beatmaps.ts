import { Hono } from "hono";
import { ScoreServices } from "../services/scores";
import { BeatmapServices } from "../services/beatmaps";
import { validateSchema } from "../lib/valibot";
import {
  array,
  maxValue,
  minValue,
  number,
  object,
  optional,
  pipe,
  string,
  union,
} from "valibot";
import { PerformanceAttributes } from "rosu-pp-js";

const routes = new Hono();

routes.get("/:beatmapId", async (c) => {
  const { beatmapId } = c.req.param();
  const beatmap = await BeatmapServices.getById(beatmapId);
  return c.json(beatmap);
});

routes.post("/:beatmapId/performance", async (c) => {
  const { beatmapId } = c.req.param();
  const jsonData = await c.req.json();
  const data = await validateSchema(
    array(
      object({
        accuracy: pipe(number(), minValue(0), maxValue(1)),
        combo: pipe(number(), minValue(0)),
        misses: optional(pipe(number(), minValue(0))),
        mods: optional(union([number(), string()])),
      })
    ),
    jsonData
  );
  const result: Record<string, PerformanceAttributes> = {};
  try {
    for (const n of data) {
      const performance = await BeatmapServices.calcPerformance(beatmapId, {
        accuracy: n.accuracy * 100,
        combo: n.combo,
        misses: n.misses ?? 0,
        mods: n.mods,
      });
      result[n.accuracy] = performance;
    }
  } catch (error) {
    console.info(error);
  }
  return c.json(result);
});

routes.get("/:beatmapId/scores", async (c) => {
  const { beatmapId } = c.req.param();
  const { limit, mods, userId } = c.req.query();
  const scores = await ScoreServices.findByBeatmapId(
    parseInt(beatmapId),
    mods ? parseInt(mods) : undefined,
    limit ? parseInt(limit) : undefined,
    userId ? parseInt(userId) : undefined
  );
  return c.json(scores);
});

export { routes as BeatmapsRoutes };
