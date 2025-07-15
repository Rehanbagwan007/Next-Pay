
import prisma from "@/lib/prisma"
import dayjs from "dayjs"

export const calculateProfit = async (userID:string)=>{

   try{

    const lastMonthStartdate = dayjs().subtract(1 ,'month').startOf('month').toISOString()
    const lastMonthEnddate = dayjs().subtract(1 , 'month').endOf('month').toISOString()

    const currentMonthStartdate = dayjs().startOf('month').startOf('month').toISOString()
    const currentMonthEnddate = dayjs().startOf('month').endOf('month').toISOString()



    const getLastMonthTransactions = await prisma.transaction.findMany({
        where:{
            userId:userID,
            createdAt:{
                
                gte:lastMonthStartdate,
                lte:lastMonthEnddate
            },
            
        }

    })

    console.log(getLastMonthTransactions, "last month")

    const thisMonths =  await prisma?.transaction?.findMany({
        where:{
             userId:userID,
             createdAt:{
                gte:currentMonthStartdate,
                lte:currentMonthEnddate
             }
        }
    })


    console.log(thisMonths , "this months")


    return(thisMonths)
    
}catch(err){
    console.log(err)
}









}