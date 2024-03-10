import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  AkunCreate,
  AkunDetail,
  KelolaAkun,
  Login,
  MainLayout,
  MhsDashboard,
  NotFound,
  RegistrationRecap,
  ThesisRegistration,
} from "./imports";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/tesis/registrasi" replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/tesis",
          element: <Navigate to="/tesis/registrasi" replace />,
        },
        {
          path: "/tesis/registrasi",
          element: <ThesisRegistration></ThesisRegistration>,
        },
        {
          path: "/tesis/rekap",
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
