import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Sidebar />
      <main className="p-4 sm:ml-64 pt-20 min-h-screen">
        <div className="p-4 rounded-lg">
          {children}
        </div>
      </main>
    </div>
  );
}
