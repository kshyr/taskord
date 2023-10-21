import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

export const getUserSession = () => getServerSession(authOptions);

export const getUserId = async () => {
  const session = await getUserSession();

  if (!session) {
    throw new Error("No session found");
  }

  return session.user.id;
};
