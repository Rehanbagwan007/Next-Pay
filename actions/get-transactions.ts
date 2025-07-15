"use server"

import prisma from "@/lib/prisma";



export const getTransactions = async (bookId: string) => {

    try{

       
        const Transactions = await prisma.transaction.findMany({
            where:
            {
                book:{
                    id:bookId
                }
            },
        })

     
        return(Transactions)







    }catch(error){
        console.log(error)
    }



}