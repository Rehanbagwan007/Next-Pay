import React from "react";

// Placeholder chart using divs. Replace with Recharts later if needed.
const AnalyticsChart: React.FC = () => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center border min-h-[250px]">
    <div className="font-semibold text-lg mb-2 text-gray-700">Income Split by Category</div>
    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center text-gray-400">
      {/* Placeholder Pie Chart */}
      <span className="text-center text-gray-500">[Pie Chart]</span>
    </div>
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      <div className="flex items-center space-x-2"><span className="w-3 h-3 rounded-full bg-blue-400"></span><span className="text-sm">Salary</span></div>
      <div className="flex items-center space-x-2"><span className="w-3 h-3 rounded-full bg-purple-400"></span><span className="text-sm">Freelance</span></div>
      <div className="flex items-center space-x-2"><span className="w-3 h-3 rounded-full bg-green-400"></span><span className="text-sm">Other</span></div>
    </div>
  </div>
);

export default AnalyticsChart;
