import { BaseSchema, flatten, parse, ValiError } from "valibot";
import { APIError, APIErrorCode } from "./api-error";

export type ValibotErrors = {
  message: string;
  issues: Record<string, string>;
};

export async function validateSchema<Input, Output>(
  schema: BaseSchema<Input, Output, any>,
  values: any
): Promise<Output> {
  try {
    const data = parse(schema, values);
    return data;
  } catch (error) {
    if (error instanceof ValiError) {
      const issues = flatten(error.issues);
      if (!issues.nested)
        throw new APIError({
          status: 400,
          code: APIErrorCode.InvalidBody,
          message: "Invalid body.",
          issues: {
            root: issues.root ?? [],
          },
        });
      const errors: Record<string, string[]> = {};
      for (const err in issues.nested) {
        errors[err] = issues.nested[err] ?? [];
      }
      throw new APIError({
        status: 400,
        code: APIErrorCode.InvalidBody,
        message: "Invalid body.",
        issues: errors,
      });
    }
    throw new APIError({
      status: 400,
      code: APIErrorCode.InvalidBody,
      message: "Invalid body.",
      issues: {},
    });
  }
}
