"use server"
 
import z from "zod";

import prisma from "@/lib/prisma";








const transactionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount:z.string(),
  date: z
    .string()
    .min(1, "Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format" }),
  mode: z.string().min(1, "Mode is required"),
  note: z.string(),
  bill: z.any().optional(),
});





type uploadState = {

    errors:{
        title?: string[],
        amount?: string[],
        date?: string[],
        category?: string[],
        mode?: string[],
        note?: string[],
        billurl?: string[],
        formError?: string[]
     

    }
  } | void

  enum TransactionType {
    CASH_IN = "CASH_IN",
    CASH_OUT = "CASH_OUT",  }


export const handleCreateTransaction = async (formData:FormData,bookId:string,userID:string,type:TransactionType) : Promise<uploadState>=>{
 
      const result = transactionSchema.safeParse({
        title: formData.get("title") as string,
        amount: formData.get("amount") as string,
        date: formData.get("date") ,
        mode: formData.get("mode") as string,
        note: formData.get("note") as string,
        bill: formData.get("bill"),
      })
      


  if(!result.success){

        return{
            errors:result.error.flatten().fieldErrors
        }
       

    }

  if(!userID){
    return {
      errors: {
        formError: ["You must be signed in to create a book" ]
      }
    }

  };
 
   

  if(!bookId){
    return {
      errors: {
        formError: ["book is not found"]
      }
    }

  };


    const findBook = await prisma.book.findUnique({
      where:{id: bookId}
    })


const createTransaction=  await prisma.transaction.create({
  data: {
    title: result.data.title,
    amount: parseFloat(result.data.amount),
    createdAt: new Date(result.data.date).toISOString(),
    paymentMode: result.data.mode,
    type: type,
    note: result.data.note,
    billurl: "", // Assuming you handle file uploads separately
    book: { connect: { id: bookId } },
    userId: userID
  }
})




  

    const updateBook = await prisma.book.update({
      where: { id: bookId },
       data:{
        cashIn : type === TransactionType.CASH_IN ? (findBook?.cashIn ?? 0) + createTransaction.amount : (findBook?.cashIn ?? 0) + 0,
        cashOut : type === TransactionType.CASH_OUT ? (findBook?.cashOut ?? 0) + createTransaction.amount : (findBook?.cashOut ?? 0)+ 0,
       }
    });





    const updateuser = await prisma.user.update({
      where: { id: userID },
      data: {
        netBalance: type === TransactionType.CASH_IN ? 
          { increment: createTransaction.amount } : 
          { decrement: createTransaction.amount }
      }
    })

 


}