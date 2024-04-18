import { RoleEnum } from "@/types/session-data";
import { BookOpen } from "lucide-react";
import { IoSchoolOutline } from "react-icons/io5";
import { VscNotebook, VscPieChart } from "react-icons/vsc";
import { NavItem } from "../types";

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    icon: <VscPieChart className="text-slate-700" />,
    iconActive: <VscPieChart className="text-blue-900" />,
    path: "/dashboard",
    roleAccess: [
      RoleEnum.S1_PEMBIMBING,
      RoleEnum.S2_PEMBIMBING,
      RoleEnum.S1_MAHASISWA,
      RoleEnum.S2_MAHASISWA,
    ],
  },
  {
    label: "Pendaftaran",
    icon: <VscNotebook className="text-slate-700" />,
    children: [
      {
        label: "Registrasi",
        path: "/registrasi",
        roleAccess: [RoleEnum.S1_MAHASISWA, RoleEnum.S2_MAHASISWA],
      },
      {
        label: "Daftar Pengajuan",
        path: "/daftar-pengajuan",
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
    label: "Bimbingan",
    icon: <IoSchoolOutline className="text-slate-700" />,
    children: [
      {
        label: "Rekap Pendaftaran",
        path: "/rekap-pendaftaran",
        roleAccess: [RoleEnum.S1_PEMBIMBING, RoleEnum.S2_PEMBIMBING],
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
    label: "Tugas",
    icon: <VscNotebook className="text-slate-700" />,
    children: [
      {
        label: "Daftar Kelas",
        path: `/tugas/daftar-kelas?view=${RoleEnum.S2_MAHASISWA}`,
        roleAccess: [RoleEnum.S2_MAHASISWA],
      },
      {
        label: "Daftar Kelas",
        path: `/tugas/daftar-kelas?view=${RoleEnum.S2_KULIAH}`,
        roleAccess: [RoleEnum.S2_KULIAH],
      },
    ],
    roleAccess: [RoleEnum.S2_MAHASISWA, RoleEnum.S2_KULIAH],
  },
  {
    label: "Kelas",
    icon: <BookOpen size={18} className="text-slate-700" />,
    children: [
      {
        label: "Daftar Kelas",
        path: `/kelas/daftar-kelas?view=${RoleEnum.S2_TIM_TESIS}`,
        roleAccess: [RoleEnum.S2_TIM_TESIS],
      },
      {
        label: "Nilai Mahasiswa",
        path: "/kelas/input-nilai",
        roleAccess: [RoleEnum.S2_TIM_TESIS],
      },
    ],
    roleAccess: [RoleEnum.S2_TIM_TESIS],
  },
  // {
  //   label: "Tesis",
  //   icon: <IoSchoolOutline className="text-slate-700" />,
  //   children: [
  //     { label: "Registrasi", path: "/tesis/registrasi" },
  //     { label: "Status", path: "/tesis/status" },
  //     { label: "Rekap", path: "/tesis/rekap" },
  //   ],
  // },
  // {
  //   label: "Tugas Akhir",
  //   icon: <IoSchoolOutline className="text-slate-700" />,
  //   children: [
  //     { label: "Topik", path: "/tugas-akhir/topik/2" },
  //     { label: "Status", path: "/tugas-akhir/status/1" },
  //     { label: "Pengumuman", path: "/tugas-akhir/pengumuman" },
  //     { label: "Penjadwalan", path: "/tugas-akhir/penjadwalan" },
  //   ],
  // },
  // {
  //   label: "Informasi",
  //   icon: <VscInfo className="text-slate-700" />,
  //   children: [
  //     { label: "Seminar", path: "/informasi/seminar" },
  //     { label: "Pengujian", path: "/informasi/pengujian" },
  //   ],
  // },
  // {
  //   label: "Log",
  //   icon: <IoClipboardOutline className="text-slate-700" />,
  //   children: [
  //     { label: "Bimbingan", path: "/log/bimbingan" },
  //     { label: "Sistem", path: "/log/sistem" },
  //   ],
  // },
  {
    label: "Manajemen",
    icon: <IoSchoolOutline className="text-slate-700" />,
    children: [
      {
        label: "Daftar Topik",
        path: "/manajemen/daftar-topik",
        roleAccess: [
          RoleEnum.ADMIN,
          RoleEnum.TU,
          RoleEnum.S2_TIM_TESIS,
          RoleEnum.S1_TIM_TA,
        ],
      },
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
