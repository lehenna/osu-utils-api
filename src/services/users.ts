import { ModeType } from "nodesu";
import { APIError, APIErrorCode } from "../lib/api-error";
import { nodesu } from "../lib/nodesu";
import { User } from "../models/user";
import { Score } from "../models/score";

export class UserServices {
  static async findById(userId: string | number): Promise<User> {
    try {
      const { events, ...user } = (await nodesu.user.get(userId)) as any;
      return user as User;
    } catch {
      throw new APIError({
        status: 404,
        code: APIErrorCode.NotFound,
        message: "User not found.",
      });
    }
  }

  static async getRecentScores(
    userId: string | number,
    mode?: ModeType,
    limit?: number
  ): Promise<Score[]> {
    try {
      const scores = await nodesu.user.getRecent(userId, mode, limit);
      return scores as Score[];
    } catch {
      throw new APIError({
        status: 404,
        code: APIErrorCode.NotFound,
        message: "User not found.",
      });
    }
  }

  static async getBestScores(
    userId: string | number,
    mode?: ModeType,
    limit?: number
  ): Promise<Score[]> {
    try {
      const scores = await nodesu.user.getBest(userId, mode, limit);
      return scores as Score[];
    } catch {
      throw new APIError({
        status: 404,
        code: APIErrorCode.NotFound,
        message: "User not found.",
      });
    }
  }
}
