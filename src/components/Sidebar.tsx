'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Users, Settings, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['Student', 'Admin'],
  },
  {
    name: 'Events',
    href: '/dashboard/events',
    icon: Calendar,
    roles: ['Student', 'Admin'],
  },
  {
    name: 'My Registrations',
    href: '/dashboard/registrations',
    icon: Users,
    roles: ['Student'],
  },
  {
    name: 'Admin Panel',
    href: '/admin',
    icon: Settings,
    roles: ['Admin'],
  },
];

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session) return null;

  return (
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-20 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          {sidebarItems
            .filter((item) => item.roles.includes(session.user.role))
            .map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center p-2 text-gray-900 rounded-lg group transition-all duration-200",
                      isActive 
                        ? "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-200" 
                        : "hover:bg-gray-100 text-gray-700"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 transition duration-75",
                      isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-900"
                    )} />
                    <span className="flex-1 ml-3 whitespace-nowrap">{item.name}</span>
                    {isActive && <ChevronRight className="w-4 h-4 text-blue-600" />}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </aside>
  );
}
