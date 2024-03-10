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
