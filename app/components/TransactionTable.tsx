import { RootState } from "@/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { setTransactionRefresh } from "@/store/transactionSlice";
import TransactionDetailsSheet from "./TransactionDetailsSheet";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TransactionTable: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const transaction = useSelector((store: RootState) => store.transaction.Transaction);
  const dispatch = useDispatch();

  function DeleteTransaction(id: string | undefined) {
    if (typeof id === "string") {
      async function transactionDelete() {
        try {
          // TODO: Implement delete logic (API call)
          dispatch(setTransactionRefresh());
        } catch (err) {
          setError("Failed to delete transaction.");
        }
      }
      transactionDelete();
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

  const isLoading = !transaction || transaction.length === 0;
  const filteredTransactions = isLoading
    ? []
    : transaction?.filter(
        (tx) =>
          (tx?.title?.toLowerCase().includes(search.toLowerCase())) ||
          (tx.type && tx.type.toLowerCase().includes(search.toLowerCase())) ||
          (tx.paymentMode && tx.paymentMode.toLowerCase().includes(search.toLowerCase()))
      );

  return (
    <>
      <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-4 overflow-x-auto border transition-shadow duration-200 w-full max-w-full">
        <div className="font-semibold text-lg mb-2 text-gray-700 dark:text-white flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <span>Recent Transactions</span>
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 p-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring focus:border-blue-400 dark:bg-card dark:text-white"
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-sm">
            <thead>
              <tr className="text-gray-500 dark:text-gray-300 border-b">
                <th className="py-2 px-2 text-left">Title</th>
                <th className="py-2 px-2 text-left">Date</th>
                <th className="py-2 px-2 text-left">Type</th>
                <th className="py-2 px-2 text-left">Amount</th>
                <th className="py-2 px-2 text-left">Mode</th>
                <th className="py-2 px-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-2"><Skeleton width={80} /></td>
                    <td className="py-2 px-2"><Skeleton width={60} /></td>
                    <td className="py-2 px-2"><Skeleton width={50} /></td>
                    <td className="py-2 px-2"><Skeleton width={60} /></td>
                    <td className="py-2 px-2"><Skeleton width={60} /></td>
                    <td className="py-2 px-2"><Skeleton width={40} /></td>
                  </tr>
                ))
              ) : filteredTransactions && filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className={
                      "border-b hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer transition-colors duration-150 rounded-lg"
                    }
                    onClick={() => handleTransactionClick(tx)}
                  >
                    <td className="py-2 px-2 max-w-[120px] truncate">{tx.title}</td>
                    <td className="py-2 px-2">{tx.createdAt ? new Date(tx?.createdAt as string | Date ).toLocaleDateString() : ""}</td>
                    <td
                      className={`py-2 px-2 font-medium ${tx.type === "CASH_IN" ? "text-green-600" : "text-red-500"}`}
                    >
                      {tx.type === "CASH_IN" ? "Cash In" : "Cash Out"}
                    </td>
                    <td className="py-2 px-2">₹{tx.amount}</td>
                    <td className="py-2 px-2">{tx.paymentMode}</td>
                    <td className="py-2 px-2">
                      <button
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          DeleteTransaction(tx.id);
                        }}
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-400 dark:text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
