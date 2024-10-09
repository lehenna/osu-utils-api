import { Hono } from "hono";
import { UserServices } from "../services/users";

const routes = new Hono();

routes.get("/:userId", async (c) => {
  const { userId } = c.req.param();
  const user = await UserServices.findById(userId);
  return c.json(user);
});

routes.get("/:userId/scores/best", async (c) => {
  const { userId } = c.req.param();
  const { limit, mode } = c.req.query();
  const scores = await UserServices.getBestScores(
    userId,
    mode ? parseInt(mode) : undefined,
    limit ? parseInt(limit) : undefined
  );
  return c.json(scores);
});

routes.get("/:userId/scores/recent", async (c) => {
  const { userId } = c.req.param();
  const { limit, mode } = c.req.query();
  const scores = await UserServices.getRecentScores(
    userId,
    mode ? parseInt(mode) : undefined,
    limit ? parseInt(limit) : undefined
  );
  return c.json(scores);
});

export { routes as UserRoutes };
