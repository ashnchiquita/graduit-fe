import { RoleEnum } from "@/types/session-data";
import { GoGear } from "react-icons/go";
import { IoSchoolOutline } from "react-icons/io5";
import { VscHome, VscNotebook } from "react-icons/vsc";
import { NavItem } from "../types";

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    icon: <VscHome className="size-4 text-slate-700" />,
    iconActive: <VscHome className="size-4 text-blue-900" />,
    path: "/dashboard",
    roleAccess: [
      RoleEnum.S1_PEMBIMBING,
      RoleEnum.S2_PEMBIMBING,
      RoleEnum.S1_MAHASISWA,
      RoleEnum.S2_MAHASISWA,
      RoleEnum.S1_TIM_TA,
      RoleEnum.S2_TIM_TESIS,
      RoleEnum.ADMIN,
    ],
  },
  {
    label: "Pendaftaran",
    icon: <VscNotebook className="text-slate-700" />,
    children: [
      {
        label: "Registrasi Tugas Akhir",
        path: "/registrasi",
        roleAccess: [RoleEnum.S1_MAHASISWA],
      },
      {
        label: "Registrasi Tesis",
        path: "/registrasi",
        roleAccess: [RoleEnum.S2_MAHASISWA],
      },
      {
        label: "Daftar Pengajuan",
        path: "/daftar-pengajuan",
        roleAccess: [RoleEnum.S1_MAHASISWA, RoleEnum.S2_MAHASISWA],
      },
    ],
    roleAccess: [RoleEnum.S1_MAHASISWA, RoleEnum.S2_MAHASISWA],
  },

  {
    label: "Laporan Kemajuan",
    icon: <IoSchoolOutline className="text-slate-700" />,
    children: [
      {
        label: "Rekap Pendaftaran",
        path: "/rekap-pendaftaran-tim-tesis",
        roleAccess: [RoleEnum.S2_TIM_TESIS, RoleEnum.S1_TIM_TA],
      },
    ],
    roleAccess: [RoleEnum.S2_TIM_TESIS, RoleEnum.S1_TIM_TA],
  },
  {
    label: "Bimbingan",
    icon: <IoSchoolOutline className="text-slate-700" />,
    children: [
      {
        label: "Rekap Pendaftaran Bimbingan",
        path: "/rekap-pendaftaran",
        roleAccess: [RoleEnum.S1_PEMBIMBING, RoleEnum.S2_PEMBIMBING],
      },
      {
        label: "Riwayat Bimbingan",
        path: "/log/bimbingan",
        roleAccess: [RoleEnum.S1_MAHASISWA, RoleEnum.S2_MAHASISWA],
      },
      {
        label: "Log Bimbingan",
        path: "/add-log-bimbingan",
        roleAccess: [RoleEnum.S1_MAHASISWA, RoleEnum.S2_MAHASISWA],
      },
    ],
    roleAccess: [
      RoleEnum.S1_PEMBIMBING,
      RoleEnum.S2_PEMBIMBING,
      RoleEnum.S1_MAHASISWA,
      RoleEnum.S2_MAHASISWA,
    ],
  },
  {
    label: "TA & Tesis",
    icon: <IoSchoolOutline className="text-slate-700" />,
    children: [
      {
        label: "Daftar Topik",
        path: "/daftar-topik",
        roleAccess: [
          RoleEnum.S1_MAHASISWA,
          RoleEnum.S1_PEMBIMBING,
          RoleEnum.S2_PEMBIMBING,
          RoleEnum.S1_TIM_TA,
          RoleEnum.S2_TIM_TESIS,
          RoleEnum.ADMIN,
        ],
      },
      {
        label: "Pengajuan Sidang & Seminar",
        path: "/pengajuan-sidsem",
        roleAccess: [
          RoleEnum.S2_PEMBIMBING,
          RoleEnum.S2_PENGUJI,
          RoleEnum.S1_TIM_TA,
          RoleEnum.S2_TIM_TESIS,
          RoleEnum.ADMIN,
        ],
      },
    ],
    roleAccess: [
      RoleEnum.S1_PEMBIMBING,
      RoleEnum.S2_PEMBIMBING,
      RoleEnum.S1_TIM_TA,
      RoleEnum.S2_TIM_TESIS,
      RoleEnum.ADMIN,
    ],
  },
  // {
  //   label: "Sidang dan Seminar",
  //   icon: <IoSchoolOutline className="text-slate-700" />,
  //   children: [
  //     {
  //       label: "Rekap Pendaftaran Tim Tesis",
  //       path: "/rekap-pendaftaran-tim-tesis",
  //       roleAccess: [RoleEnum.S2_TIM_TESIS, RoleEnum.ADMIN],
  //     },
  //     {
  //       label: "Rekap Pendaftaran Pembimbing",
  //       path: "/rekap-pendaftaran",
  //       roleAccess: [RoleEnum.S2_PEMBIMBING],
  //     },
  //   ],
  //   roleAccess: [RoleEnum.S2_PEMBIMBING, RoleEnum.S2_TIM_TESIS, RoleEnum.ADMIN],
  // },
  {
    label: "Manajemen",
    icon: <GoGear className="text-slate-700" />,
    children: [
      // {
      //   label: "Daftar Topik",
      //   path: "/manajemen/daftar-topik",
      //   roleAccess: [
      //     RoleEnum.ADMIN,
      //     RoleEnum.TU,
      //     RoleEnum.S2_TIM_TESIS,
      //     RoleEnum.S1_TIM_TA,
      //   ],
      // },
      {
        label: "Kelola Akun",
        path: "/manajemen/kelola-akun",
        roleAccess: [
          RoleEnum.ADMIN,
          RoleEnum.TU,
          RoleEnum.S2_TIM_TESIS,
          RoleEnum.S1_TIM_TA,
        ],
      },
      {
        label: "Role Pengguna",
        path: "/manajemen/role-pengguna",
        roleAccess: [
          RoleEnum.ADMIN,
          RoleEnum.TU,
          RoleEnum.S2_TIM_TESIS,
          RoleEnum.S1_TIM_TA,
        ],
      },
      {
        label: "Periode Pendidikan",
        path: "/manajemen/periode-pendidikan",
        roleAccess: [
          RoleEnum.ADMIN,
          RoleEnum.TU,
          RoleEnum.S2_TIM_TESIS,
          RoleEnum.S1_TIM_TA,
        ],
      },
    ],
    roleAccess: [
      RoleEnum.ADMIN,
      RoleEnum.TU,
      RoleEnum.S2_TIM_TESIS,
      RoleEnum.S1_TIM_TA,
    ],
  },
];

export { NAV_ITEMS };
