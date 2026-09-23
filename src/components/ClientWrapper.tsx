"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { GlobalDataProvider } from "@/context/GlobalDataContext";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  return (
    <GlobalDataProvider>
      {isLoginPage ? (
        <main className="flex-1 w-full h-screen bg-slate-950">{children}</main>
      ) : (
        <div className="flex h-screen w-full">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      )}
    </GlobalDataProvider>
  );
}
