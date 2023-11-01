import { GraphQLClient, GraphQLWebSocketClient } from "graphql-request";
import { Session } from "next-auth";

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

export function getSocket() {
  // todo: fix this
  const offsetOr = process.env.VERCEL_ENV === "development" ? 4 : 5;
  return new WebSocket(`ws://localhost:8080/ws`, "graphql-transport-ws");
}

export function getSubscriptionClient(session: Session, socket: WebSocket) {
  if (!session) {
    throw new Error("No session found");
  }

  const url = `ws://localhost:8080/ws`;

  return new GraphQLWebSocketClient(socket, {});
}

type MemoOpts = {
  log?: ("dedupe" | "datacache" | "verbose")[];
};

export const DEFAULT_MEMO_OPTS: MemoOpts = {
  log: ["verbose", "datacache"],
};
