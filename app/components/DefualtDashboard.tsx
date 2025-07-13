import { usefetchUser } from "@/hooks/usefethUser";
import { useGetBook } from "@/hooks/useGetBook";
import { RootState } from "@/store"
import { useSelector } from "react-redux"
import { IoBookOutline } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";

import { useEffect, useState } from "react";
import { getAllTransaction } from "@/store/transactionSlice";
import { getTransactionsAll } from "@/actions/get-Alltransactions";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";







export default function DefaultDashboard(){


interface NetBalanceCardProps {
  amount: number; // Pass your net balance value
}

      usefetchUser()

     
       const user = useSelector((state:RootState)=> state.user.user)
      
       useGetBook(user[0]?.id)
      const books = useSelector((state: RootState) => state.books.books);
      let [transactions,setTransactions] = useState<number | undefined>(0)
     

       const isProfit = false



      useEffect(()=>{

        

        async function getTransactions(){

            const Transactions =  await getTransactionsAll(user[0]?.id)
            setTransactions(Transactions?.length)



        }


        getTransactions()




      })



    

    return(
        <div className="w-screen h-screen flex flex-col">

            <div className="p-15 w-screen h-1/3 flex flex-row i">
                <div className="greeting text w-1/2 h-full space-x-7 flex-col">

            

                    <div className="">
                          <span className="font-bold text-2xl font- ">{user[0]?.name}'s Expenses</span>

                    </div>
                    <div className="mt-2 flex flex-row items-center space-x-2">
                        <div className="w-[160px] border rounded-2xl border-blue-600 text-blue-600 p-1 flex -row items-center gap-2"><IoBookOutline color="blue" />
                        Total Books {books.length}</div>


                        <div className="
                        w-[200px] border border-blue-600 rounded-2xl text-blue-600 p-1 flex -row items-center gap-2
                        ">
                            <GrTransaction color="blue"/>
                            Total Transactions {transactions}

                        </div>



                    </div>
                   
                </div>

                <div className="net-balance w-[250px]">
                     <div className="bg-white rounded-2xl shadow-md shadow-red-500 p-6 flex items-center justify-between w-full max-w-sm">
      <div>
        <p className="text-gray-500 text-sm">Net Balance</p>
        <h2 className="text-2xl font-semibold text-gray-800">
          ₹{Math.abs(20).toLocaleString("en-IN")}
        </h2>
      </div>
      <div
        className={`flex items-center justify-center rounded-full p-2 ${
          isProfit ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        }`}
      >
        {isProfit ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
      </div>
    </div>
                    
                </div>

            </div>




           
        </div>
    )







}