'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Plus, Calendar, Edit2, Trash2, Users, Search, Download } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { formatDate } from '@/lib/utils';
import DashboardLayout from '@/app/dashboard/layout.tsx';

export default function AdminPanel() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingEvent ? 'PUT' : 'POST';
    const url = editingEvent ? `/api/events/${editingEvent._id}` : '/api/events';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(`Event ${editingEvent ? 'updated' : 'created'} successfully`);
        setShowModal(false);
        setEditingEvent(null);
        setFormData({ title: '', description: '', date: '' });
        fetchEvents();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to save event');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Event deleted');
        fetchEvents();
      } else {
        toast.error('Failed to delete event');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().slice(0, 16),
    });
    setShowModal(true);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Control Center</h1>
            <p className="text-gray-600">Manage club events and monitor activities.</p>
          </div>
          <button
            onClick={() => {
              setEditingEvent(null);
              setFormData({ title: '', description: '', date: '' });
              setShowModal(true);
            }}
            className="flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-md active:scale-95"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Event
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-bold">Event Details</th>
                  <th className="px-6 py-4 font-bold">Date & Time</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-bold text-base">{event.title}</span>
                        <span className="text-gray-500 line-clamp-1 mt-1">{event.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {formatDate(event.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        new Date(event.date) >= new Date() 
                          ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}>
                        {new Date(event.date) >= new Date() ? 'Upcoming' : 'Past'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit Event"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete Event"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h3 className="text-xl font-bold text-gray-900">{editingEvent ? 'Edit Event' : 'Create New Event'}</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="e.g. AI Workshop 2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-32 resize-none"
                    placeholder="Describe your event..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    {editingEvent ? 'Save Changes' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
