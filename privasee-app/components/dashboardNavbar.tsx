"use client";

import React from "react";
import { MdClose, MdDashboard, MdLightbulb, MdLogout } from "react-icons/md"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";


function DashboardNavbar({ closeSidebar }) {
  const { data } = useSession()


  const handleLogout = async () => {
    await toast.promise(
      signOut,
      {
        loading: 'Loading',
        success: () => `Logout successful!`,
        error: (err) => `Something went wrong: ${err.toString()}`,
      },
      {
        success: {
          duration: 5000,
        },
      }
    )
  }

  return (
    <div className="flex flex-col justify-between h-screen p-4">
      <div className="flex flex-col items-center">
        <div className="w-full flex md:justify-center sm:justify-between">
          <Image alt="privasee-logo" src={"/images/privaseegroup_logo.jpeg"} width={60} height={60} />
          <MdClose className="md:hidden" onClick={closeSidebar} color={"white"} size={40} />
        </div>
        <nav className="my-5">
          <NavItem link={""} icon={<MdDashboard color="white" className="text-xl" />} label="Dashboard" />
          <NavItem link={"questions"} icon={<MdLightbulb color="white" className="text-xl" />} label="Questions" />
        </nav>
      </div>
      <button className="mb-7 bg-white rounded-full border border-gray-200 text-gray-800 px-4 py-2 flex items-center space-x-2 hover:bg-gray-200">
        <Image
          className="rounded-full"
          src={data?.user?.image || '/images/user.jpg'}
          alt="User profile"
          width={50} height={50}
        />
        <span onClick={handleLogout}>Logout</span>
        <MdLogout />
      </button>
    </div>
  );
}

const NavItem = ({ icon, label, link }) => (
  <Link href={`/dashboard/${link}`}>
    <div className="mb-2 cursor-pointer rounded-full py-2 px-4 flex items-center text-white space-x-2">
      {icon}
      <span>{label}</span>
    </div>
  </Link>
);

export default DashboardNavbar;
