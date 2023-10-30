import { GraphQLClient } from "graphql-request";
import { Session } from "next-auth";
import { createClient } from "graphql-ws";

// if dev, use dev endpoint, else use prod endpoint
export const apiUrl =
  process.env.VERCEL_ENV === "development"
    ? (process.env.NEXT_PUBLIC_DEV_API_URL as string)
    : (process.env.NEXT_PUBLIC_API_URL as string);

export function getPublicQueryClient() {
  return new GraphQLClient(apiUrl);
}

export async function getQueryClient(session: Session) {
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

export function getSubscriptionClient(session: Session) {
  if (!session) {
    throw new Error("No session found");
  }

  const offsetOr = process.env.VERCEL_ENV === "development" ? 0 : 1;
  const url = `ws://localhost:8080/ws`;

  return createClient({ url });
}

type MemoOpts = {
  log?: ("dedupe" | "datacache" | "verbose")[];
};

export const DEFAULT_MEMO_OPTS: MemoOpts = {
  log: ["verbose", "datacache"],
};
