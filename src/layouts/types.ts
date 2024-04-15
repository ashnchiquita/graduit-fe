import { RoleEnum, SessionData } from "@/types/session-data";

export interface NavItem {
  label: string;
  icon?: JSX.Element;
  iconActive?: JSX.Element;
  path?: string;
  children?: NavItem[];
  roleAccess: RoleEnum[];
}

export type SidebarContentHookRet = {
  session: SessionData | null;
  toggleGroup: (label: string) => void;
  openGroups: string[];
  loading: boolean;
};
