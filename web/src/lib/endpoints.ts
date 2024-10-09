import {
  EXAMPLE_BEATMAP_DATA,
  EXAMPLE_BEATMAP_PERFORMANCE_DATA,
  EXAMPLE_BEATMAP_SCORES_DATA,
  EXAMPLE_BEATMAPSET_DATA,
  EXAMPLE_SCORES_DATA,
  EXAMPLE_USER_BEST_SCORES_DATA,
  EXAMPLE_USER_DATA,
  EXAMPLE_USER_RECENT_SCORES_DATA,
} from "./consts";

export enum EndpointMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
  Patch = "PATCH",
}

export interface EndpointField {
  name: string;
  type: string;
  description: string;
}

export interface EndpointResponse {
  status: number;
  data: any;
}

export interface Endpoint {
  pathname: string;
  description: string;
  method: EndpointMethod;
  response: EndpointResponse[];
  query?: EndpointField[];
  body?: EndpointField[] | EndpointField[][];
}

export interface Section {
  title: string;
  endpoints: Endpoint[];
}

export const Sections: Section[] = [
  {
    title: "Beatmaps",
    endpoints: [
      {
        method: EndpointMethod.Get,
        pathname: "/beatmaps/{beatmapId}",
        description: "Get beatmap details by ID",
        response: [
          {
            status: 200,
            data: EXAMPLE_BEATMAP_DATA,
          },
          {
            status: 404,
            data: {
              code: "NOT_FOUND",
              message: "Beatmap not found.",
            },
          },
        ],
      },
      {
        method: EndpointMethod.Post,
        pathname: "/beatmaps/{beatmapId}/performance",
        description: "Get PP from a beatmap",
        body: [
          [
            {
              name: "accuracy",
              type: "number",
              description: "Accuracy obtained (value from 0 to 1)",
            },
            {
              name: "combo",
              type: "number",
              description: "Combo obtained",
            },
            {
              name: "misses",
              type: "number",
              description: "Misses obtained",
            },
            {
              name: "mods",
              type: "number | string",
              description: "Enabled mods",
            },
          ],
        ],
        response: [
          {
            status: 200,
            data: EXAMPLE_BEATMAP_PERFORMANCE_DATA,
          },
          {
            status: 404,
            data: {
              code: "NOT_FOUND",
              message: "Beatmap not found.",
            },
          },
        ],
      },
      {
        method: EndpointMethod.Get,
        pathname: "/beatmaps/{beatmapId}/scores",
        description: "Get scores from beatmap",
        query: [
          {
            name: "userId",
            type: "number",
            description: "Filter by userId",
          },
          {
            name: "limit",
            type: "number",
            description: "Limit of returned scores",
          },
          {
            name: "mods",
            type: "number",
            description: "Mods (number)",
          },
        ],
        response: [
          {
            status: 200,
            data: EXAMPLE_BEATMAP_SCORES_DATA,
          },
          {
            status: 404,
            data: {
              code: "NOT_FOUND",
              message: "Beatmap not found.",
            },
          },
        ],
      },
    ],
  },
  {
    title: "Beatmapsets",
    endpoints: [
      {
        method: EndpointMethod.Get,
        pathname: "/beatmapsets/{setId}",
        description: "Get beatmaps from beatmapset",
        response: [
          {
            status: 200,
            data: EXAMPLE_BEATMAPSET_DATA,
          },
          {
            status: 404,
            data: {
              code: "NOT_FOUND",
              message: "Beatmapset not found.",
            },
          },
        ],
      },
      {
        method: EndpointMethod.Get,
        pathname: "/beatmapsets/{setId}/download",
        description: "Download a beatmap",
        response: [
          {
            status: 200,
            data: "arraybuffer",
          },
          {
            status: 404,
            data: {
              code: "NOT_FOUND",
              message: "Beatmapset not found.",
            },
          },
        ],
      },
    ],
  },
  {
    title: "Scores",
    endpoints: [
      {
        method: EndpointMethod.Get,
        pathname: "/scores/{scoreId}",
        description: "Get user scores",
        response: [
          {
            status: 200,
            data: EXAMPLE_SCORES_DATA,
          },
          {
            status: 404,
            data: {
              code: "NOT_FOUND",
              message: "Score not found.",
            },
          },
        ],
      },
    ],
  },
  {
    title: "Users",
    endpoints: [
      {
        method: EndpointMethod.Get,
        pathname: "/users/{userId}",
        description: "Get user by ID",
        response: [
          {
            status: 200,
            data: EXAMPLE_USER_DATA,
          },
          {
            status: 404,
            data: {
              code: "NOT_FOUND",
              message: "User not found.",
            },
          },
        ],
      },
      {
        method: EndpointMethod.Get,
        pathname: "/users/{userId}/scores/best",
        description: "Get best user scores",
        query: [
          {
            name: "mode",
            type: "number",
            description: "Game mode (0,1,2,3)",
          },
          {
            name: "limit",
            type: "number",
            description: "Limit of returned scores",
          },
        ],
        response: [
          {
            status: 200,
            data: EXAMPLE_USER_BEST_SCORES_DATA,
          },
          {
            status: 404,
            data: {
              code: "NOT_FOUND",
              message: "User not found.",
            },
          },
        ],
      },
      {
        method: EndpointMethod.Get,
        pathname: "/users/{userId}/scores/recent",
        description: "Get recent user scores",
        query: [
          {
            name: "mode",
            type: "number",
            description: "Game mode (0,1,2,3)",
          },
          {
            name: "limit",
            type: "number",
            description: "Limit of returned scores",
          },
        ],
        response: [
          {
            status: 200,
            data: EXAMPLE_USER_RECENT_SCORES_DATA,
          },
          {
            status: 404,
            data: {
              code: "NOT_FOUND",
              message: "User not found.",
            },
          },
        ],
      },
    ],
  },
];
