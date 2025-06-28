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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-blue-700 text-2xl">Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Pie Chart Placeholder */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center text-gray-400">
                <span className="text-center text-gray-500">[Pie Chart]</span>
              </div>
              {/* Legend */}
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
                {/* You can add SVG pie chart here later */}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              {mockData.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`w-4 h-4 rounded-full ${d.color}`}></span>
                  <span className="font-medium text-gray-700">{d.category}</span>
                  <span className="ml-auto font-semibold text-blue-700">₹{d.value}</span>
                  <span className="ml-2 text-gray-500 text-sm">{((d.value / total) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
