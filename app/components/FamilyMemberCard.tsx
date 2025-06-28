import React from "react";

interface FamilyMemberCardProps {
  name: string;
  cashIn: number;
  cashOut: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({ name, cashIn, cashOut, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-start border">
    <div className="flex items-center w-full justify-between mb-2">
      <span className="font-semibold text-blue-700 text-lg">{name}</span>
      <div className="space-x-2">
        <button onClick={onEdit} className="text-xs text-blue-500 hover:underline">Edit</button>
        <button onClick={onDelete} className="text-xs text-red-500 hover:underline">Delete</button>
      </div>
    </div>
    <div className="flex space-x-6 mt-2">
      <div className="text-green-600 font-medium text-sm">Cash In: ₹{cashIn}</div>
      <div className="text-red-500 font-medium text-sm">Cash Out: ₹{cashOut}</div>
    </div>
  </div>
);

export default FamilyMemberCard;
