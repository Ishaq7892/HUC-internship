'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import EventCard from '@/components/EventCard';
import { toast } from 'react-hot-toast';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
  });

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
        toast.success('Successfully registered for the event!');
        fetchData();
      } else {
        toast.error(data.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingEvent(true);

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventForm),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Event created successfully');
        setEventForm({ title: '', description: '', date: '' });
        fetchData();
      } else {
        toast.error(data.error || 'Failed to create event');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setCreatingEvent(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date());
  const pastEvents = events.filter(e => new Date(e.date) < new Date());
  const registeredEventIds = registrations.map(r => r.eventId._id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {session?.user.name}!</h1>
        <p className="text-gray-600">Here's what's happening in your club.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Upcoming Events</p>
            <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">My Registrations</p>
            <p className="text-2xl font-bold text-gray-900">{registrations.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Past Events</p>
            <p className="text-2xl font-bold text-gray-900">{pastEvents.length}</p>
          </div>
        </div>
      </div>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Add Event</h2>
        <p className="text-gray-600 mb-6">Create a new event with title, description, and date.</p>

        <form onSubmit={handleCreateEvent} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Event title"
            value={eventForm.title}
            onChange={(e) => setEventForm((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <textarea
            placeholder="Event description"
            value={eventForm.description}
            onChange={(e) => setEventForm((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-28"
            required
          />
          <input
            type="datetime-local"
            value={eventForm.date}
            onChange={(e) => setEventForm((prev) => ({ ...prev, date: e.target.value }))}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            required
          />
          <button
            type="submit"
            disabled={creatingEvent}
            className="w-full sm:w-fit px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {creatingEvent ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          Upcoming Events
          <span className="ml-3 px-2.5 py-0.5 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">New</span>
        </h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                isRegistered={registeredEventIds.includes(event._id)}
                onRegister={handleRegister}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-xl border-2 border-dashed border-gray-200 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No upcoming events found.</p>
          </div>
        )}
      </section>

      {pastEvents.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                isRegistered={registeredEventIds.includes(event._id)}
                onRegister={handleRegister}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
