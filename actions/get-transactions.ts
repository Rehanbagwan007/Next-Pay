"use server"

import prisma from "@/lib/prisma";



export const getTransactions = async (bookId: string) => {

    try{

        if(!bookId) {
            throw new Error("Book ID is required");
        }

        const Transactions = await prisma.transaction.findMany({
            where:
            {
                bookId: bookId
            },
        })


        return(Transactions)







    }catch(error){
        console.log(error)
    }



}