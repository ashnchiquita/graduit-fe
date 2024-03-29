import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  AkunCreate,
  AkunDetail,
  KelolaAkun,
  LogBimbingan,
  LogBimbinganMahasiswa,
  LogSistem,
  Login,
  MainLayout,
  MhsDashboard,
  NotFound,
  Pengumuman,
  Penjadwalan,
  RegistrationRecap,
  StatusMahasiswa,
  ThesisRegistration,
  Topik,
  AccountTimTesisLayout,
  BatchUbahRole,
  KonfigurasiPeriode,
  Dashboard,
} from "./imports";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: "/login",
      element: <Login />,
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
          path: "/tesis",
          element: <Navigate to="/tesis/registrasi" replace />,
        },
        {
          path: "/tesis/registrasi",
          element: <ThesisRegistration></ThesisRegistration>,
        },
        {
          path: "/rekap-pendaftaran",
          element: <RegistrationRecap></RegistrationRecap>,
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
          path: "/tugas-akhir/status/:id",
          element: <StatusMahasiswa />,
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
