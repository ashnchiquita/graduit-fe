import { RoleEnum } from "@/types/session-data";

export type Account = {
  id: string;
  email: string;
  name: string;
  nim?: string;
  access: string[];
};

export type GetAccountResponseItem = {
  id: string;
  nama: string;
  email: string;
  nim?: string;
  roles: string[];
};

export type GetAllAccountsParams = {
  search?: string;
  nama?: string;
  email?: string;
  roles?: RoleEnum[];
  customFlag?: string;
  page: number;
  limit: number;
};

export type GetAllAccountsResponseData = {
  akun: GetAccountResponseItem[];
  count: number;
};

export type PutAccountRequestData = {
  id?: string;
  nama: string;
  email: string;
  password?: string;
  nim?: string;
  access: string[];
};

export type CreateAccountRequestData = {
  nama: string;
  email: string;
  password: string;
  nim?: string;
  access: string[];
};

export type PutAccountResponseData = {
  identifiers: {
    id: string;
  }[];
  generatedMaps: {
    id: string;
    roles: string[];
  }[];
  raw: {
    id: string;
    roles: string[];
  }[];
};

export type DeleteAccountResponseData = {
  raw: {
    id: string;
  }[];
  affected: number;
};

export type PatchBatchUpdateRole = {
  ids: string[];
  newRoles: string[];
};

export type RemoveBatchUpdateRole = {
  ids: string[];
};

export type SuccessResponse = {
  message: string;
};

export type RoleAccess = {
  id: number;
  name: string;
};
