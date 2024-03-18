import { lazy } from "react";

export const ThesisRegistration = lazy(
  () => import("../pages/thesis/registration/ThesisRegistration.tsx"),
);
export const RegistrationRecap = lazy(
  () => import("../pages/thesis/registration-recap/RegistrationRecap.tsx"),
);
export const MhsDashboard = lazy(
  () => import("../pages/thesis/dashboard-mhs/MhsDashboard.tsx"),
);

export const NotFound = lazy(() => import("../pages/not-found/NotFound.tsx"));
export const MainLayout = lazy(() => import("../layouts/MainLayout.tsx"));

export const Login = lazy(() => import("../pages/login/Login.tsx"));

export const KelolaAkun = lazy(
  () => import("../pages/manajemen-akun/kelola-akun/KelolaAkun.tsx"),
);
export const AkunCreate = lazy(
  () => import("../pages/manajemen-akun/akun-create/AkunCreate.tsx"),
);
export const AkunDetail = lazy(
  () => import("../pages/manajemen-akun/akun-detail/AkunDetail.tsx"),
);

export const LogBimbingan = lazy(
  () => import("../pages/log/bimbingan/LogBimbingan.tsx"),
);
export const LogBimbinganMahasiswa = lazy(
  () => import("../pages/log/bimbingan-mahasiswa/LogBimbinganMahasiswa.tsx"),
);
export const LogSistem = lazy(
  () => import("../pages/log/sistem/LogSistem.tsx"),
);

export const StatusMahasiswa = lazy(
  () => import("../pages/tugas-akhir/status-mahasiswa/StatusMahasiswa.tsx"),
);
export const Topik = lazy(() => import("../pages/tugas-akhir/topik/Topik.tsx"));
export const Pengumuman = lazy(
  () => import("../pages/tugas-akhir/pengumuman/Pengumuman.tsx"),
);
export const Penjadwalan = lazy(
  () => import("../pages/tugas-akhir/penjadwalan/Penjadwalan.tsx"),
);
export const AccountTimTesisLayout = lazy(
  () => import("../layouts/AccountTimTesisLayout.tsx"),
);

export const BatchUbahRole = lazy(
  () => import("../pages/manajemen-akun/batch-ubah-role/BatchUbahRole.tsx"),
);
export const KonfigurasiPeriode = lazy(
  () => import("../pages/tim-tesis/konfigurasi-periode/KonfigurasiPeriode.tsx"),
);
