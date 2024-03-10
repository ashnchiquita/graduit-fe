//type/entity kalian dibuat disini

export type SidenavItem = {
  title: string;
  path: string;
  icon: string;
  submenu?: boolean;
  subMenuItems?: SubMenuItem[];
};

export type SubMenuItem = {
  title: string;
  path: string;
  icon: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  major: string;
  profpic: string;
};

export type SystemLogs = {
  id: string;
  idPengguna: string;
  action: string;
  createdAt: string;
};

export type Topic = {
  lectId: number;
  imgUrl: string;
  lecturer: string;
  topic: string;
  description: string;
  isStudent: string;
};
