import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import twilio from 'twilio';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function GET(request: Request) {
  // Security: Check for cron secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const bufferStart = new Date(tomorrow.getTime() - 30 * 60 * 1000);
    const bufferEnd = new Date(tomorrow.getTime() + 30 * 60 * 1000);

    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*')
      .gte('appointment_time', bufferStart.toISOString())
      .lte('appointment_time', bufferEnd.toISOString())
      .eq('status', 'scheduled');

    if (error) throw error;

    if (!appointments || appointments.length === 0) {
      return NextResponse.json({ 
        message: 'No appointments to remind',
        count: 0 
      });
    }

    const appointmentIds = appointments.map(apt => apt.id);
    const { data: existingReminders } = await supabase
      .from('reminders')
      .select('appointment_id')
      .in('appointment_id', appointmentIds);

    const remindedIds = new Set(existingReminders?.map(r => r.appointment_id) || []);
    const appointmentsToRemind = appointments.filter(apt => !remindedIds.has(apt.id));

    const results = [];

    for (const appointment of appointmentsToRemind) {
      try {
        const appointmentDate = new Date(appointment.appointment_time);
        const formattedTime = appointmentDate.toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });

        const message = await twilioClient.messages.create({
          body: `Hi ${appointment.customer_name}! This is a reminder that you have an appointment tomorrow at ${formattedTime}. See you soon!`,
          from: process.env.TWILIO_PHONE_NUMBER!,
          to: appointment.customer_phone,
        });

        await supabase.from('reminders').insert([
          {
            appointment_id: appointment.id,
            status: 'sent',
            twilio_sid: message.sid,
          },
        ]);

        results.push({
          appointment_id: appointment.id,
          customer: appointment.customer_name,
          status: 'sent',
          sid: message.sid,
        });
      } catch (err: any) {
        results.push({
          appointment_id: appointment.id,
          customer: appointment.customer_name,
          status: 'failed',
          error: err.message,
        });
      }
    }

    return NextResponse.json({
      message: 'Reminders processed',
      count: results.length,
      results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

3. **Save** (Ctrl + S)

---

### **Step 3: Add the Secret to .env.local**

1. **Open** `.env.local`
2. **Add this line at the bottom**:
```
CRON_SECRET=your-super-secret-key-12345