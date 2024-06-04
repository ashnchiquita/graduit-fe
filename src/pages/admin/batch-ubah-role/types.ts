import { RoleEnum } from "@/types/session-data";
import { Table } from "@tanstack/react-table";
import { UseFormReturn } from "react-hook-form";
import { KeyedMutator } from "swr";
import { RoleAccess } from "../types";

export type Account = {
  id: string;
  email: string;
  name: string;
  nim?: string;
  access: string[];
};

export type BatchUbahRoleHookRet = {
  table: Table<Account>;
  searchValue: string;
  handleSearchValueChange: (value: string) => void;
  fetchData: KeyedMutator<Account[]>;
  tambahRoleDialogOpen: boolean;
  setTambahRoleDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hapusRoleDialogOpen: boolean;
  setHapusRoleDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openFilterDialog: boolean;
  setOpenFilterDialog: React.Dispatch<React.SetStateAction<boolean>>;
  namaValue: string;
  setNamaValue: React.Dispatch<React.SetStateAction<string>>;
  emailValue: string;
  setEmailValue: React.Dispatch<React.SetStateAction<string>>;
  roleValue: RoleEnum[];
  roleAccess: RoleAccess[];
  setRoleValue: React.Dispatch<React.SetStateAction<RoleEnum[]>>;
  viewRole: string;
  setViewRole: React.Dispatch<React.SetStateAction<string>>;
  handleRoleValueChange: (val: RoleEnum) => void;
  handleAddAccountButton: () => void;
};

export type RoleDialogProps = {
  tambahRoleDialogOpen: boolean;
  setTambahRoleDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  table: Table<Account>;
} & RoleDialogHookRet;

export type RoleDialogHookProps = {
  table: Table<Account>;
  fetchData: KeyedMutator<Account[]>;
  setTambahRoleDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  roleAccess: {
    id: number;
    name: string;
  }[];
};

export type HapusRoleDialogProps = {
  hapusRoleDialogOpen: boolean;
  setHapusRoleDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  table: Table<Account>;
} & HapusRoleDialogHookRet;

export type HapusRoleDialogHookProps = {
  table: Table<Account>;
  fetchData: KeyedMutator<Account[]>;
  setHapusRoleDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type HapusRoleDialogHookRet = {
  form: UseFormReturn<{}, any, undefined>;
  handleSubmit: () => Promise<void>;
};

export type ViewSelectProps = {
  viewRole: string;
  setViewRole: React.Dispatch<React.SetStateAction<string>>;
};
