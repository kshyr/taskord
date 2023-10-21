import { GraphQLClient } from "graphql-request";
import { getUserSession } from "@/src/utils/auth.utils";

// if dev, use dev endpoint, else use prod endpoint
export const apiUrl =
  process.env.VERCEL_ENV === "development"
    ? (process.env.NEXT_PUBLIC_DEV_API_URL as string)
    : (process.env.NEXT_PUBLIC_API_URL as string);

export function getPublicQueryClient() {
  return new GraphQLClient(apiUrl);
}

export async function getQueryClient() {
  const session = await getUserSession();

  if (!session) {
    throw new Error("No session found");
  }

  return new GraphQLClient(apiUrl, {
    fetch,
    headers: {
      Authorization: "Bearer " + session.user.accessToken.token,
    },
  });
}

type MemoOpts = {
  log?: ("dedupe" | "datacache" | "verbose")[];
};

export const DEFAULT_MEMO_OPTS: MemoOpts = {
  log: ["verbose", "datacache"],
};
