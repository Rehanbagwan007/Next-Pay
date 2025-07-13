import { getTransactions } from "@/actions/get-transactions"
import { RootState } from "@/store"
import { getAllTransaction } from "@/store/transactionSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"




export const useGetTransactions = (bookID:string)=>{

    const dispatch = useDispatch()

    const { TransactionRefresh }  = useSelector((state:RootState)=> state.transaction)


    useEffect(()=>{

         async function fetchTransactions(){
            try{
             
                  const Transactions = await getTransactions(bookID)
                  console.log("Transactions", Transactions)
                    
               
                 
                  if(Transactions) dispatch(getAllTransaction(Transactions))



            }catch(err){
                console.log(err)
            }


          

         }


                 fetchTransactions()



    },[bookID,TransactionRefresh])




}