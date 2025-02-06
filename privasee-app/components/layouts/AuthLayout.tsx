"use client";

import DashboardNavbar from "@/components/dashboardNavbar";
import { ReactNode, useState, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function AuthLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { status } = useSession()
  const router = useRouter()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);



  return (
    <main className="flex w-full md:py-1 md:pr-1 flex-col md:flex-row layout">
      <div
        className={`${sidebarOpen ? "block" : "hidden"
          } md:block md:w-64 fixed inset-0 md:relative z-50 transition-all transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 p-4 rounded-lg md:flex-shrink-0`}
      >
        <DashboardNavbar closeSidebar={toggleSidebar} />
      </div>
      <div
        className={`${sidebarOpen ? "block" : "hidden"
          } fixed inset-0 bg-black z-40 md:hidden`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`flex-1 bg-white rounded-lg ${sidebarOpen ? "md:w-full" : "md:w-auto"
          } transition-all duration-300`}
      >
        <div className="p-3 md:hidden flex justify-between bg-black">
          <Image alt="privasee-logo" src={"/images/privaseegroup_logo.jpeg"} width={60} height={60} />
          <button
            onClick={toggleSidebar}
            className="text-white p-2 rounded-lg"
          >
            <MdMenu size={40} />
          </button>
        </div>

        <div
          className={`transition-opacity duration-300 ${sidebarOpen ? "opacity-50" : "opacity-100"
            }`}
        >
          {children}
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;
