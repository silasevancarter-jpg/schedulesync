'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError) throw authError;
      if (authData.user) {
        const { error: dbError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email,
              business_name: businessName,
              phone,
            },
          ]);
        if (dbError) throw dbError;
      }
      setSuccess(true);
      setTimeout(() => router.push('/pricing'), 1200);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-50">
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center tracking-tight">ScheduleSync</h1>
        <h2 className="text-lg text-gray-500 mb-8 text-center font-medium">Create Your Account</h2>

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-center text-sm font-medium border border-green-100 animate-fade-in">
            Account created! Redirecting…
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-center text-sm font-medium border border-red-100 animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Business Name</label>
            <input
              type="text"
              required
              value={businessName}
              onChange={e => setBusinessName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-gray-50 transition"
              placeholder="Sunshine Dental"
              autoComplete="organization"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-gray-50 transition"
              placeholder="you@business.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-gray-50 transition"
              placeholder="••••••••"
              minLength={6}
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Phone (optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={e => {
                let value = e.target.value;
                if (value && !value.startsWith('+')) value = '+' + value;
                setPhone(value);
              }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-gray-50 transition"
              placeholder="+1 (555) 123-4567"
              autoComplete="tel"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold shadow-sm hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account…' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline font-semibold">Log In</a>
        </p>
      </div>
    </div>
  );
}