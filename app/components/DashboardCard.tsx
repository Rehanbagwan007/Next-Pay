import React from "react";

interface DashboardCardProps {
  title: string;
  amount: string;
  icon?: React.ReactNode;
  color?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, amount, icon, color }) => (
  <div
    className={`flex items-center p-5 rounded-2xl shadow-xl bg-white dark:bg-card border ${color || ''} transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl`}
    style={{ minHeight: 100 }}
  >
    <div className="mr-4 flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-800">
      {icon}
    </div>
    <div>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">{title}</div>
      <div className="text-2xl font-bold text-gray-800 dark:text-white">{amount}</div>
    </div>
  </div>
);

export default DashboardCard;
