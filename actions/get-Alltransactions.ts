import prisma from "@/lib/prisma"





export const getTransactionsAll = async (userID:string)=>{

    try{


       

        const allTransactions = await prisma?.transaction.findMany({
            where:{
                userId:userID
            }
        })


         return(allTransactions)




    }catch(err){
        console.log(err)
    }




}