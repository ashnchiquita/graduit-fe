import loginInstance from "@/config/login-axios-config";
import {
  DeleteAccountResponseData,
  GetAccountResponseItem,
  GetAllAccountsParams,
  GetAllAccountsResponseData,
  PatchBatchUpdateRole,
  PutAccountRequestData,
  PutAccountResponseData,
  SuccessResponse,
} from "./types";

export async function getAllAccounts(params: GetAllAccountsParams) {
  return await loginInstance.get<GetAllAccountsResponseData>("/akun", {
    params,
    withCredentials: true,
  });
}

export async function getAccount(id: string) {
  return await loginInstance.get<GetAccountResponseItem>(`/akun/${id}`, {
    withCredentials: true,
  });
}

export async function putAccount(data: PutAccountRequestData) {
  return await loginInstance.put<PutAccountResponseData>("/akun", data, {
    withCredentials: true,
  });
}

export async function deleteAccount(id: string) {
  return await loginInstance.delete<DeleteAccountResponseData>(`/akun/${id}`, {
    withCredentials: true,
  });
}

export async function patchBatchUpdateRole(data: PatchBatchUpdateRole) {
  return await loginInstance.patch<SuccessResponse>("/akun/roles-batch", data, {
    withCredentials: true,
  });
}
