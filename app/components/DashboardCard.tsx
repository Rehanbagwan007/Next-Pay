import React from "react";

interface DashboardCardProps {
  title: string;
  amount: string;
  icon?: React.ReactNode;
  color?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, amount, icon, color }) => (
  <div className={`flex items-center p-5 rounded-xl shadow-md bg-white border ${color || ''}`}>
    <div className="mr-4 flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100">
      {icon}
    </div>
    <div>
      <div className="text-sm text-gray-500 font-medium">{title}</div>
      <div className="text-2xl font-bold text-gray-800">{amount}</div>
    </div>
  </div>
);

export default DashboardCard;
