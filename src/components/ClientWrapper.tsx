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
        <main className="min-h-screen w-full bg-slate-950 overflow-x-hidden overflow-y-auto">{children}</main>
      ) : (
        <div className="flex h-screen w-full overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden min-w-0">
            <Header />
            <main className="flex-1 overflow-y-auto bg-slate-50 p-3 sm:p-5 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      )}
    </GlobalDataProvider>
  );
}
