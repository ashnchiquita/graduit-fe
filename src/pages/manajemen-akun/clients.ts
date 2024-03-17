import loginInstance from "@/config/login-axios-config";
import {
  DeleteAccountResponseData,
  GetAccountResponseItem,
  GetAllAccountsParams,
  GetAllAccountsResponseData,
  PutAccountRequestData,
  PutAccountResponseData,
} from "./types";

export async function getAllAccounts(params: GetAllAccountsParams) {
  return await loginInstance.get<GetAllAccountsResponseData>("/akun", {
    params,
  });
}

export async function getAccount(id: string) {
  return await loginInstance.get<GetAccountResponseItem>(`/akun/${id}`);
}

export async function putAccount(data: PutAccountRequestData) {
  return await loginInstance.put<PutAccountResponseData>("/akun", data);
}

export async function deleteAccount(id: string) {
  return await loginInstance.delete<DeleteAccountResponseData>(`/akun/${id}`);
}
