import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Replace with your transactional email provider (e.g., Resend, SendGrid, etc.)
async function sendEmail(to: string, subject: string, text: string) {
  // Placeholder: implement with your email provider
  console.log(`Send email to ${to}: ${subject}\n${text}`);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
  // Find all users who are not paid
  const { data: users, error } = await supabase
    .from('users')
    .select('email, business_name, payment_status')
    .not('payment_status', 'eq', 'active');
  if (error) return res.status(500).json({ error: error.message });
  for (const user of users || []) {
    if (!user.email) continue;
    await sendEmail(
      user.email,
      'Payment Reminder: ScheduleSync',
      `Hi${user.business_name ? ' ' + user.business_name : ''},\n\nYour ScheduleSync account is not active. Please log in and complete your payment to continue using the service.\n\nThank you!`
    );
  }
  res.status(200).json({ sent: (users || []).length });
}