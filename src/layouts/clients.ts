import loginInstance from "@/config/login-axios-config";
import { SessionData } from "@/types/session-data";

export async function getSession() {
  return await loginInstance.get<SessionData>("/auth/self", {
    withCredentials: true,
  });
}
