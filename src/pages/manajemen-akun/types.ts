export type Account = {
  id: string;
  email: string;
  name: string;
  access: string[];
};

export type GetAccountResponseItem = {
  id: string;
  nama: string;
  email: string;
  roles: string[];
};

export type GetAllAccountsParams = {
  search?: string;
  page: number;
  limit: number;
};

export type GetAllAccountsResponseData = [GetAccountResponseItem[], number];

export type PutAccountRequestData = {
  id?: string;
  nama: string;
  email: string;
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
