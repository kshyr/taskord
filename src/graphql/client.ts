import { GraphQLClient } from "graphql-request";
import { headers } from "next/headers";
import { getUserSession } from "@/src/utils/auth.utils";

// export const queryClient = new GraphQLClient(process.env.API_URL as string, {
// 	fetch: cache(async (url: RequestInfo | URL, params?: RequestInit) => {
// 		const JWT = cookies().get("Authorization");
// 		return fetch(url, {
// 				...params,
// 			headers: {
// 					authorization: "Bearer " + JWT,
// 				}, next: {revalidate: 600}
// 			}
// 		)
// 	})
// });

// if dev, use dev endpoint, else use prod endpoint
const endpoint =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_API_URL
    : process.env.API_URL;

export function getPublicQueryClient() {
  return new GraphQLClient(endpoint as string);
}

export async function getQueryClient() {
  const session = await getUserSession();

  return new GraphQLClient(endpoint as string, {
    headers: {
      authorization: "Bearer " + session?.user?.token,
    },
  });
}
