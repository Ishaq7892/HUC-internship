'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import EventCard from '@/components/EventCard';
import { toast } from 'react-hot-toast';
import { Calendar, CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';

export default function RegistrationsPage() {
  const { data: session } = useSession();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch('/api/registrations');
      const data = await res.json();
      setRegistrations(data);
    } catch (error) {
      toast.error('Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Registrations</h1>
        <p className="text-gray-600">Manage and view the events you've registered for.</p>
      </div>

      {registrations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrations.map((reg) => (
            <EventCard
              key={reg._id}
              event={reg.eventId}
              isRegistered={true}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-xl border-2 border-dashed border-gray-200 text-center max-w-2xl mx-auto mt-10">
          <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No registrations yet</h3>
          <p className="text-gray-500 mb-6">You haven't registered for any events. Browse the events page to find something interesting!</p>
          <Link 
            href="/dashboard/events" 
            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-md active:scale-95"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Explore Events
          </Link>
        </div>
      )}
    </div>
  );
}
