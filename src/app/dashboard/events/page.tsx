'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import EventCard from '@/components/EventCard';
import { toast } from 'react-hot-toast';
import { Search, Calendar, Filter, X } from 'lucide-react';

export default function EventsPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, registrationsRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/registrations'),
      ]);

      const eventsData = await eventsRes.json();
      const registrationsData = await registrationsRes.json();

      setEvents(eventsData);
      setRegistrations(registrationsData);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId: string) => {
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Successfully registered!');
        fetchData();
      } else {
        toast.error(data.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const isUpcoming = new Date(event.date) >= new Date();
    
    if (filter === 'upcoming') return matchesSearch && isUpcoming;
    if (filter === 'past') return matchesSearch && !isUpcoming;
    return matchesSearch;
  });

  const registeredEventIds = registrations.map(r => r.eventId._id);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Club Events</h1>
          <p className="text-gray-600">Explore and register for exciting upcoming activities.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          
          <div className="flex bg-white border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                filter === 'upcoming' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                filter === 'past' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Past
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                filter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All
            </button>
          </div>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              isRegistered={registeredEventIds.includes(event._id)}
              onRegister={handleRegister}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-16 rounded-xl border-2 border-dashed border-gray-200 text-center">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
}
