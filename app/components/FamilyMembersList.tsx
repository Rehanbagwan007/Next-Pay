import React, { useState } from "react";
import FamilyMemberCard from "./FamilyMemberCard";

const mockFamily = [
  { name: "John", cashIn: 7000, cashOut: 2000 },
  { name: "Jane", cashIn: 3000, cashOut: 1500 },
];

const FamilyMembersList: React.FC = () => {
  const [family, setFamily] = useState(mockFamily);

  // Placeholder handlers for edit/delete
  const handleEdit = (index: number) => alert(`Edit member: ${family[index].name}`);
  const handleDelete = (index: number) => alert(`Delete member: ${family[index].name}`);

  return (
    <div className="space-y-4">
      <div className="font-semibold text-lg text-blue-700 mb-2">Family Members</div>
      {family.map((m, i) => (
        <FamilyMemberCard key={i} name={m.name} cashIn={m.cashIn} cashOut={m.cashOut} onEdit={() => handleEdit(i)} onDelete={() => handleDelete(i)} />
      ))}
      <button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold">+ Add Member</button>
    </div>
  );
};

export default FamilyMembersList;
