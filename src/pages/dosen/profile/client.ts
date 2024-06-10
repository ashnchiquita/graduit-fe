import loginInstance from "@/config/login-axios-config";
import { PatchDosbimProfileReqBody } from "./types";

export async function patchDosbimProfile(body: PatchDosbimProfileReqBody) {
  return await loginInstance.patch<{ id: string }>("/akun/profile", body);
}
