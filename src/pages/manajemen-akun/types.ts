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
};

export type GetAllAccountsResponseData = GetAccountResponseItem[];

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
