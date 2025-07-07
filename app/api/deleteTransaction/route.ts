import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"



export async function POST(request:NextRequest){


    try{


        const { transaction_id } = await request.json()


        const findTransaction = await prisma.transaction.findUnique({
            where:{
                id:transaction_id
            }
        })


        if(!findTransaction){


             return    new NextResponse(JSON.stringify({ success: false}), { status: 500 })
           

        }
        
        const book = await prisma.book.findFirst({
            where: {
                transactions: {
                    some: {
                        id: findTransaction.id
                    }
                }
            }
        })

        const updateBookAmount = await prisma.book.update({
            where:{
                id:book?.id

            },
            data:{
                       
                cashIn: (findTransaction.type === "CASH_IN" ) ? {decrement:findTransaction.amount} : {decrement:0},
                cashOut:(findTransaction.type === "CASH_OUT") ? {decrement:findTransaction.amount}: {decrement:0}
            }
        }) 

        const FindUser = await prisma.user.findFirst({
            where:{
                books :{
                    some:{
                        id:book?.id
                    }
                }
            },
            



        })

        const UpdateUserNet =  await prisma.user.update({
            where:{
                id:FindUser?.id
            },
            data:{
                netBalance:(findTransaction.type === "CASH_IN") ? {decrement:findTransaction.amount}: {decrement:0}
            }
            

        })


        

        const deleteTransaction = await prisma.transaction.delete({
            where:{
                id:findTransaction.id
            }
        })


        console.log(updateBookAmount,UpdateUserNet,deleteTransaction)

       return new NextResponse(JSON.stringify({ success: true, data: updateBookAmount }), { status: 200 })
   


          
     



    }catch(err){
        return    new NextResponse(JSON.stringify({ success: false}), { status: 500 })
     
    }





}