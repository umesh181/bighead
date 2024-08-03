"use client";


import SideNav from "./side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex h-screen  ">
      <SideNav />
      <div className="flex flex-col flex-grow ">
        <main className="flex-grow p-8 overflow-auto bg-black mt-14">
          {children}
        </main>
      </div>
    </div>
  );
}