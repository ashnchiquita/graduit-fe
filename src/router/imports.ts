import { lazy } from "react";

export const ThesisRegistration = lazy(
  () => import("../pages/thesis/registration/ThesisRegistration.tsx"),
);
export const RegistrationRecap = lazy(
  () => import("../pages/dosen/rekap-pendaftaran/RegistrationRecap.tsx"),
);
export const MhsDashboard = lazy(
  () => import("../pages/thesis/dashboard-mhs/MhsDashboard.tsx"),
);

export const NotFound = lazy(() => import("../pages/not-found/NotFound.tsx"));
export const MainLayout = lazy(() => import("../layouts/MainLayout.tsx"));

export const Login = lazy(() => import("../pages/login/Login.tsx"));

export const KelolaAkun = lazy(
  () => import("../pages/admin/kelola-akun/KelolaAkun.tsx"),
);
export const AkunCreate = lazy(
  () => import("../pages/admin/akun-create/AkunCreate.tsx"),
);
export const AkunDetail = lazy(
  () => import("../pages/admin/akun-detail/AkunDetail.tsx"),
);

export const LogBimbingan = lazy(
  () => import("../pages/archive/log/bimbingan/LogBimbingan.tsx"),
);
export const LogBimbinganMahasiswa = lazy(
  () => import("../pages/dosen/bimbingan-mahasiswa/LogBimbinganMahasiswa.tsx"),
);
export const LogSistem = lazy(
  () => import("../pages/archive/log/sistem/LogSistem.tsx"),
);

export const DaftarPengajuan = lazy(
  () => import("../pages/mahasiswa/daftar-pengajuan/DaftarPengajuan.tsx"),
);
export const Topik = lazy(() => import("../pages/tugas-akhir/topik/Topik.tsx"));
export const Pengumuman = lazy(
  () => import("../pages/archive/pengumuman/Pengumuman.tsx"),
);
export const Penjadwalan = lazy(
  () => import("../pages/archive/penjadwalan/Penjadwalan.tsx"),
);
export const AccountTimTesisLayout = lazy(
  () => import("../layouts/AccountTimTesisLayout.tsx"),
);

export const BatchUbahRole = lazy(
  () => import("../pages/admin/batch-ubah-role/BatchUbahRole.tsx"),
);
export const KonfigurasiPeriode = lazy(
  () => import("../pages/admin/konfigurasi-periode/KonfigurasiPeriode.tsx"),
);

export const Dashboard = lazy(() => import("../pages/dashboard/Dashboard.tsx"));
