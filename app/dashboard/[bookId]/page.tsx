"use client";


import React, { use, useEffect, useState } from "react";

import { BookSidebar } from "../../components/BookSidebar";

import DashboardCard from "../../components/DashboardCard";

import TransactionTable from "../../components/TransactionTable";

import TransactionFormSheet from "../../components/TransactionFormSheet";

import FamilyMemberCard from "../../components/FamilyMemberCard";

import {

DropdownMenu,

DropdownMenuContent,

DropdownMenuItem,

DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {

ArrowDownCircle,

ArrowUpCircle,

Wallet,

Calendar,

Filter,

MoreVertical,

Plus,

} from "lucide-react";

import { Card } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";




// ... (your other imports)
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserRefresh } from "@/store/userSlice";
import { useGetBook } from "@/hooks/useGetBook"; // Keep this import
import { getAllbooks } from "@/store/booksSlice";
import axios from "axios"; // Make sure axios is imported
import { useParams } from "next/navigation";
import { RootState } from "@/store";
import { useGetTransactions } from "@/hooks/useGetTransactions";
import { usefetchUser } from "@/hooks/usefethUser";

// ... (your mock data and categories)

export default function DashboardPage() {
   
     const params = useParams();
    console.log("Book ID:", params.bookId);
    const bookId = params.bookId as string; // Get bookId from params


    type User = {
        id: string | null;
        email: string | null;
        phone_number: string | null;
        clerkId: string | null;
        name: string | null;
        netBalance: number | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    } | null;

  enum TransactionType {
    CASH_IN = "CASH_IN",
    CASH_OUT = "CASH_OUT",  }




    const [modalType, setModalType] = useState<TransactionType|null>(null);
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedMode, setSelectedMode] = useState("All Modes");
    const [dateFilter, setDateFilter] = useState("");
    const [netBalanceInput, setNetBalanceInput] = useState("");
    const [saveLoader, setSaveLoader] = useState<boolean>(false);
    const [userData, setUserData] = useState<User>(null); // Initialize with null
    const dispatch = useDispatch();
    
  const userRefresh = useSelector((store: RootState) => store.user?.userRefresh ?? false);
  
    // ************* CORRECT WAY TO CALL THE HOOK *************
    // Call useGetBook directly at the top level of the component.
    // It will re-run whenever `userData?.id` changes.
    usefetchUser()
     const user = useSelector((state:RootState)=> state.user.user)
    useGetBook(user[0]?.id || "");
     const book = useSelector((state: RootState) => state.books.books.find((b) => b.id === bookId));
     const isLoading = !book || !user;

    useGetTransactions(bookId || "") 
      const transaction = useSelector((store:RootState) => store?.transaction?.Transaction);
    // Pass an empty string or handle null if userId can genuinely be null temporarily
 // Empty dependency array means this runs once on mount

    async function updateNetBalance() {
        try {
            const response = await axios.post("/api/addbalance", {
                userId: user[0]?.id,
                amount: parseFloat(netBalanceInput),
            });
            console.log(response);
            if (response.data.success) {
                console.log("Net balance updated successfully");
                setNetBalanceInput(""); // Clear input after successful update
                // Refresh user data
               
                setSaveLoader(false);
                dispatch(setUserRefresh())
            } else {
                console.error("Failed to update net balance:", response.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b md:hidden">
                <div className="flex items-center justify-between px-4 h-16">
                    <BookSidebar className="w-1/4"/>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setModalType(TransactionType.CASH_IN)}>
                                Add Cash In
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setModalType(TransactionType.CASH_OUT)}>
                                Add Cash Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block w-80 border-r bg-white">
                <BookSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-4 md:p-6 space-y-6 mt-16 md:mt-0">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {isLoading ? (
                            <>
                                <div className="col-span-1"><Skeleton height={100} /></div>
                                <div className="col-span-1"><Skeleton height={100} /></div>
                                <div className="col-span-1"><Skeleton height={100} /></div>
                            </>
                        ) : (
                            <>
                                <DashboardCard
                                    title="Cash In"
                                    amount={`₹${book?.cashIn || 0}`}
                                    icon={<ArrowDownCircle className="text-green-500 w-7 h-7" />}
                                    color="border-l-4 border-l-green-500"
                                />
                                <DashboardCard
                                    title="Cash Out"
                                    amount={`₹${book?.cashOut || 0}`}
                                    icon={<ArrowUpCircle className="text-red-500 w-7 h-7" />}
                                    color="border-l-4 border-l-red-500"
                                />
                                <DashboardCard
                                    title="Net Balance"
                                    amount={`₹${user ? user[0]?.netBalance: 0}`}
                                    icon={<Wallet className="text-blue-500 w-7 h-7" />}
                                    color="border-l-4 border-l-blue-500"
                                />
                            </>
                        )}
                    </div>

                    {/* Action Bar with Filters */}
                    <Card className="p-4">
                        <div className="flex flex-col  justify-items-end  gap-4">
                            {/* Action Row: Cash In, Cash Out, Net Balance */}
                            <div className="flex flex-wrap items-center just gap-2 mb-2">
                                <Button
                                    onClick={() => setModalType(TransactionType.CASH_IN)}
                                    className="bg-green-500 hover:bg-green-600"
                                >
                                    + Cash In
                                </Button>
                                <Button
                                    onClick={() => setModalType(TransactionType.CASH_OUT)}
                                    className="bg-red-500 hover:bg-red-600"
                                >
                                    - Cash Out
                                </Button>
                                <Label className="ml-2">Net Balance:</Label>
                                <Input
                                    type="number"
                                    placeholder="Update Net Balance"
                                    className="max-w-xs"
                                    value={netBalanceInput}
                                    onChange={(e) => setNetBalanceInput(e.target.value)}
                                />
                                <Button
                                    className="bg-indigo-600 hover:bg-indigo-700"
                                    onClick={() => {
                                        setSaveLoader(true);
                                        updateNetBalance();
                                    }}
                                >
                                    {saveLoader ? "Saving..." : "Save"}
                                </Button>
                            </div>
                          
                            {/* Filters Row: In front of Recent Transactions */}
                          
                        </div>
                    </Card>

                    {/* Transaction Table */}

                    
                      {transaction.length <= 0 ? <center>Data Not Found</center> :  <TransactionTable />
}


                   
                    {/* Family Section */}
                    <div>
                        
                    
                    </div>
                </div>
            </div>

            {modalType && (
                <TransactionFormSheet
                    open={!!modalType}
                    onClose={() => setModalType(null)}
                    type={modalType}
                    bookId={bookId} // Pass bookId to the form
                />
            )}
        </div>
    );
}