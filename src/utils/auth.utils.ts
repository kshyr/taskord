import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

export const getUserSession = () => getServerSession(authOptions);
