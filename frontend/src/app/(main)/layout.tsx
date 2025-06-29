import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#ededed]">
      <Sidebar />

      <div className="flex flex-col flex-1 min-h-screen">
        <Header title="Dashboard" />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
