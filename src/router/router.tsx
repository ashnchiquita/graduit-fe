import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  AccountTimTesisLayout,
  AkunCreate,
  AkunDetail,
  BatchUbahRole,
  DaftarPengajuan,
  DaftarTopikTimTugas,
  Dashboard,
  DetailRekapPendaftaran,
  KelolaAkun,
  KonfigurasiPeriode,
  LogBimbingan,
  LogBimbinganMahasiswa,
  LogSistem,
  Login,
  MainLayout,
  MhsDashboard,
  NotFound,
  Pengumuman,
  Penjadwalan,
  Registration,
  RekapPendaftaranDosbim,
  Topik,
} from "./imports";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<LoaderIcon />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/timtesis",
      element: <AccountTimTesisLayout />,
      children: [],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/rekap-pendaftaran",
          element: <RekapPendaftaranDosbim />,
        },
        {
          path: "/rekap-pendaftaran/:nim",
          element: <DetailRekapPendaftaran />,
        },
        {
          path: "/daftar-pengajuan",
          element: <DaftarPengajuan></DaftarPengajuan>,
        },
        {
          path: "/registrasi",
          element: <Registration></Registration>,
        },
        {
          path: "/tesis",
          element: <Navigate to="/tesis/registrasi" replace />,
        },
        {
          path: "/tesis/registrasi",
          element: <Registration></Registration>,
        },

        {
          path: "/tesis/status",
          element: <MhsDashboard />,
        },
        {
          path: "/tugas",
          element: <Navigate to="/tugas/kelas" replace />,
        },
        {
          path: "/tugas/kelas",
          element: <></>,
        },
        {
          path: "/tugas/logbook",
          element: <></>,
        },
        {
          path: "/informasi",
          element: <Navigate to="/informasi/seminar" replace />,
        },
        {
          path: "/informasi/seminar",
          element: <></>,
        },
        {
          path: "/informasi/pengujian",
          element: <></>,
        },
        {
          path: "/manajemen",
          element: <Navigate to="/manajemen/kelola-akun" replace />,
        },
        {
          path: "/manajemen/kelola-akun",
          element: <KelolaAkun />,
        },
        {
          path: "/manajemen/kelola-akun/:id",
          element: <AkunDetail />,
        },
        {
          path: "/manajemen/tambah-akun",
          element: <AkunCreate />,
        },
        {
          path: "/manajemen/role-pengguna",
          element: <BatchUbahRole />,
        },
        {
          path: "/manajemen/daftar-topik",
          element: <DaftarTopikTimTugas />,
        },
        {
          path: "/log",
          element: <Navigate to="/log/bimbingan" replace />,
        },
        {
          path: "/log/bimbingan",
          element: <LogBimbingan />,
        },
        {
          path: "/dosen/bimbingan/:strata/:id",
          element: <LogBimbinganMahasiswa />,
        },
        {
          path: "/log/sistem",
          element: <LogSistem></LogSistem>,
        },
        {
          path: "/tugas-akhir",
          element: <Navigate to="/tugas-akhir/topik/2" replace />,
        },
        {
          path: "/tugas-akhir/topik/:role",
          element: <Topik />,
        },
        {
          path: "/tugas-akhir/pengumuman",
          element: <Pengumuman />,
        },
        {
          path: "/tugas-akhir/penjadwalan",
          element: <Penjadwalan />,
        },
        {
          path: "/manajemen/periode-pendidikan",
          element: <KonfigurasiPeriode />,
        },
      ],
    },
    {
      path: "/not-found",
      element: (
        <Suspense fallback={<LoaderIcon />}>
          <NotFound />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/not-found" replace />,
    },
  ],
  { basename: import.meta.env.VITE_BASE_PATH },
);
