import { RoleEnum } from "@/types/session-data";
import { IoSchoolOutline } from "react-icons/io5";
import { VscHome, VscNotebook } from "react-icons/vsc";
import { NavItem } from "../types";

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    icon: <VscHome className="text-slate-700" />,
    iconActive: <VscHome className="text-blue-900" />,
    path: "/dashboard",
    roleAccess: [
      RoleEnum.S1_PEMBIMBING,
      RoleEnum.S2_PEMBIMBING,
      RoleEnum.S1_MAHASISWA,
      RoleEnum.S2_MAHASISWA,
      RoleEnum.S1_TIM_TA,
      RoleEnum.S2_TIM_TESIS,
    ],
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
    label: "Pendaftaran",
    icon: <VscNotebook className="text-slate-700" />,
    children: [
      // {
      //   label: "Registrasi",
      //   path: "/dashboard-registrasi",
      //   roleAccess: [RoleEnum.S1_MAHASISWA, RoleEnum.S2_MAHASISWA],
      // },
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
  // {
  //   label: "Tugas",
  //   icon: <VscNotebook className="text-slate-700" />,
  //   children: [
  //     {
  //       label: "Daftar Kelas",
  //       path: `/tugas/daftar-kelas?view=${RoleEnum.S2_MAHASISWA}`,
  //       roleAccess: [RoleEnum.S2_MAHASISWA],
  //     },
  //     {
  //       label: "Assignment",
  //       path: `/tugas/assignment`,
  //       roleAccess: [RoleEnum.S2_MAHASISWA],
  //     },
  //     {
  //       label: "Daftar Kelas",
  //       path: `/tugas/daftar-kelas?view=${RoleEnum.S2_KULIAH}`,
  //       roleAccess: [RoleEnum.S2_KULIAH],
  //     },
  //   ],
  //   roleAccess: [RoleEnum.S2_MAHASISWA, RoleEnum.S2_KULIAH],
  // },
  // {
  //   label: "Kelas",
  //   icon: <BsBook size={16} className="text-slate-700" />,
  //   children: [
  //     {
  //       label: "Daftar Kelas",
  //       path: `/kelas/daftar-kelas?view=${RoleEnum.S2_TIM_TESIS}`,
  //       roleAccess: [RoleEnum.S2_TIM_TESIS],
  //     },
  //     {
  //       label: "Nilai Mahasiswa",
  //       path: "/kelas/input-nilai",
  //       roleAccess: [RoleEnum.S2_TIM_TESIS],
  //     },
  //   ],
  //   roleAccess: [RoleEnum.S2_TIM_TESIS],
  // },
  // {
  //   label: "Tesis",
  //   icon: <IoSchoolOutline className="text-slate-700" />,
  //   children: [
  //     { label: "Registrasi", path: "/tesis/registrasi" },
  //     { label: "Status", path: "/tesis/status" },
  //     { label: "Rekap", path: "/tesis/rekap" },
  //   ],
  // },
  {
    label: "Tugas Akhir",
    icon: <IoSchoolOutline className="text-slate-700" />,
    children: [
      {
        label: "Topik",
        path: "/daftar-topik",
        roleAccess: [
          RoleEnum.S1_MAHASISWA,
          RoleEnum.S1_PEMBIMBING,
          RoleEnum.S1_TIM_TA,
          RoleEnum.ADMIN,
        ],
      },
      // { label: "Status", path: "/tugas-akhir/status/1" },
      // { label: "Pengumuman", path: "/tugas-akhir/pengumuman" },
      // { label: "Penjadwalan", path: "/tugas-akhir/penjadwalan" },
    ],
    roleAccess: [
      RoleEnum.S1_MAHASISWA,
      RoleEnum.S1_TIM_TA,
      RoleEnum.ADMIN,
      RoleEnum.TU,
      RoleEnum.S1_PENGUJI,
    ],
  },
  {
    label: "Sidang dan Seminar S2",
    icon: <IoSchoolOutline className="text-slate-700" />,
    children: [
      {
        label: "Rekap Pendaftaran",
        path: "/rekap-pendaftaran-tim-tesis",
        roleAccess: [RoleEnum.S2_TIM_TESIS, RoleEnum.ADMIN],
      },
      {
        label: "Rekap Pendaftaran",
        path: "/rekap-pendaftaran",
        roleAccess: [RoleEnum.S2_PEMBIMBING],
      },
    ],
    roleAccess: [RoleEnum.S2_PEMBIMBING, RoleEnum.S2_TIM_TESIS, RoleEnum.ADMIN],
  },
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
      {
        label: "Assign Kelas Mahasiswa",
        path: "/manajemen/assign-kelas/mahasiswa",
        roleAccess: [RoleEnum.ADMIN, RoleEnum.TU, RoleEnum.S2_TIM_TESIS],
      },
      {
        label: "Assign Kelas Dosen",
        path: "/manajemen/assign-kelas/dosen",
        roleAccess: [RoleEnum.ADMIN, RoleEnum.TU, RoleEnum.S2_TIM_TESIS],
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
