"use server"

import prisma from "@/lib/prisma"




export const getBooks = async (userId:string) => {



    try{


        if(!userId){
            throw new Error("User ID is Required")
        }


        const booksAll =  await prisma.book.findMany({
            where:{
                userId
            },
            orderBy:{
                createdAt:"desc"
            }
        })


       
         return (booksAll)





      




    }catch(err){


        console.log(err)



    }







}