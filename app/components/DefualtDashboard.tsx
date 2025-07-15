import { usefetchUser } from "@/hooks/usefethUser";
import { useGetBook } from "@/hooks/useGetBook";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { IoBookOutline } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { useEffect, useState } from "react";
import { getTransactionsAll } from "@/actions/get-Alltransactions";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import dayjs from "dayjs";
import { calculateProfit } from "@/actions/calcualte-profit";
import DashboardChart from "./Chart";
import DashboardCard from "./DashboardCard";
import { FaBook, FaExchangeAlt, FaWallet } from "react-icons/fa";

interface Transaction {
  id?: string;
  title?: string;
  userId?: string;
  amount?: number;
  bookId?: string;
  type?: string;
  paymentMode: string;
  note?: string;
  billurl?: string;
  createdAt?: string | Date;
}

export default function DefaultDashboard() {
  usefetchUser();
  const user = useSelector((state: RootState) => state.user.user);
  useGetBook(user[0]?.id);
  const books = useSelector((state: RootState) => state.books.books);
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
  const netbalance = user[0]?.netBalance;
  const isProfit = true;
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    async function getTransactions() {
      if (!user[0]?.id) return;
      const transactions = await getTransactionsAll(user[0]?.id);
      setTransactionsList(transactions || []);
      // Group by month and book
      const grouped: { [key: string]: { [bookId: string]: number } } = {};
      (transactions || []).forEach((tx: Transaction) => {
        if (!tx.createdAt || !tx.bookId || typeof tx.amount !== "number") return;
        const month = dayjs(tx.createdAt).format("YYYY-MM");
        if (!grouped[month]) grouped[month] = {};
        if (!grouped[month][tx.bookId]) grouped[month][tx.bookId] = 0;
        grouped[month][tx.bookId] += tx.amount;
      });
      // Prepare chart data: [{ month: '2024-06', [bookId1]: amount, [bookId2]: amount, ... }, ...]
      const months = Object.keys(grouped).sort();
      const data = months.map((month) => {
        return { month, ...grouped[month] };
      });
      setChartData(data);
    }
    getTransactions();
  }, [user]);

  // Prepare books for chart (id and title only)
  const chartBooks = (books || []).map((b: any) => ({ id: b.id || '', title: b.title || '' }));

  return (
    <div className="w-full flex flex-col">
      <div className="p-4 w-full flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <span className="font-bold text-2xl">{user[0]?.name}'s Expenses</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <DashboardCard
              title="Total Books"
              amount={books.length.toString()}
              icon={<FaBook className="h-6 w-6 text-blue-600" />}
              color="border-blue-200"
            />
            <DashboardCard
              title="Total Transactions"
              amount={transactionsList.length.toString()}
              icon={<FaExchangeAlt className="h-6 w-6 text-purple-600" />}
              color="border-purple-200"
            />
            <DashboardCard
              title="Net Balance"
              amount={`₹${netbalance ?? "0"}`}
              icon={<FaWallet className="h-6 w-6 text-green-600" />}
              color={isProfit ? "border-green-200" : "border-red-200"}
            />
          </div>
        </div>
      </div>
      {/* Chart Section */}
      <div className="p-4 w-full">
        <DashboardChart data={chartData} books={chartBooks} />
      </div>
    </div>
  );
}