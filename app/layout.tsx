import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScheduleSync - Automated Appointment Reminders",
  description: "Reduce no-shows with automated SMS reminders for your business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}