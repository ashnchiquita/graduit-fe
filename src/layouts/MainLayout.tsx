// Library imports
import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// Local imports
// import axios from "@/config/axios-config";

// Component imports
import { Loader } from "@/components/ui/loader";
import Breadcrumb from "@/layouts/components/Breadcrumb";
import Sidebar from "@/layouts/components/Sidebar";
import TopNav from "@/layouts/components/TopNav";

const MainLayoutLoader = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader size={64} />
    </div>
  );
};

export default function MainLayout(): JSX.Element {
  // Component states
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarClosed, setSidebarClosed] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      // await axios.get("/users/session");
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {!loading ? (
        <div className="flex h-screen w-full overflow-hidden bg-slate-100">
          <Sidebar closed={sidebarClosed} />
          <div className="flex h-screen w-full flex-col overflow-y-scroll">
            <TopNav closed={sidebarClosed} setClosed={setSidebarClosed} />
            <Breadcrumb closed={sidebarClosed} setClosed={setSidebarClosed} />
            <Suspense fallback={<MainLayoutLoader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
