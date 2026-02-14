'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PricingPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);

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
  };

  const handleCheckout = async (priceId: string, planName: string) => {
    if (!user) return;
    
    setLoading(planName);

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          userId: user.id,
          email: user.email,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Start reducing no-shows today. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200 hover:border-blue-500 transition">
            <h3 className="text-2xl font-bold mb-2">Starter</h3>
            <div className="text-4xl font-extrabold text-blue-600 mb-4">
              $79<span className="text-lg text-gray-500">/mo</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Up to 100 appointments/month
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Automated SMS reminders
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Email support
              </li>
            </ul>
            <button
              onClick={() => handleCheckout('price_1T0bn3E7L2UcgVS1LYYtao7c', 'Starter')}
              disabled={loading !== null}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading === 'Starter' ? 'Loading...' : 'Choose Starter'}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-blue-500 relative transform scale-105">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                POPULAR
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Professional</h3>
            <div className="text-4xl font-extrabold text-blue-600 mb-4">
              $119<span className="text-lg text-gray-500">/mo</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Up to 300 appointments/month
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Automated SMS reminders
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Priority support
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Custom message templates
              </li>
            </ul>
            <button
              onClick={() => handleCheckout('price_1T0bnQE7L2UcgVS1NOSbyoS3', 'Professional')}
              disabled={loading !== null}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading === 'Professional' ? 'Loading...' : 'Choose Professional'}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200 hover:border-blue-500 transition">
            <h3 className="text-2xl font-bold mb-2">Business</h3>
            <div className="text-4xl font-extrabold text-blue-600 mb-4">
              $199<span className="text-lg text-gray-500">/mo</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Unlimited appointments
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Automated SMS reminders
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                24/7 phone support
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Multi-location support
              </li>
            </ul>
            <button
              onClick={() => handleCheckout('price_1T0bnqE7L2UcgVS1OA1SQ9Lv', 'Business')}
              disabled={loading !== null}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading === 'Business' ? 'Loading...' : 'Choose Business'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}