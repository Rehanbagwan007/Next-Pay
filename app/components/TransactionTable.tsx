import { RootState } from "@/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { Delete } from "lucide-react";
import prisma from "@/lib/prisma";
import { setTransactionRefresh } from "@/store/transactionSlice";
import TransactionDetailsSheet from "./TransactionDetailsSheet";

const mockTransactions = [
  { id: 1, date: "2025-06-08", type: "Cash In", amount: 5000, category: "Salary", member: "John", mode: "Cash" },
  { id: 2, date: "2025-06-07", type: "Cash Out", amount: 1200, category: "Groceries", member: "Jane", mode: "Paytm" },
  { id: 3, date: "2025-06-06", type: "Cash Out", amount: 800, category: "Transport", member: "John", mode: "Online" },
  { id: 4, date: "2025-06-05", type: "Cash In", amount: 2000, category: "Freelance", member: "Jane", mode: "Cash" },
];

const TransactionTable: React.FC = () => { 
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const transaction = useSelector((store:RootState) => store.transaction.Transaction);
  const dispatch= useDispatch()

  function DeleteTransaction(id:string| undefined){
    if (typeof id === 'string') {
      async function transactionDelete(){
        // Delete logic here
      }
      transactionDelete()
    }
  }

  const handleTransactionClick = (tx: any) => {
    setSelectedTransaction(tx);
    setIsDetailsOpen(true);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    DeleteTransaction(transactionId);
    setIsDetailsOpen(false);
    setSelectedTransaction(null);
  };
  
  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
        <div className="font-semibold text-lg mb-2 text-gray-700">Recent Transactions</div>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 px-2 text-left">Title</th>
              <th className="py-2 px-2 text-left">Date</th>
              <th className="py-2 px-2 text-left">Type</th>
              <th className="py-2 px-2 text-left">Amount</th>
              <th className="py-2 px-2 text-left">Mode</th>
              <th className="py-2 px-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transaction?.map((tx) => (
              <tr 
                key={tx.id} 
                className="border-b hover:bg-blue-50 cursor-pointer transition-colors" 
                onClick={() => handleTransactionClick(tx)}
              >
                <td className="py-2 px-2">{tx.title}</td>
                <td className="py-2 px-2">{tx.createdAt ? String(tx.createdAt) : ""}</td>
                <td className={`py-2 px-2 font-medium ${tx.type === 'CASH_IN' ? 'text-green-600' : 'text-red-500'}`}>
                  {tx.type === 'CASH_IN' ? 'Cash In' : 'Cash Out'}
                </td>
                <td className="py-2 px-2">₹{tx.amount}</td>
                <td className="py-2 px-2">{tx.paymentMode}</td>
                <td className="py-2 px-2">
                  <button 
                    className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50" 
                    onClick={(e) => {
                      e.stopPropagation();
                      DeleteTransaction(tx.id);
                    }}
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TransactionDetailsSheet
        open={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction}
        onDelete={handleDeleteTransaction}
      />
    </>
  );
};

export default TransactionTable;
