"use client";

import React, { useEffect, useState } from "react";
import { BookSidebar } from "../components/BookSidebar";
import DashboardCard from "../components/DashboardCard";
import TransactionTable from "../components/TransactionTable";
import TransactionFormModal from "../components/TransactionFormModal";
import FamilyMemberCard from "../components/FamilyMemberCard";
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

import axios from "axios"
import { useDispatch } from "react-redux"
import { setUser } from "@/store/userSlice";
import { useGetBook } from "@/hooks/useGetBook";







const mockFamily = [
	{ name: "John", cashIn: 7000, cashOut: 2000 },
	{ name: "Jane", cashIn: 3000, cashOut: 1500 },
];

const categories = [
	"All Categories",
	"Salary",
	"Business",
	"Freelance",
	"Groceries",
	"Transport",
	"Entertainment",
	"Bills",
	"Other",
];

const paymentModes = [
	"All Modes",
	"Cash",
	"Online",
	"UPI",
	"Card",
	"Bank Transfer",
	"Paytm",
	"PhonePe",
];

export default  function DashboardPage(){

	
type User = {
  id:string | null
  email:string | null
  phone_number: string | null
  clerkId: string | null
  name: string |null
  netBalance: number |null
  createdAt: Date | null
  updatedAt: Date |null
}| null





	const [modalType, setModalType] = useState<"Cash In" | "Cash Out" | null>(null);
	const [selectedCategory, setSelectedCategory] = useState("All Categories");
	const [selectedMode, setSelectedMode] = useState("All Modes");
	const [dateFilter, setDateFilter] = useState("");
	const [netBalanceInput, setNetBalanceInput] = useState("");
	const [saveLoader , setsaveLoader] = useState<boolean>(false)
	let [userData , setUserData] = useState<User>()
	const dispatch = useDispatch()
	
	
  async function fetchUser(){
	
	
	try{
	
	const response = await axios.get("/api/users")
	console.log(response)
	
	
	
	
	if(response){
	
	console.log("user has fetched")
	await setUserData(response?.data?.data)
	await dispatch(setUser(response?.data?.data))
	await useGetBook(response?.data?.data?.id)
	 
	}
	
	if(!response){
	  console.error("user not fetched")
	}
	
	
	
	
	
	
	}catch(err){
	console.log(err)
	}
  }
	
  useEffect(()=>{
    fetchUser()
	
	
  },[])

  
	async function updateNetBalance() {

		try{

			const response = await axios.post("/api/addbalance", {
				userId: userData?.id,
				amount: parseFloat(netBalanceInput),
			});
            console.log(response)
			if (response.data.success) {
				console.log("Net balance updated successfully");
				setNetBalanceInput(""); // Clear input after successful update
				await fetchUser(); // Refresh user data
				setsaveLoader(false)
			} else {
				console.error("Failed to update net balance:", response.data.message);
			}








		}catch(err){
			console.log(err)
		}
	
	

	
	}

	

	
	
	

	
	
	


	return (
		<div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
			{/* Mobile Header */}
			<div className="fixed top-0 left-0 right-0 z-50 bg-white border-b md:hidden">
				<div className="flex items-center justify-between px-4 h-16">
					<BookSidebar />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<MoreVertical className="h-5 w-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setModalType("Cash In")}>
								Add Cash In
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setModalType("Cash Out")}>
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
						<DashboardCard
							title="Cash In"
							amount="₹10,000"
							icon={<ArrowDownCircle className="text-green-500 w-7 h-7" />}
							color="border-l-4 border-l-green-500"
						/>
						<DashboardCard
							title="Cash Out"
							amount="₹4,500"
							icon={<ArrowUpCircle className="text-red-500 w-7 h-7" />}
							color="border-l-4 border-l-red-500"
						/>
						<DashboardCard
							title="Net Balance"
              amount={`₹${userData ? userData.netBalance : 0}`}
							icon={<Wallet className="text-blue-500 w-7 h-7" />}
							color="border-l-4 border-l-blue-500"
						/>
					</div>

					{/* Action Bar with Filters */}
					<Card className="p-4">
						<div className="flex flex-col gap-4">
							<div className="flex flex-wrap items-center justify-between gap-4">
								<div className="flex flex-wrap gap-2">
									<Button
										onClick={() => setModalType("Cash In")}
										className="bg-green-500 hover:bg-green-600"
									>
										+ Cash In
									</Button>
									<Button
										onClick={() => setModalType("Cash Out")}
										variant="destructive"
									>
										- Cash Out
									</Button>
								</div>
								{/* Net Balance Input (not synced with summary card) */}
								<div className="flex items-center gap-2">
									<label htmlFor="net-balance" className="text-sm font-medium text-gray-700">Add Net Balance:</label>
									<input
										id="net-balance"
										type="number"
										value={netBalanceInput}
										onChange={e => setNetBalanceInput(e.target.value)}
										className="px-3 py-2 rounded-md border text-sm w-32"
									/>
									<Button
										size="sm"
										className="bg-blue-600 text-white"
										disabled={saveLoader}
										onClick={() => {
											updateNetBalance()
											setsaveLoader(true)
											
										}}
									>
										{saveLoader ? "Saving..."  : "Save Balance"}
									</Button>
								</div>
							</div>

							{/* Filters */}
							<div className="flex flex-wrap gap-2 items-center">
								<input
									type="date"
									value={dateFilter}
									onChange={(e) => setDateFilter(e.target.value)}
									className="px-3 py-2 rounded-md border text-sm"
								/>
								<select
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
									className="px-3 py-2 rounded-md border text-sm"
								>
									{categories.map((cat) => (
										<option key={cat} value={cat}>
											{cat}
										</option>
									))}
								</select>
								<select
									value={selectedMode}
									onChange={(e) => setSelectedMode(e.target.value)}
									className="px-3 py-2 rounded-md border text-sm"
								>
									{paymentModes.map((mode) => (
										<option key={mode} value={mode}>
											{mode}
										</option>
									))}
								</select>
							</div>
						</div>
					</Card>

					{/* Family Members Section */}
					<Card className="p-4">
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<h3 className="font-semibold text-lg text-blue-700">
									Family Members
								</h3>
								<Button variant="outline" size="sm">
									Manage Members
								</Button>
							</div>
							<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
								{mockFamily.map((m, i) => (
									<FamilyMemberCard
										key={i}
										name={m.name}
										cashIn={m.cashIn}
										cashOut={m.cashOut}
									/>
								))}
								<Button
									variant="outline"
									className="h-full min-h-[100px] border-dashed"
								>
									<Plus className="mr-2 h-4 w-4" />
									Add Member
								</Button>
							</div>
						</div>
					</Card>

					{/* Transactions */}
					<Card className="p-4 overflow-auto">
						<TransactionTable />
					</Card>
				</div>
			</div>

			{/* Transaction Modal */}
			<TransactionFormModal
				open={!!modalType}
				onClose={() => setModalType(null)}
				type={modalType || "Cash In"}
			/>
		</div>
		);

	}