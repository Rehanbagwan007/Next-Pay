"use server"
 
import z from "zod";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";




const bookSchema = z.object({
  bookName: z.string().min(1, "Book name is required"),
  bookType: z.enum(["personal", "business", "family"], {
    errorMap: () => ({ message: "Please select a valid book type" }),
  }),
})


type uploadState = {

    errors:{
        bookName?:string[],
        bookType?:string[],
        formError?:string[]

    }
  } | void





 export const handleCreateBook = async (formData:FormData) : Promise<uploadState> => {



  const result  = bookSchema.safeParse({ 
    bookName : formData.get("bookname") as string,
  bookType :  formData.get("booktype") as string
  })

  if(!result.success){

        return{
            errors:result.error.flatten().fieldErrors
        }
       

    }

   const { userId } = await auth()

  if(!userId){
    return {
      errors: {
        formError: ["You must be signed in to create a book"]
      }
    }

  };
 
  const findUser = await prisma.user?.findUnique({
    where:{
      clerkId:userId
    }
  })

  if(!findUser){
    return {
      errors: {
        formError: ["User not found"]
      }
    }
  }

  const newBook = await prisma.book.create({
    data: {
      title: result.data.bookName,
     typeBook : result.data.bookType,
      userId: findUser.id,
      
     // Initial balance can be set to 0 or any default value
    }

  })

 

  


 }


