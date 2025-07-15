"use client";

import { BookSidebar } from "../components/BookSidebar";
import DefaultDashboard from "../components/DefualtDashboard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gray-50 dark:bg-[#18181b]">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 md:h-screen border-r bg-white dark:bg-card shadow-md md:sticky top-0 z-10">
        <BookSidebar />
      </aside>
      {/* Main Dashboard */}
      <main className="flex-1 min-h-screen p-2 md:p-6 overflow-x-auto">
        <DefaultDashboard />
      </main>
    </div>
  );
} 