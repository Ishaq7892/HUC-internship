import Link from 'next/link';
import { Calendar, Users, Shield, ArrowRight, Zap, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-black text-blue-600 tracking-tight">ClubSync</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">Features</Link>
              <Link href="#about" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">About</Link>
              <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
              <Link 
                href="/register" 
                className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 active:scale-95"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-8 animate-bounce">
            <Star className="w-4 h-4 text-blue-600 fill-blue-600" />
            <span className="text-sm font-bold text-blue-700">New: Event Management Tools</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-8 tracking-tighter">
            The Ultimate Hub for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Student Tech Clubs</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            ClubSync empowers student organizations to manage events, track memberships, 
            and foster community engagement seamlessly in one unified platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/register" 
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-black hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-200 transition-all duration-300 flex items-center justify-center group"
            >
              Start for Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/login" 
              className="w-full sm:w-auto bg-white border-2 border-gray-100 text-gray-900 px-8 py-4 rounded-2xl text-lg font-black hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center justify-center"
            >
              Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-3">Core Features</h2>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Everything you need to scale</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors">
                <Calendar className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-4">Event Management</h4>
              <p className="text-gray-600 font-medium leading-relaxed">Create, schedule, and promote club events with ease. Manage RSVPs and registrations in real-time.</p>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 transition-colors">
                <Users className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-4">Member Portal</h4>
              <p className="text-gray-600 font-medium leading-relaxed">A personalized dashboard for every student to track their activity, points, and upcoming club meetings.</p>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-600 transition-colors">
                <Shield className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-black text-gray-900 mb-4">Admin Controls</h4>
              <p className="text-gray-600 font-medium leading-relaxed">Powerful moderation tools for club leads. Manage user roles, approve registrations, and view analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 font-bold mb-4">© 2026 ClubSync. Built for students, by students.</p>
          <div className="flex justify-center space-x-6">
            <Link href="#" className="text-sm font-bold text-gray-500 hover:text-blue-600">Privacy Policy</Link>
            <Link href="#" className="text-sm font-bold text-gray-500 hover:text-blue-600">Terms of Service</Link>
            <Link href="#" className="text-sm font-bold text-gray-500 hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
