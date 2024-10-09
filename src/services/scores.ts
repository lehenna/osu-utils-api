import axios from "axios";
import { APIError, APIErrorCode } from "../lib/api-error";
import { nodesu } from "../lib/nodesu";
import { Score } from "../models/score";

export class ScoreServices {
  static async findByBeatmapId(
    beatmapId: number,
    mods?: number,
    limit?: number,
    userId?: number
  ): Promise<Score[]> {
    try {
      const scores = await nodesu.scores.get(
        beatmapId,
        mods,
        undefined,
        limit,
        userId
      );
      return scores.map(({ username, accuracy, score_id, ...score }: any) => {
        return {
          id: score_id,
          beatmap_id: beatmapId,
          accuracy: accuracy ?? "accuracy",
          ...score,
        };
      });
    } catch {
      throw new APIError({
        status: 404,
        code: APIErrorCode.NotFound,
        message: "Not found.",
      });
    }
  }

  static async findById(scoreId: string | number): Promise<Score> {
    try {
      const { data } = await axios.get(`https://osu.ppy.sh/scores/${scoreId}`);
      const score: Score = {
        id: data.id,
        rank_global: data.rank_global,
        beatmap_id: data.beatmap.id,
        score: data.total_score,
        user_id: data.user_id,
        enabled_mods: (
          data.mods?.map((mod: { acronym: string }) => mod.acronym) ?? []
        ).join(),
        maxcombo: data.max_combo,
        passed: data.passed,
        pp: data.pp,
        rank: data.rank,
        replay_available: data.has_replay,
        accuracy: data.accuracy,
        date: data.ended_at,
        count300: data.statistics.great ?? 0,
        count100: data.statistics.ok ?? 0,
        count50: data.statistics.meh ?? 0,
        countmiss: data.statistics.miss ?? 0,
        perfect: data.accuracy === 1 ? "1" : "0",
      };
      return score;
    } catch {
      throw new APIError({
        status: 404,
        code: APIErrorCode.NotFound,
        message: "Not found.",
      });
    }
  }
}
