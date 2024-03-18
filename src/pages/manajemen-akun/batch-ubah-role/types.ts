import { Table } from "@tanstack/react-table";
import { UseFormReturn } from "react-hook-form";
import { KeyedMutator } from "swr";

export type Account = {
  id: string;
  email: string;
  name: string;
  access: string[];
};

export type BatchUbahRoleHookRet = {
  table: Table<Account>;
  searchValue: string;
  handleSearchValueChange: (value: string) => void;
  fetchData: KeyedMutator<Account[]>;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type RoleDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  table: Table<Account>;
} & RoleDialogHookRet;

export type RoleDialogHookProps = {
  table: Table<Account>;
  fetchData: KeyedMutator<Account[]>;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type RoleDialogHookRet = {
  isSubmitDisabled: boolean;
  setSubmitDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  form: UseFormReturn<
    {
      access: {
        id: number;
        name: string;
      }[];
    },
    any,
    undefined
  >;
  handleSubmit: ({
    access,
  }: {
    access: {
      id: number;
      name: string;
    }[];
  }) => Promise<void>;
};
