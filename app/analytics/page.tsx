"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Placeholder for chart, you can replace with Recharts or similar later
const mockData = [
  { category: "Salary", value: 6000, color: "bg-blue-400" },
  { category: "Freelance", value: 2500, color: "bg-purple-400" },
  { category: "Other", value: 1000, color: "bg-green-400" },
];

const AnalyticsPage: React.FC = () => {
  const total = mockData.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl border-0 bg-white dark:bg-card transition-all">
        <CardHeader>
          <CardTitle className="text-blue-700 dark:text-blue-300 text-2xl">Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Replace with a real chart in the future */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-800 flex items-center justify-center text-gray-400 dark:text-gray-600 shadow-inner">
              <span className="text-center text-gray-500 dark:text-gray-400">[Pie Chart]</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {mockData.map((d) => (
                <div key={d.category} className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${d.color}`}></span>
                  <span className="text-sm text-gray-700 dark:text-gray-200">{d.category}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">₹{d.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-lg font-bold text-blue-700 dark:text-blue-300">Total: ₹{total}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
