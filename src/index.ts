import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { UserRoutes } from "./routes/users";
import { MatchRoutes } from "./routes/matches";
import { ScoreRoutes } from "./routes/scores";
import { BeatmapsetRoutes } from "./routes/beatmapsets";
import { BeatmapsRoutes } from "./routes/beatmaps";

const app = new Hono();

app.route("/api/users", UserRoutes);
app.route("/api/beatmaps", BeatmapsRoutes);
app.route("/api/beatmapsets", BeatmapsetRoutes);
app.route("/api/matches", MatchRoutes);
app.route("/api/scores", ScoreRoutes);

app.get("/_astro/*", serveStatic({ root: "./web/dist" }));
app.get("*", serveStatic({ path: "./web/dist/index.html" }));

export default app;
