import React, { useState, useEffect } from 'react';

interface BookingFormProps {
  onSubmit: (data: BookingData) => void;
  availableTimes: string[];
}

interface BookingData {
  name: string;
  email: string;
  date: string;
  time: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, availableTimes }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, date, time });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Book an Appointment</h2>
      <label className="block mb-2">
        Name
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full border rounded px-2 py-1 mt-1"
        />
      </label>
      <label className="block mb-2">
        Email
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full border rounded px-2 py-1 mt-1"
        />
      </label>
      <label className="block mb-2">
        Date
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          className="w-full border rounded px-2 py-1 mt-1"
        />
      </label>
      <label className="block mb-2">
        Time
        <select
          value={time}
          onChange={e => setTime(e.target.value)}
          required
          className="w-full border rounded px-2 py-1 mt-1"
        >
          <option value="">Select a time</option>
          {availableTimes.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded mt-4">Book</button>
    </form>
  );
};

export default BookingForm;
