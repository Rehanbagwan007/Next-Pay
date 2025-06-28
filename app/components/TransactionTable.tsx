

import React from "react";

const mockTransactions = [
  { id: 1, date: "2025-06-08", type: "Cash In", amount: 5000, category: "Salary", member: "John", mode: "Cash" },
  { id: 2, date: "2025-06-07", type: "Cash Out", amount: 1200, category: "Groceries", member: "Jane", mode: "Paytm" },
  { id: 3, date: "2025-06-06", type: "Cash Out", amount: 800, category: "Transport", member: "John", mode: "Online" },
  { id: 4, date: "2025-06-05", type: "Cash In", amount: 2000, category: "Freelance", member: "Jane", mode: "Cash" },
];

const TransactionTable: React.FC = () => (
  <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
    <div className="font-semibold text-lg mb-2 text-gray-700">Recent Transactions</div>
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-gray-500 border-b">
          <th className="py-2 px-2 text-left">Date</th>
          <th className="py-2 px-2 text-left">Type</th>
          <th className="py-2 px-2 text-left">Amount</th>
          <th className="py-2 px-2 text-left">Category</th>
          <th className="py-2 px-2 text-left">Member</th>
          <th className="py-2 px-2 text-left">Mode</th>
        </tr>
      </thead>
      <tbody>
        {mockTransactions.map(tx => (
          <tr key={tx.id} className="border-b hover:bg-blue-50">
            <td className="py-2 px-2">{tx.date}</td>
            <td className={`py-2 px-2 font-medium ${tx.type === 'Cash In' ? 'text-green-600' : 'text-red-500'}`}>{tx.type}</td>
            <td className="py-2 px-2">₹{tx.amount}</td>
            <td className="py-2 px-2">{tx.category}</td>
            <td className="py-2 px-2">{tx.member}</td>
            <td className="py-2 px-2">{tx.mode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TransactionTable;
