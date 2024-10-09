import { APIError, APIErrorCode } from "../lib/api-error";
import { nodesu } from "../lib/nodesu";

export class MatchServices {
  static async findById(matchId: string | number) {
    try {
      const data = await nodesu.multi.getMatch(
        typeof matchId === "string" ? parseInt(matchId) : matchId
      );
      return data;
    } catch {
      throw new APIError({
        status: 404,
        code: APIErrorCode.NotFound,
        message: "Match not found.",
      });
    }
  }
}
