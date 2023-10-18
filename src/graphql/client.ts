import { GraphQLClient } from "graphql-request";
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
export const apiUrl =
  process.env.NODE_ENV === "development"
    ? (process.env.NEXT_PUBLIC_DEV_API_URL as string)
    : (process.env.NEXT_PUBLIC_API_URL as string);

export function getPublicQueryClient() {
  return new GraphQLClient(apiUrl);
}

export async function getQueryClient() {
  const session = await getUserSession();

  return new GraphQLClient(apiUrl, {
    headers: {
      authorization: "Bearer " + session?.user?.accessToken.token,
    },
  });
}
