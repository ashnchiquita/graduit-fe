//type/entity kalian dibuat disini

import React from "react";

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

export type MahasiswaLogs = {
  tanggal: string;
  laporanKemajuan: string;
  toDo: string;
  berkas: React.ReactNode;
  status: React.ReactNode;
  rencana: string
}

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
