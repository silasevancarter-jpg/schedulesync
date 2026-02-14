import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">ScheduleSync</h1>
          <div className="space-x-4">
            <Link 
              href="/login"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            Never Miss an Appointment Again
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Automated SMS reminders that reduce no-shows by up to 80%. 
            Perfect for dentists, salons, therapists, and any appointment-based business.
          </p>
          <div className="space-x-4">
            <Link
              href="/signup"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/login"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition border-2 border-blue-600"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Automatic SMS Reminders
              </h3>
              <p className="text-gray-600">
                Send professional text reminders 24 hours before each appointment. 
                Set it and forget it.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Reduce No-Shows
              </h3>
              <p className="text-gray-600">
                Save thousands per month by keeping your calendar full. 
                No-shows cost businesses an average of $200 per missed appointment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Simple Setup
              </h3>
              <p className="text-gray-600">
                Get started in 5 minutes. No complicated integrations. 
                Just add your appointments and we'll handle the rest.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h3>
            <p className="text-xl text-gray-600 mb-12">
              One flat monthly fee. No hidden costs. Cancel anytime.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 transition">
                <h4 className="text-2xl font-bold mb-2">Starter</h4>
                <div className="text-4xl font-extrabold text-blue-600 mb-4">
                  $79<span className="text-lg text-gray-500">/mo</span>
                </div>
                <ul className="text-left space-y-3 mb-6">
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
                <Link
                  href="/signup"
                  className="block bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  Get Started
                </Link>
              </div>

              <div className="border-2 border-blue-500 rounded-xl p-8 shadow-xl relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    POPULAR
                  </span>
                </div>
                <h4 className="text-2xl font-bold mb-2">Professional</h4>
                <div className="text-4xl font-extrabold text-blue-600 mb-4">
                  $119<span className="text-lg text-gray-500">/mo</span>
                </div>
                <ul className="text-left space-y-3 mb-6">
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
                <Link
                  href="/signup"
                  className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Get Started
                </Link>
              </div>

              <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 transition">
                <h4 className="text-2xl font-bold mb-2">Business</h4>
                <div className="text-4xl font-extrabold text-blue-600 mb-4">
                  $199<span className="text-lg text-gray-500">/mo</span>
                </div>
                <ul className="text-left space-y-3 mb-6">
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
                <Link
                  href="/signup"
                  className="block bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Reduce No-Shows?
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of businesses saving time and money with ScheduleSync.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 ScheduleSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}