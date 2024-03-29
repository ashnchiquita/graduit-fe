import loginInstance from "@/config/login-axios-config";
import type { SessionData } from "@/types/session-data";
import useSWR from "swr";

export default function useSession(): {
  data: SessionData | null;
  isLoading: boolean;
} {
  const { data = null, isLoading } = useSWR("/session", async () => {
    const res = await loginInstance.get<SessionData>("/auth/self", {
      withCredentials: true,
    });

    return res.data;
  });

  return { data, isLoading };
}
