import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';


import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BUSINESS_HOURS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

// You need to pass business_id to this function
async function fetchAvailableTimes(date: string, business_id?: string): Promise<string[]> {
  const start = new Date(date + 'T00:00:00');
  const end = new Date(date + 'T23:59:59');
  let query = supabase
    .from('appointments')
    .select('appointment_time')
    .gte('appointment_time', start.toISOString())
    .lte('appointment_time', end.toISOString());
  if (business_id) {
    query = query.eq('business_id', business_id);
  }
  const { data, error } = await query;
  if (error) {
    return BUSINESS_HOURS;
  }
  const bookedTimes = (data || []).map((apt: any) => {
    const d = new Date(apt.appointment_time);
    return d.toISOString().slice(11, 16); // 'HH:MM'
  });
  return BUSINESS_HOURS.filter(time => !bookedTimes.includes(time));
}


// You need to pass business_id to this function (e.g., from the business user's id)
async function saveAppointment(data: any, business_id?: string) {
  const { name, email, date, time } = data;
  const appointmentDateTime = new Date(`${date}T${time}`);
  const { error } = await supabase.from('appointments').insert([
    {
      customer_name: name,
      customer_email: email,
      appointment_time: appointmentDateTime.toISOString(),
      status: 'scheduled',
      business_id: business_id,
    },
  ]);
  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}


// For demo: get business_id from query param (?business=BUSINESS_ID) or hardcode for now

// No payment check here: customers can always book
import { useSearchParams } from 'next/navigation';

const BookingPage: React.FC = () => {
  const searchParams = useSearchParams();
  // In production, you might use subdomain, login, or a more secure method
  const business_id = searchParams.get('business') || process.env.NEXT_PUBLIC_DEFAULT_BUSINESS_ID;

  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedDate && business_id) {
      fetchAvailableTimes(selectedDate, business_id).then(setAvailableTimes);
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate, business_id]);

  const handleFormSubmit = async (data: any) => {
    setError('');
    const result = await saveAppointment(data, business_id);
    if (result.success) {
      setSuccess(true);
    } else {
      setError('Failed to book appointment.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        {success ? (
          <div className="p-6 bg-green-100 rounded shadow text-green-800">Appointment booked successfully!</div>
        ) : (
          <>
            <BookingForm
              onSubmit={handleFormSubmit}
              availableTimes={availableTimes}
            />
            {error && <div className="mt-4 text-red-600">{error}</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
