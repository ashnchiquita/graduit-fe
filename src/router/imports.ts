import { lazy } from "react";

export const Registration = lazy(
  () => import("../pages/mahasiswa/registration/Registration.tsx"),
);
export const DetailRekapPendaftaran = lazy(
  () =>
    import(
      "../pages/dosen/detail-rekap-pendaftaran/DetailRekapPendaftaran.tsx"
    ),
);
export const MhsDashboard = lazy(
  () => import("../pages/archive/dashboard-mhs/MhsDashboard.tsx"),
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
export const Topik = lazy(() => import("../pages/archive/topik/Topik.tsx"));
export const Pengumuman = lazy(
  () => import("../pages/archive/pengumuman/Pengumuman.tsx"),
);
export const Penjadwalan = lazy(
  () => import("../pages/archive/penjadwalan/Penjadwalan.tsx"),
);
export const AccountTimTesisLayout = lazy(
  () => import("../layouts/AccountTimTesisLayout.tsx"),
);

export const LogMahasiswa = lazy(
  () => import("../pages/mahasiswa/log/LogMahasiswa.tsx"),
);

export const BatchUbahRole = lazy(
  () => import("../pages/admin/batch-ubah-role/BatchUbahRole.tsx"),
);
export const KonfigurasiPeriode = lazy(
  () => import("../pages/admin/konfigurasi-periode/KonfigurasiPeriode.tsx"),
);

export const Dashboard = lazy(() => import("../pages/dashboard/Dashboard.tsx"));

export const RekapPendaftaranDosbim = lazy(
  () => import("../pages/dosen/rekap-pendaftaran/RekapPendaftaranDosbim.tsx"),
);

export const DaftarTopik = lazy(
  () => import("../pages/daftar-topik/DaftarTopik.tsx"),
);

export const InputNilai = lazy(
  () => import("../pages/admin/input-nilai/InputNilai.tsx"),
);
export const RekapPendaftaranTimTesis = lazy(
  () =>
    import("../pages/tim-tesis/rekap-pendaftaran/RekapPendaftaranTimTesis.tsx"),
);
export const RiwayatPendaftaran = lazy(
  () => import("../pages/tim-tesis/riwayat-pendaftaran/RiwayatPendaftaran.tsx"),
);

export const ApprovalPendaftaran = lazy(
  () =>
    import(
      "../pages/tim-tesis/approval-pendaftaran/ApprovalPendaftaranTimTesis.tsx"
    ),
);
export const DetailMahasiswa = lazy(
  () => import("../pages/admin/detail-mahasiswa/DetailMahasiswa.tsx"),
);
export const DashboardRegistrasi = lazy(
  () =>
    import("../pages/mahasiswa/dashboard-registrasi/DashboardRegistrasi.tsx"),
);
export const ProfileDosbim = lazy(
  () => import("../pages/dosen/profile/ProfileDosbim.tsx"),
);

export const DetailPengajuan = lazy(
  () => import("../pages/tim-tesis/detail-pengajuan/DetailPengajuan.tsx"),
)

