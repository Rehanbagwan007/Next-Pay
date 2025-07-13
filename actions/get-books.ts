"use server"

import prisma from "@/lib/prisma"




export const getBooks = async (userId:string) => {



    try{
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
        return(null)



    }







}