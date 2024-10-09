import { Hono } from "hono";
import { MatchServices } from "../services/matches";

const routes = new Hono();

routes.get("/:matchId", async (c) => {
  const { matchId } = c.req.param();
  const data = await MatchServices.findById(matchId);
  return c.json(data);
});

export { routes as MatchRoutes };
