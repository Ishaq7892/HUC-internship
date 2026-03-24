'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, MapPin, User as UserIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    description: string;
    date: string;
  };
  isRegistered?: boolean;
  onRegister?: (eventId: string) => void;
  isAdmin?: boolean;
  onDelete?: (eventId: string) => void;
  onEdit?: (event: any) => void;
}

export default function EventCard({ event, isRegistered, onRegister, isAdmin, onDelete, onEdit }: EventCardProps) {
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!onRegister) return;
    setLoading(true);
    try {
      await onRegister(event._id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {event.title}
          </h3>
          {isRegistered && (
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">
              Registered
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
          {event.description}
        </p>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-500 bg-gray-50 p-2 rounded-lg">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>
        </div>
      </div>
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex gap-2">
        {isAdmin ? (
          <>
            <button
              onClick={() => onEdit && onEdit(event)}
              className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-semibold shadow-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete && onDelete(event._id)}
              className="flex-1 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-semibold shadow-sm"
            >
              Delete
            </button>
          </>
        ) : (
          <button
            onClick={handleRegister}
            disabled={isRegistered || loading}
            className={`w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm ${
              isRegistered
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:scale-[0.98]'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : isRegistered ? 'Already Registered' : 'Register Now'}
          </button>
        )}
      </div>
    </div>
  );
}
