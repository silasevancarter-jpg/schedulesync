'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/login');
      return;
    }

    setUser(user);
    loadAppointments(user.id);
  };

  const loadAppointments = async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('user_id', userId)
      .order('appointment_time', { ascending: true });

    if (!error && data) {
      setAppointments(data);
    }
    setLoading(false);
  };

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();

    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);

    const { error } = await supabase
      .from('appointments')
      .insert([
        {
          user_id: user.id,
          customer_name: customerName,
          customer_phone: customerPhone,
          appointment_time: appointmentDateTime.toISOString(),
          notes: notes,
          status: 'scheduled',
        },
      ]);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      setCustomerName('');
      setCustomerPhone('');
      setAppointmentDate('');
      setAppointmentTime('');
      setNotes('');
      setShowAddForm(false);
      loadAppointments(user.id);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ScheduleSync Dashboard</h1>
          <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">
            Log Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            {showAddForm ? 'Cancel' : '+ Add Appointment'}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">New Appointment</h2>
            <form onSubmit={handleAddAppointment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Customer Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="+15551234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                />
              </div>

              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Save Appointment
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
          </div>

          {appointments.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              No appointments yet. Click Add Appointment to get started!
            </div>
          ) : (
            <div className="divide-y">
              {appointments.map((apt) => (
                <div key={apt.id} className="px-6 py-4">
                  <h3 className="font-semibold text-lg">{apt.customer_name}</h3>
                  <p className="text-gray-600">{apt.customer_phone}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(apt.appointment_time), 'PPpp')}
                  </p>
                  {apt.notes && <p className="text-sm text-gray-600 mt-2">{apt.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}