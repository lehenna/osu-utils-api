import { Hono } from "hono";
import { ScoreServices } from "../services/scores";

const routes = new Hono();

routes.get("/:scoreId", async (c) => {
  const { scoreId } = c.req.param();
  const score = await ScoreServices.findById(scoreId);
  return c.json(score);
});

export { routes as ScoreRoutes };
