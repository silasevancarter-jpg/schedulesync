-- Add a payment_status column to users table
ALTER TABLE users ADD COLUMN payment_status text DEFAULT 'unpaid';
-- Possible values: 'unpaid', 'active', 'past_due', 'canceled'
