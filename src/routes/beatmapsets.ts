import { Hono } from "hono";
import { BeatmapServices, DownloadHostName } from "../services/beatmaps";

const routes = new Hono();

routes.get("/:setId", async (c) => {
  const { setId } = c.req.param();
  const beatmaps = await BeatmapServices.getBySetId(setId);
  return c.json(beatmaps);
});

routes.get("/:setId/download", async (c) => {
  const { setId } = c.req.param();
  const { noVideo = "0", hostName } = c.req.query();
  const noVideoInt = parseInt(noVideo) === 1 ? true : false;
  const beatmaps = await BeatmapServices.download(
    setId,
    hostName as DownloadHostName,
    noVideoInt
  );
  c.header("Content-Type", "application/octet-stream");
  c.header("Content-Disposition", `attachment; filename="${setId}.osz"`);
  return c.body(beatmaps);
});

export { routes as BeatmapsetRoutes };
