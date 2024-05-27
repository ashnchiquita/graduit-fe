import AddLogBimbingan from "@/pages/mahasiswa/add-log-bimbingan/AddLogBimbingan";
import DetailSidsem from "@/pages/mahasiswa/detail-sidsem/DetailSidsem";
import RegistrationSidSem from "@/pages/mahasiswa/registration-sidsem/RegistrationSidSem";
import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  AccountTimTesisLayout,
  AkunCreate,
  AkunDetail,
  ApprovalPendaftaran,
  BatchUbahRole,
  DaftarPengajuan,
  DaftarTopik,
  Dashboard,
  DashboardRegistrasi,
  DetailMahasiswa,
  DetailPengajuan,
  DetailRekapPendaftaran,
  InputNilai,
  KelolaAkun,
  KonfigurasiPeriode,
  LogBimbinganMahasiswa,
  LogMahasiswa,
  Login,
  MainLayout,
  MhsDashboard,
  NotFound,
  ProfileDosbim,
  Registration,
  RekapPendaftaranDosbim,
  RekapPendaftaranTimTesis,
  RiwayatPendaftaran,
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
          path: "/detail-mahasiswa/:nim",
          element: <DetailMahasiswa />,
        },
        {
          path: "/rekap-pendaftaran",
          element: <RekapPendaftaranDosbim />,
        },
        {
          path: "/rekap-pendaftaran-tim-tesis",
          element: <RekapPendaftaranTimTesis />,
        },
        {
          path: "/rekap-pendaftaran-tim-tesis/:nim",
          element: <RiwayatPendaftaran />,
        },
        {
          path: "/pengajuan-sidsem",
          element: <ApprovalPendaftaran />,
        },
        {
          path: "/rekap-pendaftaran/:strata/:mahasiswaId",
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
          path: "/daftar-topik",
          element: <DaftarTopik />,
        },
        {
          path: "/dashboard-registrasi",
          element: <DashboardRegistrasi></DashboardRegistrasi>,
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
          path: "/pengajuan-sidsem/detail",
          element: <DetailPengajuan />,
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
          path: "/log/bimbingan",
          element: <LogMahasiswa />,
        },
        {
          path: "/add-log-bimbingan",
          element: <AddLogBimbingan />,
        },
        {
          path: "/dosen/bimbingan/:strata/:id",
          element: <LogBimbinganMahasiswa />,
        },
        {
          path: "/manajemen/periode-pendidikan",
          element: <KonfigurasiPeriode />,
        },
        {
          path: "/kelas/input-nilai",
          element: <InputNilai />,
        },
        {
          path: "/registration/:tipe/:strata",
          element: <RegistrationSidSem />,
        },
        {
          path: "/detail/:tipe/:strata",
          element: <DetailSidsem />,
        },
        {
          path: "/profile",
          element: <ProfileDosbim />,
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
