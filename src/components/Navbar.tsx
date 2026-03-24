'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="/" className="flex ml-2 md:mr-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-blue-600">ClubSync</span>
            </Link>
          </div>
          <div className="flex items-center">
            {session ? (
              <div className="flex items-center ml-3">
                <div className="flex items-center mr-4">
                  <UserIcon className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{session.user.name}</span>
                  <span className="ml-2 px-2 py-0.5 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                    {session.user.role}
                  </span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="flex items-center text-gray-700 hover:text-red-600 font-medium text-sm"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">Login</Link>
                <Link href="/register" className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
